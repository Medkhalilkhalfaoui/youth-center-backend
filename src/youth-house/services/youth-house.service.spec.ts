import { Test, TestingModule } from '@nestjs/testing';
import { YouthHouseService } from './youth-house.service';

describe('YouthHouseService', () => {
  let service: YouthHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YouthHouseService],
    }).compile();

    service = module.get<YouthHouseService>(YouthHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
