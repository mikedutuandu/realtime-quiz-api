import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OkResponse {
  @ApiProperty({ example: true })
  @Expose()
  readonly ok!: boolean;
}
