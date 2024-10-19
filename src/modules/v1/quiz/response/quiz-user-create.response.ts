import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QuizUserCreateResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  quizUserId!: string;

  @Expose()
  @ApiProperty()
  name!: string;
}
