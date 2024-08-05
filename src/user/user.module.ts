import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities';
import { UserRepository } from './repositories';
import { UserBackofficeController } from './backoffice-controllers';
import { UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserBackofficeController],
  providers: [UserService, UserRepository],
  exports: [TypeOrmModule, UserService,UserRepository],
})
export class UserModule {}
