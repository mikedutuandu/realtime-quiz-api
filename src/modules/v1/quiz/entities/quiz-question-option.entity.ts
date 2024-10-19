import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuizQuestion } from './quiz-question.entity';
import { CreatedTimeColumn } from '../../../../common/decorators/created-time.decorator';
import { UpdatedTimeColumn } from '../../../../common/decorators/updated-time.decorator';
import {Expose} from "class-transformer";

@Entity('quiz_question_options')
export class QuizQuestionOption {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column({ type: 'text', name: 'option_text', nullable: true })
  optionText: string;

  @Column({ type: 'boolean', name: 'is_correct', default: false })
  isCorrect: boolean;

  @Column({ type: 'bigint', name: 'score', default: 1 })
  score: number;

  @CreatedTimeColumn()
  readonly createdTime!: Date;

  @UpdatedTimeColumn()
  readonly updatedTime!: Date;

  @Index('idx_quiz_question_id')
  @Column({ type: 'bigint', name: 'quiz_question_id' })
  quizQuestionId!: number;

  @ManyToOne(() => QuizQuestion)
  @JoinColumn({ name: 'quiz_question_id', referencedColumnName: 'id' })
  quizQuestion: QuizQuestion;

  constructor(partial: Partial<QuizQuestionOption>) {
    Object.assign(this, partial);
  }
}
