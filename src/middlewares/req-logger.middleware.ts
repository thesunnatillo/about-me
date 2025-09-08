import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ReqLoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: (error?: any) => void) {

        const clientIp = req.ip || req.headers['x-forwarded-for'];
        
        console.log(`METHOD: ${req.method} ORIGINAL_URL: ${req.originalUrl} IP: ${clientIp}`);
        next();

    }

}