import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedTimeColumn } from '../../../../common/decorators/created-time.decorator';
import { UpdatedTimeColumn } from '../../../../common/decorators/updated-time.decorator';

@Entity('quiz_users')
export class QuizUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index('idx_quiz_user_id')
  @Column({ type: 'varchar', name: 'quiz_user_id' })
  quizUserId: string;

  @Column({ type: 'varchar', name: 'name' })
  name!: string;

  @CreatedTimeColumn()
  readonly createdTime!: Date;

  @UpdatedTimeColumn()
  readonly updatedTime!: Date;

  constructor(partial: Partial<QuizUser>) {
    Object.assign(this, partial);
  }
}
