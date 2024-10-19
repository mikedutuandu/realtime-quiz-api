import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuizDetailDto, QuizListDto, QuizUserCreateDto, QuizSessionCreateDto } from './dto';
import { StandardizedList } from '#utils/standardizer';
import { Serialize } from '#interceptors';
import { PaginationPipe } from '#pipes';
import { QuizService } from '#modules/v1/quiz/quiz.service';
import {
  QuizDetailResponse,
  QuizListResponse,
  QuizSessionCreateResponse,
  QuizUserCreateResponse,
} from '#modules/v1/quiz/response';

@ApiTags('Quiz')
@Controller('')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('quiz.list')
  @ApiOkResponse({ type: StandardizedList(QuizListResponse) })
  async listQuiz(@Body(new PaginationPipe()) dto: QuizListDto) {
    const [responses, total] = await this.quizService.listQuiz(dto);
    return {
      data: responses,
      total,
    };
  }

  @Post('quiz.detail')
  @ApiOkResponse({ type: QuizDetailResponse })
  @Serialize(QuizDetailResponse)
  async detailQuiz(@Body() dto: QuizDetailDto): Promise<QuizDetailResponse> {
    return this.quizService.detailQuiz(dto);
  }

  @Post('quiz.user.create')
  @ApiOkResponse({ type: QuizUserCreateResponse })
  @Serialize(QuizUserCreateResponse)
  async createUserQuiz(@Body() dto: QuizUserCreateDto): Promise<QuizUserCreateResponse> {
    return this.quizService.createUserQuiz(dto);
  }

  @Post('quiz.session.create')
  @ApiOkResponse({ type: QuizSessionCreateResponse })
  @Serialize(QuizSessionCreateResponse)
  async createSessionQuiz(@Body() dto: QuizSessionCreateDto): Promise<QuizSessionCreateResponse> {
    return this.quizService.createSessionQuiz(dto);
  }
}
