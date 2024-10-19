import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { OkResponse } from '#shares/response/ok.response';

interface IClassConstructor {
  new (...args: []): {};
}

interface IClassTransformOptions extends ClassTransformOptions {
  withoutTotalCount?: boolean;
}

export function Serialize(dto: IClassConstructor, options?: IClassTransformOptions) {
  return UseInterceptors(new SerializeInterceptor(dto, options));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: IClassConstructor, private options: IClassTransformOptions) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<unknown> {
    return handler.handle().pipe(map((results) => this.serialize(context, results)));
  }

  protected transform(dto, data) {
    return plainToInstance(dto, data, { excludeExtraneousValues: true, ...this.options });
  }

  protected serialize(context: ExecutionContext, results) {
    if (this.dto.name === OkResponse.name) {
      return { ok: true };
    }

    if (results['total'] && results['data']) {
      const { data, total } = results;
      return {
        total,
        data: this.transform(this.dto, data),
      };
    } else {
      return this.transform(this.dto, results);
    }
  }
}
