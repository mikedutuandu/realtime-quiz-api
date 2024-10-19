import { CreateDateColumn, ColumnOptions } from 'typeorm';

export function CreatedTimeColumn(options?: ColumnOptions): PropertyDecorator {
  return CreateDateColumn({
    ...options,
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP',
    precision: null,
  });
}
