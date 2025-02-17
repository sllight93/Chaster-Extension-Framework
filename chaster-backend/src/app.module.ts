import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChasterService } from './chaster/chaster.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChasterService],
})
export class AppModule {}
