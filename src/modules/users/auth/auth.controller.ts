import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { ISignUpReq } from "./interfaces/sign-up.interface";
import { SignInDto } from "./dto/sign-in.dto";
import { ISignInReq } from "./interfaces/sign-in.interface";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("sign-up")
    signUp(@Body() body: SignUpDto) {

        const reqData: ISignUpReq = {
            ...body
        };

        return this.authService.signUp(reqData);

    }

    @Public()
    @Post("sign-in")
    signIn(@Body() body: SignInDto) {

        const reqData: ISignInReq = {
            ...body
        };

        return this.authService.signIn(reqData);

    }

    @Post("log-out")
    logOut(@Request() req) {

        console.log(req.user);

        return this.authService.logOut({});

    }

    @Get("refresh-token")
    refreshToken(@Body() body: RefreshTokenDto) {

        return this.authService.refreshToken(body);

    }

}