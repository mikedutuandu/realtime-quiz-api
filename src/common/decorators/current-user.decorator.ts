import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserProfile {
  userId: string;
  email: string;
  fullName: string;
}

export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {
  return context.switchToHttp().getRequest<{ user: IUserProfile }>().user;
});
