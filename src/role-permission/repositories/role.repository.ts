import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDao, UpdateRoleDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async createRole(createRoleDao: CreateRoleDao) {
    return this.save(this.create(createRoleDao));
  }
  async getRoles(findRoleQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findRoleQuery;
    let query = this.createQueryBuilder('roles');
    if (active !== undefined) {
      query = query.where('roles.isActive = :isActive', { isActive: active });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(roles.name) LIKE UPPER(:keyword))', {
        keyword: KEYWORD_SQL_FORMATTED,
      });
    }
    if (skip) {
      query.skip(skip);
    }

    if (take) {
      query.take(take);
    }

    if (orderKey) {
      query.orderBy('roles.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async updateRole(id: string, updateRoleDao: UpdateRoleDao) {
    const updatedRole = await this.findOneBy({ id });
    Object.assign(updatedRole, updateRoleDao);
    return this.save(updatedRole);
  }
}
