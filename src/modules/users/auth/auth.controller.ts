import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("sign-up")
    signUp() {

    }

    @Post("sign-in")
    signIn() {

    }

    @Post("log-out")
    logOut() {

    }

    @Get("refresh-token")
    refreshToken() {

    }

}