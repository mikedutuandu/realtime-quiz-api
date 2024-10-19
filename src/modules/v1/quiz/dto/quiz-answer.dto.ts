import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuizAnswerDto {
  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  readonly userQuizSessionId: number;

  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  readonly quizId: string;

  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  readonly questionId: number;

  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  readonly answerId: number;
}
