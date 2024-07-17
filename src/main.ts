import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),

  );
  app.enableCors({
    origin: 'http://143.248.177.211:5173', // 프론트엔드 서버의 URL
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
