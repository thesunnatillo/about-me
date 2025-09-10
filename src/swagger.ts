import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "./modules/users/auth/auth.module";
import { AppModule } from "./app.module";

export function createSwaggerDocs(app: INestApplication): OpenAPIObject[] {

    // A D M I N
    const adminConf = new DocumentBuilder()
        .setTitle('AdminPanel')
        .setDescription('Swagger admin panel')
        .setVersion('v1')
        .build();

    const adminDoc = SwaggerModule.createDocument(app, adminConf, {
        include: [
            AuthModule
        ]
    });

    // U S E R S
    const usersConf = new DocumentBuilder()
        .setTitle('Sunnatillo Sharipov')
        .setDescription('19 y.o Node.js backend developer')
        .setVersion('v19')
        .build();

    const usersDoc = SwaggerModule.createDocument(app, usersConf, {
        include: [
            AppModule,
            AuthModule
        ]
    });

    return [adminDoc, usersDoc];

}

export const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      docExpansion: "none",
    }
};