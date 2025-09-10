import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createSwaggerDocs, swaggerOptions } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get("app.port");

  app.useGlobalPipes(new ValidationPipe());

  app.enable('trust proxy');  // get user's real IP

  const [ adminDoc, usersDoc ] = createSwaggerDocs(app);
  SwaggerModule.setup('admin-docs', app, adminDoc, swaggerOptions);
  SwaggerModule.setup('users-docs', app, usersDoc, swaggerOptions);

  await app.listen(APP_PORT ?? 3000);

}

bootstrap();
