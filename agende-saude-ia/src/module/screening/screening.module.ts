import { Module } from "@nestjs/common";
import { ScreeningController } from "./screening.controller";
import { ScreeningService } from "./screening.service";

@Module({
    controllers: [ScreeningController],
    providers: [ScreeningService]
})
export class ScreeningModule { }