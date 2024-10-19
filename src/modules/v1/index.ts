import { Module } from '@nestjs/common';
import { QuizModule } from './quiz';

@Module({
  imports: [QuizModule],
})
export class ModulesV1 {}
