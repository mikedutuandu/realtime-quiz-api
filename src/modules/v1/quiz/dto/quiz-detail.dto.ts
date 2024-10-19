import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuizDetailDto {
  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
