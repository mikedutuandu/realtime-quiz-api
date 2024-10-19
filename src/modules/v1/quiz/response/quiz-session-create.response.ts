import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QuizSessionCreateResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  quizUserId!: string;

  @Expose()
  @ApiProperty()
  quizId!: number;
}
