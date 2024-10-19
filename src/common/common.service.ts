import { lastValueFrom } from 'rxjs';
import { DataSource } from 'typeorm';

import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getClientIp } from '@supercharge/request-ip';

import { RequestContext } from './request-context/request-context.model';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService, private readonly dataSource: DataSource) {}

  getCurrentRequest() {
    const { req } = RequestContext.currentContext;
    if (!req) {
      throw new InternalServerErrorException(
        'Request context is empty, RequestContextMiddleware may not be registered?',
      );
    }
    return req;
  }

  getIpFromRequest() {
    const req = this.getCurrentRequest();
    return getClientIp(req);
  }

  async getQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }
}
