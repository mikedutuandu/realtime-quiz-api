import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';
import { QuizQuestionOption } from './quiz-question-option.entity';
import { CreatedTimeColumn } from '../../../../common/decorators/created-time.decorator';
import { UpdatedTimeColumn } from '../../../../common/decorators/updated-time.decorator';
import { Expose } from 'class-transformer';

@Entity('quiz_questions')
export class QuizQuestion {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column({ type: 'text', name: 'question_text' })
  questionText: string;

  @Index('idx_quiz_id')
  @Column({ type: 'bigint', name: 'quiz_id' })
  quizId!: number;

  @CreatedTimeColumn()
  readonly createdTime!: Date;

  @UpdatedTimeColumn()
  readonly updatedTime!: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizQuestions, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'quiz_id', referencedColumnName: 'id' })
  quiz!: Quiz;

  @Expose()
  @OneToMany(() => QuizQuestionOption, (option) => option.quizQuestion)
  quizQuestionOptions: QuizQuestionOption[];

  constructor(partial: Partial<QuizQuestion>) {
    Object.assign(this, partial);
  }
}
