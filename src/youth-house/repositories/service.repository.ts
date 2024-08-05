import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Service } from '../entities';
import { CreateServiceDao, UpdateServiceDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class ServiceRepository extends Repository<Service> {
  constructor(private dataSource: DataSource) {
    super(Service, dataSource.createEntityManager());
  }

  async createService(createServiceDao: CreateServiceDao) {
    return this.save(this.create(createServiceDao));
  }

  async getServices(findServiceQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findServiceQuery;
    let query = this.createQueryBuilder('service');
    if (active !== undefined) {
      query = query.where('service.isActive = :isActive', { isActive: active });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(service.name) LIKE UPPER(:keyword))', {
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
      query.orderBy('service.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getService(id: string) {
    return this.createQueryBuilder('service')
      .where('service.id = :id', { id })
      .getOne();
  }

  async updateService(id: string, updateService: UpdateServiceDao) {
    const updatedService = await this.findOneBy({ id });
    Object.assign(updatedService, updateService);
    return this.save(updatedService);
  }
}
