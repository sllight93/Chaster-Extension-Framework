import { Test, TestingModule } from '@nestjs/testing';
import { ChasterAuthService } from './chasterAuth.service';

describe('ChasterAuthService', () => {
  let service: ChasterAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChasterAuthService],
    }).compile();

    service = module.get<ChasterAuthService>(ChasterAuthService);
  });
 
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
