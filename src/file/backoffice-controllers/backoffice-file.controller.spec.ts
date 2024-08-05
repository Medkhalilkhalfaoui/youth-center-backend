import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeFileController } from './backoffice-file.controller';

describe('BackofficeFileControllerTsController', () => {
  let controller: BackofficeFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeFileController],
    }).compile();

    controller = module.get<BackofficeFileController>(BackofficeFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
