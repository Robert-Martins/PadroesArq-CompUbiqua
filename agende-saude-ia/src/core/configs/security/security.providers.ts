import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,Accept,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials",
    exposedHeaders: "Content-Type,Content-Range,X-Content-Range",
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204
}