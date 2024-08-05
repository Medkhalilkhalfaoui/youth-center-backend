import { Test, TestingModule } from '@nestjs/testing';
import { YouthHouseController } from './youth-house.controller';

describe('YouthHouseController', () => {
  let controller: YouthHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YouthHouseController],
    }).compile();

    controller = module.get<YouthHouseController>(YouthHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
