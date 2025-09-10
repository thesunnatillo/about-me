import { registerAs } from "@nestjs/config";
import * as dotenv from "dotenv";
dotenv.config();

export default registerAs("app", () => ({
    port: process.env.PORT,
}));