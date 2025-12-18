import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {setupSwagger} from "./swagger/swagger.setup";
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

  app.enableCors({
    origin: ['http://localhost:3000','*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        skipUndefinedProperties: true,
      }),
  );


  setupSwagger(app);
  await app.listen(process.env.PORT ?? 9000);
}

bootstrap();