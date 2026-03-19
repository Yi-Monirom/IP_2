import { Test, TestingModule } from '@nestjs/testing';
import { RecieptController } from './reciept.controller';

describe('RecieptController', () => {
  let controller: RecieptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecieptController],
    }).compile();

    controller = module.get<RecieptController>(RecieptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
