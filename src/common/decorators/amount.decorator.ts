import { Column } from 'typeorm';

export function AmountColumn(colName: string): PropertyDecorator {
  return Column({
    type: 'numeric',
    scale: 2,
    name: colName,
    precision: 36,
    default: 0,
  });
}
