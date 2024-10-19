import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { QuizQuestion } from '#modules/v1/quiz';

export class QuizDetailResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  participants!: number;

  @Expose()
  @ApiProperty()
  difficulty!: string;

  @Expose()
  @ApiProperty()
  timeLimit!: number;

  @Expose()
  @ApiProperty()
  readonly quizQuestions: QuizQuestion[];
}
