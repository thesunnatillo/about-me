import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (isPublic)
            return true;

        const http = context.switchToHttp()
        const req = http.getRequest()
        
        const token = this.extractTokenFromHeader(req);

        if (!token) {

            throw new UnauthorizedException();

        }

        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get("jwt.secret"),
        });

        req.user = payload;

        return true;        

    }

    private extractTokenFromHeader(request: Request): string | undefined {

        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;

    }

}