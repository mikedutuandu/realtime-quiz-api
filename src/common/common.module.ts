import { HttpModule } from '@nestjs/axios';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CommonService } from './common.service';
import { RequestContextMiddleware } from './request-context/request-context.middleware';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CommonService, RequestContextMiddleware],
  exports: [CommonService, RequestContextMiddleware],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
