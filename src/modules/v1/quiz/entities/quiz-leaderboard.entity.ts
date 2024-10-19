import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';
import { QuizUser } from './quiz-user.entity';
import { CreatedTimeColumn } from '../../../../common/decorators/created-time.decorator';
import { UpdatedTimeColumn } from '../../../../common/decorators/updated-time.decorator';

@Entity('quiz_leaderboard')
export class QuizLeaderboard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index('idx_quiz_id')
  @Column({ type: 'bigint', name: 'quiz_id' })
  quizId!: number;

  @Index('idx_quiz_user_id')
  @Column({ type: 'varchar', name: 'quiz_user_id' })
  quizUserId: string;

  @Column({ type: 'bigint', name: 'score', default: 0 })
  score: number;

  @CreatedTimeColumn()
  readonly createdTime!: Date;

  @UpdatedTimeColumn()
  readonly updatedTime!: Date;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(() => QuizUser)
  @JoinColumn({ name: 'quiz_user_id', referencedColumnName: 'quizUserId' })
  quizUser: QuizUser;

  constructor(partial: Partial<QuizLeaderboard>) {
    Object.assign(this, partial);
  }
}
