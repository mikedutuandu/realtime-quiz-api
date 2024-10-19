import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedTimeColumn } from '../../../../common/decorators/created-time.decorator';
import { UpdatedTimeColumn } from '../../../../common/decorators/updated-time.decorator';
import { QuizQuestion } from './quiz-question.entity';
import { QuizDifficulty } from '#constants/enum';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', name: 'name' })
  name!: string;

  @Column({ type: 'bigint', name: 'participants', unsigned: true })
  participants!: number;

  @Column({ type: 'enum', enum: QuizDifficulty, default: QuizDifficulty.Easy })
  difficulty!: QuizDifficulty;

  @Column({ type: 'bigint', name: 'time_limit', unsigned: true })
  timeLimit!: number;

  @CreatedTimeColumn()
  readonly createdTime!: Date;

  @UpdatedTimeColumn()
  readonly updatedTime!: Date;

  @OneToMany(() => QuizQuestion, (question) => question.quiz)
  quizQuestions: QuizQuestion[];

  constructor(partial: Partial<Quiz>) {
    Object.assign(this, partial);
  }
}
