import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((data: never, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user.userId;
});
