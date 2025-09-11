import { registerAs } from "@nestjs/config"

export default registerAs("jwt", () => ({
    secret: process.env.JWT_SECRET,
    atExpires: process.env.ACCSESS_TOKEN_EXPIRES,
    rtExpires: process.env.REFRESH_TOKEN_EXPIRES,
}));