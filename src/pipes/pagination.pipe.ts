import { Injectable, PipeTransform } from '@nestjs/common';

import { DEFAULT_LIMIT } from '#constants/const';
import { ListFilterDto } from '#shares/dto/list-filter.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: ListFilterDto): ListFilterDto {
    const {
      sort = [
        {
          field: 'id',
          order: 'DESC',
        },
      ],
      limit = DEFAULT_LIMIT,
      offset = 0,
      filter = [],
    } = value;
    return {
      ...value,
      sort,
      limit,
      offset,
      filter,
    };
  }
}
