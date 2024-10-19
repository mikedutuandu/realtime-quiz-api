import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuizJoinDto {
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
}
