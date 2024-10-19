import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryFilter, QuerySort } from '@nestjsx/crud-request';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '#constants/const';

export class ListFilterDto {
  @IsOptional()
  @ApiPropertyOptional({
    example: [{ field: 'id', operator: '$eq', value: 1 }],
  })
  readonly filter?: QueryFilter[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: `search condition as a JSON string to you request`,
  })
  readonly s?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: [{ field: 'createdTime', order: 'DESC' }] })
  readonly sort?: QuerySort[];

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: DEFAULT_LIMIT })
  readonly limit?: number = DEFAULT_LIMIT;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: DEFAULT_OFFSET })
  readonly offset?: number = DEFAULT_OFFSET;
}
