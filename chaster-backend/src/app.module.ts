import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncementModule } from './api/incement/incement.module';
import { ChasterAuthService } from './chaster/chasterAuth.service';

//import { ChasterService } from './chaster/chaster.service';

@Module({
  imports: [IncementModule],
  controllers: [AppController],
  providers: [AppService, ChasterAuthService],
  exports: [ChasterAuthService],
})
export class AppModule {}
