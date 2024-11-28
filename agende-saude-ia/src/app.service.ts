import { Injectable } from '@nestjs/common';
import { ApplicationInfo } from './core/vo/types/types';

@Injectable()
export class AppService {

  private readonly STARTED_AT: Date = new Date();

  private readonly PACKAGE_INFO: any = require("../package.json");
  
  public getApplicationInfo(): ApplicationInfo {
    return {
      title: this.PACKAGE_INFO.name ?? "Agende Saúde",
      description: this.PACKAGE_INFO.description ?? "Sistema para agendamento de consultas médicas",
      version : this.PACKAGE_INFO.version ?? "1.0.0",
      startedAt: this.STARTED_AT
    };
  }

}
