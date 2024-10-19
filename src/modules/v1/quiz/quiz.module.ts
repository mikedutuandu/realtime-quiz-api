import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from '#modules/v1/quiz/quiz.service';
import { QuizController } from '#modules/v1/quiz/quiz.controller';
import { QuizGateway } from './quiz.gateway';
import { Quiz } from './entities/quiz.entity';
import { QuizQuestion } from '#modules/v1/quiz/entities';
import { QuizQuestionOption } from '#modules/v1/quiz/entities';
import { QuizAnswer } from '#modules/v1/quiz/entities';
import { QuizLeaderboard } from '#modules/v1/quiz/entities';
import { QuizSession } from '#modules/v1/quiz/entities';
import { QuizUser } from '#modules/v1/quiz/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      QuizQuestion,
      QuizQuestionOption,
      QuizAnswer,
      QuizUser,
      QuizSession,
      QuizLeaderboard,
    ]),
  ],
  providers: [QuizService, QuizGateway],
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule {}
