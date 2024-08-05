import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto, GetRoleQueryDto, UpdateRoleDto } from '../types/dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  async getRoles(@Query() getRoleQuery:GetRoleQueryDto) {
    return this.roleService.getRoles(getRoleQuery);
  }

  @Patch(':id')
  async updateRole(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.updateRole(id, updateRoleDto);
  }
}
