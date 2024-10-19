import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuizQuestionOption } from './quiz-question-option.entity';
import { QuizSession } from './quiz-session.entity';
import { QuizQuestion } from './quiz-question.entity';
import { CreatedTimeColumn } from '../../../../common/decorators/created-time.decorator';
import { UpdatedTimeColumn } from '../../../../common/decorators/updated-time.decorator';

@Entity('quiz_answers')
export class QuizAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index('idx_quiz_session_id')
  @Column({ type: 'bigint', name: 'quiz_session_id' })
  quizSessionId!: number;

  @Index('idx_quiz_question_id')
  @Column({ type: 'bigint', name: 'quiz_question_id' })
  quizQuestionId!: number;

  @Index('idx_quiz_question_option_id')
  @Column({ type: 'bigint', name: 'quiz_question_option_id' })
  quizQuestionOptionId!: number;

  @Column({ type: 'boolean', name: 'is_correct', default: false })
  isCorrect: boolean;

  @Column({ type: 'bigint', name: 'score', default: 0 })
  score: number;

  @CreatedTimeColumn()
  readonly createdTime!: Date;

  @UpdatedTimeColumn()
  readonly updatedTime!: Date;

  @ManyToOne(() => QuizSession)
  @JoinColumn({ name: 'quiz_session_id', referencedColumnName: 'id' })
  quizSession: QuizSession;

  @ManyToOne(() => QuizQuestion)
  @JoinColumn({ name: 'quiz_question_id', referencedColumnName: 'id' })
  quizQuestion: QuizQuestion;

  @ManyToOne(() => QuizQuestionOption)
  @JoinColumn({ name: 'quiz_question_option__id', referencedColumnName: 'id' })
  quizQuestionOption: QuizQuestionOption;

  constructor(partial: Partial<QuizAnswer>) {
    Object.assign(this, partial);
  }
}
