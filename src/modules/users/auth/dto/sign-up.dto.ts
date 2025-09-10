import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SignUpDto {

    @ApiProperty({ type: String })
    @IsString()
    fn: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    ln: string;

    @ApiProperty({ type: String })
    @IsString()
    login: string;

    @ApiProperty({ type: String })
    @IsString()
    password: string;

    @ApiProperty({ type: String })
    @IsString()
    confirmPassword: string;

}