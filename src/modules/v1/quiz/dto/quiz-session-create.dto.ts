import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuizSessionCreateDto {
  @ApiProperty({ example: 'mike123' })
  @IsNotEmpty()
  @IsString()
  readonly quizUserId: string;

  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  readonly quizId: number;
}
