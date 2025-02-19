import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './api/webhooks/webhooks.module';
import { LockModule } from './api/lock/lock.module';


@Module({
  imports: [ 
    WebhooksModule,
    LockModule
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
