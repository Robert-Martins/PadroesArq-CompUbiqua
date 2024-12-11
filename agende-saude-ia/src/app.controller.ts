import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApplicationInfo } from './core/vo/types/types';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  public getApplicationInfo(): ApplicationInfo {
    return this.appService.getApplicationInfo();
  }
}
