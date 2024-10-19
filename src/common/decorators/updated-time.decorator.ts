import { UpdateDateColumn, ColumnOptions } from 'typeorm';

export function UpdatedTimeColumn(options?: ColumnOptions): PropertyDecorator {
  return UpdateDateColumn({
    ...options,
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    precision: null,
  });
}
