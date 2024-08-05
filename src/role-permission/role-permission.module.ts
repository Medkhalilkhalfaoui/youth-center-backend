import { Module } from '@nestjs/common';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';
import { RoleController } from './backoffice-controllers/role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RolePermissionModule {}
