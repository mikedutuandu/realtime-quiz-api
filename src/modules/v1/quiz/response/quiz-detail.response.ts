import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { QuizQuestion } from '#modules/v1/quiz';

export class QuizDetailResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  participants!: number;

  @Expose()
  @ApiProperty()
  difficulty!: string;

  @Expose()
  @ApiProperty()
  timeLimit!: number;

  @Expose()
  @ApiProperty({
    description: 'Array of quiz questions',
    type: [QuizQuestion],
    example: [
      {
        id: 1,
        questionText: 'What is the capital of France?',
        quizQuestionOptions: [
          {
            id: 1,
            optionText: 'Paris',
          },
          {
            id: 2,
            optionText: 'London',
          },
          {
            id: 3,
            optionText: 'Berlin',
          },
        ],
      },
      {
        id: 2,
        questionText: 'Which planet is known as the Red Planet?',
        quizQuestionOptions: [
          {
            id: 4,
            optionText: 'Mars',
          },
          {
            id: 5,
            optionText: 'Venus',
          },
          {
            id: 6,
            optionText: 'Jupiter',
          },
        ],
      },
    ],
  })
  readonly quizQuestions: QuizQuestion[];
}
