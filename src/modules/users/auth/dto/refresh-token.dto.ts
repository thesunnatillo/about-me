import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;

}