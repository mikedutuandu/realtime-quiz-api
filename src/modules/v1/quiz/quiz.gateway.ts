import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { QuizService } from '#modules/v1/quiz/quiz.service';

@WebSocketGateway()
export class QuizGateway {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private quizService: QuizService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-quiz')
  async handleJoinQuiz(
    @MessageBody() data: { userQuizSessionId: number; userId: string; quizId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { userQuizSessionId, userId, quizId } = data;
    this.logger.log(
      `Client ${client.id} userQuizSessionId ${userQuizSessionId} userId ${userId} joined quiz: ${quizId}`,
    );
    client.join(quizId);

    const leaderBoard = await this.quizService.joinQuiz(data);
    this.logger.log(`leaderBoard ${leaderBoard}`);

    this.server.to(quizId).emit('answer-result', {
      leaderboard: leaderBoard,
    });
  }

  @SubscribeMessage('submit-answer')
  async handleSubmitAnswer(
    @MessageBody()
    data: { userQuizSessionId: number; userId: string; quizId: string; questionId: number; answerId: number },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ConnectedSocket() client: Socket,
  ) {
    const { userQuizSessionId, userId, quizId, questionId, answerId } = data;
    this.logger.debug(
      // eslint-disable-next-line max-len
      `Answer submitted for userQuizSessionId ${userQuizSessionId} userId ${userId} quiz ${quizId}: ${questionId} - ${answerId}`,
    );

    const leaderBoard = await this.quizService.answerQuizQuestion(data);
    this.logger.log(`leaderBoard ${leaderBoard}`);

    this.server.to(quizId).emit('answer-result', {
      leaderboard: leaderBoard,
    });
  }
}
