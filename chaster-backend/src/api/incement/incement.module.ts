import { Module } from '@nestjs/common';
import { IncementController } from './incement.controller';

@Module({
  controllers: [IncementController],
})
export class IncementModule {}
