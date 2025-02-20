import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './api/webhooks/webhooks.module';
import { LockModule } from './api/lock/lock.module';
import { ConfigModule } from './api/config/config.module';


@Module({
  imports: [ 
    WebhooksModule,
    LockModule,
    ConfigModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
  ],
  exports: [],
})

export class AppModule {}
