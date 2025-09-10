import { Injectable } from "@nestjs/common";
import { ISignUpReq } from "./interfaces/sign-up.interface";
import { ISignInReq } from "./interfaces/sign-in.interface";
import { IEmpty } from "src/utils/interface";
import { IRefreshTokenReq } from "./interfaces/refresh-token.interface";

@Injectable()
export class AuthService {

    signUp(data: ISignUpReq) {

        return "SignUp";

    }

    signIn(data: ISignInReq) {

        return "SignIn";

    }

    logOut(data: IEmpty) {

        return "LogOut";

    }

    refreshToken(data: IRefreshTokenReq) {

        return "RefreshToken";

    }

    private getTokens() {}

}