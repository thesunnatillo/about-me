import { Injectable } from "@nestjs/common";
import { ISignUpReq } from "./interfaces/sign-up.interface";
import { ISignInReq } from "./interfaces/sign-in.interface";
import { GlobalResponse, IEmpty, ITokens, TokenPayload } from "src/utils/interface";
import { IRefreshTokenReq } from "./interfaces/refresh-token.interface";
import { UsersEntity } from "src/db/entities/users.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async signUp(data: ISignUpReq): Promise<GlobalResponse<ITokens>> {

        const userExists = await UsersEntity.existsBy({
            login: data.login,
        });

        if (userExists) {

            return { data: null, errMsg: "Bu username allaqachon band!" };

        }

        if (data.password !== data.confirmPassword) {

            return { data: null, errMsg: "Parollar bir-biriga mos emas!" };

        }

        const hashedPass = await bcrypt.hash(data.password, 10);

        const signUpResult = await UsersEntity.save({
            fn: data.fn,
            ln: data.ln,
            login: data.login,
            password: hashedPass,
        });

        const payload: TokenPayload = {
            id: signUpResult.id,
            fn: signUpResult.fn,
            ln: signUpResult.ln,
            login: signUpResult.login,
            role: signUpResult.role,
        };

        const { accsessToken, refreshToken } = await this.getTokens(payload);

        return { data: { accsessToken, refreshToken }};

    }

    async signIn(data: ISignInReq): Promise<GlobalResponse<ITokens>>  {

        const { login, password } = data;

        const user = await UsersEntity.findOneBy({ login });

        if (!user) {

            return { data: null, errMsg: "Login yoki parol xato!" };

        }

        const matchPass = await bcrypt.compare(password, user.password);

        if (!matchPass) {

            return { data: null, errMsg: "Login yoki parol xato!" };

        }

        const payload: TokenPayload = {
            id: user.id,
            fn: user.fn,
            ln: user.ln,
            login: user.login,
            role: user.role,
        };        

        const { accsessToken, refreshToken } = await this.getTokens(payload);

        return { data: { accsessToken, refreshToken }};

    }

    logOut(data: IEmpty): any {

        return "LogOut";

    }

    refreshToken(data: IRefreshTokenReq) {

        return "RefreshToken";

    }

    private async getTokens(payload: TokenPayload): Promise<ITokens> {

        const accsessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get("jwt.rtExpires"),
        });

        return { accsessToken, refreshToken };

    }

}