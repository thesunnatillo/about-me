import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ReqLoggerMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: (error?: any) => void) {
        
        console.log(`METHOD: ${req.method} ORIGINAL_URL: ${req.originalUrl} IP: ${req.ip}`);
        next();

    }

}