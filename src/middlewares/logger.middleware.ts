import { NextFunction, Request, Response } from 'express';
import isEmpty from 'lodash/isEmpty';
import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { get } from 'lodash';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(this.constructor.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = (...restArgs) => {
      chunks.push(Buffer.from(restArgs[0]));
      return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      const responseBody = Buffer.concat(chunks).toString('utf8');

      let requestBody = req.body;
      delete requestBody.password;

      let email = get(requestBody, ['email'], null);

      if (!email) {
        email = get(req.user, ['email'], null);
      }
      requestBody = JSON.stringify(requestBody);

      try {
        if (res.statusCode !== HttpStatus.NOT_FOUND) {
          const data = {
            url: req.path,
            requestMethod: req.method,
            responseCode: Number(res.statusCode),
            headers: JSON.parse(JSON.stringify(req.headers)),
            userId: req.user ? req.user['userId'] : '',
            userInfo: req.user ? JSON.parse(JSON.stringify(req.user)) : null,
            queryString: !isEmpty(req.query) ? JSON.parse(JSON.stringify(req.query)) : null,
            requestBody: JSON.parse(requestBody),
            responseBody: responseBody ? JSON.parse(responseBody) : null,
            remoteIp: JSON.stringify(req.headers['x-forwarded-for']) || req.socket.remoteAddress || req.ip,
            userAgent: req.get('user-agent') || '',
            email,
          };

          this.logger.debug(JSON.stringify(data));
        }
      } catch (_: unknown) {}

      return oldEnd.apply(res, restArgs);
    };

    next();
  }
}
