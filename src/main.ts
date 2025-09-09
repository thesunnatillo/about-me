import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createSwaggerDocs } from './swagger';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enable('trust proxy');  // get user's real IP

  const [ adminDoc, usersDoc ] = createSwaggerDocs(app);
  SwaggerModule.setup('admin-docs', app, adminDoc);
  SwaggerModule.setup('users-docs', app, usersDoc);

  await app.listen(process.env.PORT ?? 3000);

}

bootstrap();
