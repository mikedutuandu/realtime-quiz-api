import dotenv from 'dotenv';
dotenv.config();
import basicAuth from 'express-basic-auth';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import AppConfig, { CONFIG_APP } from './configs/app';
import SwaggerConfig, { CONFIG_SWAGGER } from './configs/swagger';
import { AuthStrategy } from '#constants/enum';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3004;
  const host = process.env.APP_HOST ?? 'localhost';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService<Record<string, unknown>, false> = app.get(ConfigService);
  const appConfig = configService.get<ConfigType<typeof AppConfig>>(CONFIG_APP);
  const swaggerConfig = configService.get<ConfigType<typeof SwaggerConfig>>(CONFIG_SWAGGER);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get('Reflector')));
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (appConfig.cors) {
    app.enableCors(appConfig.cors);
  }

  if (appConfig.loggerLevels) {
    app.useLogger(appConfig.loggerLevels);
  }
  if (swaggerConfig.enable) {
    app.use(
      ['/swagger'],
      basicAuth({
        challenge: true,
        users: {
          dev: '123456aA@',
        },
      }),
    );
    const config = new DocumentBuilder()
      .setTitle(appConfig.name)
      .setVersion(process.env.npm_package_version)
      .setDescription(process.env.npm_package_description)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        AuthStrategy.Jwt, // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(port, host);
  // eslint-disable-next-line no-console
  console.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
