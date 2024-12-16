import { Module } from "@nestjs/common";
import { ScreeningModule } from "./screening/screening.module";

@Module({
    imports: [ScreeningModule],
    exports: [ScreeningModule]
})
export class ManagerModule { }