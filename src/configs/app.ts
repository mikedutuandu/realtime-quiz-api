import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const CONFIG_APP = 'app';

export default registerAs(CONFIG_APP, () => ({
  isProduction: process.env.NODE_ENV === 'production',
  name: String(process.env.APP_NAME),
  host: String(process.env.APP_HOST),
  port: Number(process.env.APP_PORT),
  loggerLevels: (process.env.APP_LOGGER_LEVEL?.split(',') ?? ['error', 'warn']) as LogLevel[],
  cors: {
    origin: process.env.APP_CORS_ORIGIN?.split(',').map((address) => new RegExp(address, 'u')) ?? [],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    methods: ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Content-Range', 'X-Content-Range', 'Content-Disposition'],
    allowedHeaders: [
      'Origin',
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'Range',
      'token',
      'crossdomain',
      'Content-Disposition',
    ],
  },
}));
