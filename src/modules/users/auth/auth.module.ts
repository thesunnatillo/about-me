import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.get("jwt.secret"),
                signOptions: {
                    expiresIn: config.get("jwt.atExpires"),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}