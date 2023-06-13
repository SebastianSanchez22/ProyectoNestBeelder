import { Test, TestingModule } from '@nestjs/testing';
import { MachineryController } from './machinery.controller';
import { MachineryService } from './machinery.service';

describe('MachineryController', () => {
  let controller: MachineryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineryController],
      providers: [MachineryService],
    }).compile();

    controller = module.get<MachineryController>(MachineryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
