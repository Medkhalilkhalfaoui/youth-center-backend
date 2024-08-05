import { Test, TestingModule } from '@nestjs/testing';
import { AuthBackofficeController } from './auth-backoffice.controller';

describe('AuthBackofficeController', () => {
  let controller: AuthBackofficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthBackofficeController],
    }).compile();

    controller = module.get<AuthBackofficeController>(AuthBackofficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
