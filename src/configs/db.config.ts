import { registerAs } from "@nestjs/config";
import * as dotenv from "dotenv";
dotenv.config()

export default registerAs("db", () => ({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}));