import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/configs/environment/configuration';
import { ManagerModule } from './module/manager.module';
import { AuthGuard } from './core/configs/security/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    ManagerModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
