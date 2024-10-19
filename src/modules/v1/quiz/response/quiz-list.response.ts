import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QuizListResponse {
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
}
