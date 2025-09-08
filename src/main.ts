import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enable('trust proxy');  // get user's real IP

  const config = new DocumentBuilder()
    .setTitle('Sunnatillo Sharipov')
    .setDescription('19 y.o Node.js backend developer')
    .setVersion('19v')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

}

bootstrap();
