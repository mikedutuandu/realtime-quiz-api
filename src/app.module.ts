import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CONFIG_DATABASE } from '#configs/database';
import { ModulesV1 } from '#modules/v1';
import { CacheModule } from './cache/cache.module';
import { CommonModule } from './common/common.module';
import configs from './configs';
import { LoggerMiddleware } from './middlewares';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configs }),
    ScheduleModule.forRoot(),
    CacheModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get(CONFIG_DATABASE),
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
    CommonModule,
    ModulesV1,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
