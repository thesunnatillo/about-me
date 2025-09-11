import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReqLoggerMiddleware } from './middlewares/req-logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './db/entities/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './configs/db.config';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { PostsEntity } from './db/entities/posts.entity';
import jwtConfig from './configs/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: config.get("db.type"),
        host: config.get("db.host"),
        port: config.get("db.port"),
        username: config.get("db.username"),
        password: config.get("db.password"),
        database: config.get("db.database"),
        entities: [UsersEntity, PostsEntity],
        synchronize: true
      }) as DataSourceOptions,
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(ReqLoggerMiddleware)
      .forRoutes("*");

  }

}
