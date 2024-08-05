import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto, GetRoleQueryDto, UpdateRoleDto } from '../types/dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const createRole = await this.roleRepository.createRole(createRoleDto);
    return createRole;
  }

  async getRoles(getRoleQuery:GetRoleQueryDto) {

    const { page, pageSize, keyword, orderKey, active } = getRoleQuery;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedRole, total] = await this.roleRepository.getRoles({
      take,
      skip,
      orderKey,
      keyword,
      active,
    });
    let nextPage = 0;
    let hasNext = false;
    if (total > page * pageSize) {
      hasNext = true;
      nextPage = page + 1;
    }
    return {
      total,
      hasNext,
      nextPage,
      result: fetchedRole,
    };
  }

  async updateRole(id: string,updateRoleDto: UpdateRoleDto){
    return this.roleRepository.updateRole(id, updateRoleDto);
  }


}
