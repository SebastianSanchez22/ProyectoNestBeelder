import { Test, TestingModule } from '@nestjs/testing';
import { MachineryService } from './machinery.service';

describe('MachineryService', () => {
  let service: MachineryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineryService],
    }).compile();

    service = module.get<MachineryService>(MachineryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
