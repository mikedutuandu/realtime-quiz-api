import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QuizUserCreateDto {
  @ApiProperty({ example: 'mike' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'mike123' })
  @IsNotEmpty()
  @IsString()
  readonly quizUserId: string;
}
