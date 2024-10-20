import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mapOperatorsToQuery, sortToTypeOrmOrder } from '#utils/standardizer';
import { hasLength } from '#utils/checks.util';
import {
  QuizDetailDto,
  QuizListDto,
  QuizUserCreateDto,
  QuizSessionCreateDto,
  QuizJoinDto,
  QuizAnswerDto,
} from '#modules/v1/quiz/dto';
import {
  QuizDetailResponse,
  QuizListResponse,
  QuizSessionCreateResponse,
  QuizUserCreateResponse,
} from '#modules/v1/quiz/response';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizAnswer, QuizQuestionOption, QuizSession } from '#modules/v1/quiz/entities';
import { QuizLeaderboard } from '#modules/v1/quiz/entities';
import { QuizUser } from '#modules/v1/quiz/entities';

@Injectable()
export class QuizService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(Quiz)
    protected readonly quizRepository: Repository<Quiz>,
    @InjectRepository(QuizUser)
    protected readonly quizUserRepository: Repository<QuizUser>,
    @InjectRepository(QuizSession)
    protected readonly quizSessionRepository: Repository<QuizSession>,
    @InjectRepository(QuizLeaderboard)
    protected readonly quizLeaderboardRepository: Repository<QuizLeaderboard>,
    @InjectRepository(QuizQuestionOption)
    protected readonly quizQuestionOptionRepository: Repository<QuizQuestionOption>,
    @InjectRepository(QuizAnswer)
    protected readonly quizAnswerRepository: Repository<QuizAnswer>,
  ) {}

  async listQuiz(dto: QuizListDto): Promise<[QuizListResponse[], number]> {
    this.logger.debug(dto);

    const alias = `quiz`;
    const qb = this.quizRepository.createQueryBuilder(alias);

    if (dto.s) {
      qb.andWhere(`${alias}.name like :name`, { name: `%${dto.s}%` });
    }

    if (dto.filter) {
      let index = 1;
      for (const filter of dto.filter) {
        const { str, params } = mapOperatorsToQuery(alias, filter, `${filter.field}_${index}`);
        qb.andWhere(str, params);
        index++;
      }
    }

    if (hasLength(dto.sort)) {
      const order = sortToTypeOrmOrder(dto.sort);
      for (const [field, direction] of Object.entries(order)) {
        qb.addOrderBy(`${alias}.${field}`, direction);
      }
    }

    if (dto.limit) {
      qb.take(dto.limit);
    }
    if (dto.offset) {
      qb.skip(dto.offset);
    }
    const [result, total] = await qb.getManyAndCount();

    return [result?.map((item: Quiz) => item as QuizListResponse), total];
  }

  async detailQuiz(dto: QuizDetailDto): Promise<QuizDetailResponse> {
    this.logger.debug(dto);

    const alias = `quiz`;
    const qb = this.quizRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.quizQuestions`, `quizQuestions`)
      .leftJoinAndSelect(`quizQuestions.quizQuestionOptions`, `quizQuestionOptions`)
      .where(`${alias}.id = :id`, { id: dto.id });

    const quiz = await qb.getOne();
    if (!quiz) {
      throw new NotFoundException(`Quiz not found!`);
    }
    return quiz as QuizDetailResponse;
  }

  async createUserQuiz(dto: QuizUserCreateDto): Promise<QuizUserCreateResponse> {
    this.logger.debug(dto);
    const quizUser = new QuizUser({ quizUserId: dto.quizUserId, name: dto.name });
    const res = await this.quizUserRepository.save(quizUser);

    return res as QuizUserCreateResponse;
  }

  async createSessionQuiz(dto: QuizSessionCreateDto): Promise<QuizSessionCreateResponse> {
    this.logger.debug(dto);
    const quizSession = new QuizSession({ quizUserId: dto.quizUserId, quizId: dto.quizId });
    const res = await this.quizSessionRepository.save(quizSession);

    return res as QuizSessionCreateResponse;
  }

  async joinQuiz(dto: QuizJoinDto): Promise<QuizLeaderboard[]> {
    this.logger.debug(dto);

    const quiz = await this.quizRepository.findOneBy({
      id: Number(dto.quizId),
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz not found`);
    }

    const userQuizLeaderboard = await this.quizLeaderboardRepository.findOneBy({
      quizId: Number(dto.quizId),
      quizUserId: dto.userId,
    });

    if (userQuizLeaderboard) {
      await this.quizLeaderboardRepository.update({ quizId: Number(dto.quizId), quizUserId: dto.userId }, { score: 0 });
    } else {
      const quizLeaderboard = new QuizLeaderboard({ quizId: Number(dto.quizId), quizUserId: dto.userId, score: 0 });
      await this.quizLeaderboardRepository.save(quizLeaderboard);
      await this.quizRepository.update({ id: Number(dto.quizId) }, { participants: Number(quiz.participants) + 1 });
    }

    return this.listQuizLeaderBoard(dto.quizId);
  }

  async answerQuizQuestion(dto: QuizAnswerDto): Promise<QuizLeaderboard[]> {
    this.logger.debug(dto);

    let score = 0;
    let correct = false;

    //get Option and if correct the get score from this option
    const quizQuestionOption = await this.quizQuestionOptionRepository.findOneBy({
      id: dto.answerId,
      quizQuestionId: dto.questionId,
    });
    if (quizQuestionOption.isCorrect) {
      score = quizQuestionOption.score;
      correct = true;
    }

    //save to answer table
    const quizAnswer = new QuizAnswer({
      quizQuestionId: dto.questionId,
      quizSessionId: dto.userQuizSessionId,
      quizQuestionOptionId: dto.answerId,
      isCorrect: correct,
      score: score,
    });

    await this.quizAnswerRepository.save(quizAnswer);

    //update score to leaderboard
    if (score) {
      const userQuizLeaderboard = await this.quizLeaderboardRepository.findOneBy({
        quizId: Number(dto.quizId),
        quizUserId: dto.userId,
      });
      await this.quizLeaderboardRepository.update(
        { quizId: Number(dto.quizId), quizUserId: dto.userId },
        { score: Number(userQuizLeaderboard.score) + Number(score) },
      );
    }

    return this.listQuizLeaderBoard(dto.quizId);
  }

  async listQuizLeaderBoard(quizId: string): Promise<QuizLeaderboard[]> {
    this.logger.debug(quizId);

    const alias = `leaderBoard`;
    const qb = this.quizLeaderboardRepository
      .createQueryBuilder(alias)
      .where(`${alias}.quizId = :quizId`, { quizId: quizId })
      .leftJoinAndSelect(`${alias}.quizUser`, `quizUser`);
    qb.addOrderBy(`${alias}.score`, 'DESC');

    return qb.getMany();
  }
}
