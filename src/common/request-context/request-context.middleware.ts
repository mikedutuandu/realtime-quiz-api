import { Request, Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { RequestContext } from './request-context.model';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: () => void) {
    RequestContext.cls.run(new RequestContext(req, res), next);
  }
}
