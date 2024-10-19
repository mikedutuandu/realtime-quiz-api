import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

import { Type } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { ApiProperty } from '@nestjs/swagger';
import { ComparisonOperator, QueryFilter, QuerySort } from '@nestjsx/crud-request';
import { IListResponse } from '#constants/interface';

export function StandardizedList<T>(type: Type<T>): Type<IListResponse<T>> {
  class Response<D> implements IListResponse<D> {
    @ApiProperty()
    total!: number;

    @ApiProperty({ type, isArray: true })
    data!: D[];
  }

  Object.defineProperty(Response, 'name', {
    value: `${type.name}List`,
  });

  return Response;
}

export const sortToTypeOrmOrder = (sort: QuerySort[]): Record<string, 'ASC' | 'DESC'> => {
  return sort.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      [currentValue.field]: currentValue.order,
    };
  }, {});
};

// https://github.com/nestjsx/crud/blob/master/packages/crud-typeorm/src/typeorm-crud.service.ts
export const mapOperatorsToQuery = (
  alias: string,
  cond: QueryFilter,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param: any,
): { str: string; params: ObjectLiteral } => {
  const field = cond.field.includes('.')
    ? cond.field
    : `${alias}.${cond.field.includes('::') ? cond.field : `${cond.field}`}`;
  const likeOperator = 'ILIKE'; // this.dbName === 'postgres' ? 'ILIKE' : /* istanbul ignore next */ 'LIKE';
  let str: string;
  let params: ObjectLiteral | undefined;

  if (cond.operator[0] !== '$') {
    cond.operator = `$${cond.operator}` as ComparisonOperator;
  }

  switch (cond.operator) {
    case '$eq':
      str = `${field} = :${param}`;
      break;

    case '$ne':
      str = `${field} != :${param}`;
      break;

    case '$gt':
      str = `${field} > :${param}`;
      break;

    case '$lt':
      str = `${field} < :${param}`;
      break;

    case '$gte':
      str = `${field} >= :${param}`;
      break;

    case '$lte':
      str = `${field} <= :${param}`;
      break;

    case '$starts':
      str = `LOWER(${field}) LIKE LOWER(:${param})`;
      params = { [param]: `${cond.value}%` };
      break;

    case '$ends':
      str = `LOWER(${field}) LIKE LOWER(:${param})`;
      params = { [param]: `%${cond.value}` };
      break;

    case '$cont':
      str = `LOWER(${field}) LIKE LOWER(:${param})`;
      params = { [param]: `%${cond.value}%` };
      break;

    case '$excl':
      str = `LOWER(${field}) NOT LIKE LOWER(:${param})`;
      params = { [param]: `%${cond.value}%` };
      break;

    case '$in':
      checkFilterIsArray(cond);
      str = `${field} IN (:...${param})`;
      break;

    case '$notin':
      checkFilterIsArray(cond);
      str = `${field} NOT IN (:...${param})`;
      break;

    case '$isnull':
      str = `${field} IS NULL`;
      params = {};
      break;

    case '$notnull':
      str = `${field} IS NOT NULL`;
      params = {};
      break;

    case '$between':
      checkFilterIsArray(cond, cond.value.length !== 2);
      str = `${field} BETWEEN :${param}0 AND :${param}1`;
      params = {
        [`${param}0`]: cond.value[0],
        [`${param}1`]: cond.value[1],
      };
      break;

    // case insensitive
    case '$eqL':
      str = `LOWER(${field}) = :${param}`;
      break;

    case '$neL':
      str = `LOWER(${field}) != :${param}`;
      break;

    case '$startsL':
      str = `LOWER(${field}) ${likeOperator} :${param}`;
      params = { [param]: `${cond.value}%` };
      break;

    case '$endsL':
      str = `LOWER(${field}) ${likeOperator} :${param}`;
      params = { [param]: `%${cond.value}` };
      break;

    case '$contL':
      str = `LOWER(${field}) ${likeOperator} :${param}`;
      params = { [param]: `%${cond.value}%` };
      break;

    case '$exclL':
      str = `LOWER(${field}) NOT ${likeOperator} :${param}`;
      params = { [param]: `%${cond.value}%` };
      break;

    case '$inL':
      checkFilterIsArray(cond);
      str = `LOWER(${field}) IN (:...${param})`;
      break;

    case '$notinL':
      checkFilterIsArray(cond);
      str = `LOWER(${field}) NOT IN (:...${param})`;
      break;

    /* istanbul ignore next */
    default:
      str = `${field} = :${param}`;
      break;
  }

  if (typeof params === 'undefined') {
    params = { [param]: cond.value };
  }

  return { str, params };
};

const checkFilterIsArray = (cond: QueryFilter, withLength?: boolean): void => {
  /* istanbul ignore if */
  if (!Array.isArray(cond.value) || !cond.value.length || (!isNil(withLength) ? withLength : false)) {
    throw Error(`Invalid column '${cond.field}' value`);
  }
};
