import * as redisStore from 'cache-manager-ioredis';
import { CommanderOptions } from 'ioredis/built/utils/Commander';

import { CacheModule as NestCacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import RedisConfig, { CONFIG_REDIS } from '../configs/redis';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync<CommanderOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { options } = configService.get<ConfigType<typeof RedisConfig>>(CONFIG_REDIS);
        return {
          store: redisStore,
          host: options.host,
          port: options.port,
          // username: options.username,
          // password: options.password,
          // tls: true,
          keyPrefix: 'QUIZ-CACHE:',
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [NestCacheModule],
})
export class CacheModule {}
