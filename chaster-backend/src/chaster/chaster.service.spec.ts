import { Test, TestingModule } from '@nestjs/testing';
import { ChasterService } from './chaster.service';

describe('ChasterService', () => {
  let service: ChasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChasterService],
    }).compile();

    service = module.get<ChasterService>(ChasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
