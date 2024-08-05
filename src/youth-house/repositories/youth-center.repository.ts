import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { YouthCenter } from '../entities';
import { CreateYouthCenterDao, UpdateYouthCenterDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class YouthCenterRepository extends Repository<YouthCenter> {
  constructor(private dataSource: DataSource) {
    super(YouthCenter, dataSource.createEntityManager());
  }

  async createYouthHouse(createYouthCenterDao: CreateYouthCenterDao) {
    return this.save(this.create(createYouthCenterDao));
  }

  async getYouthHouses(findyouthCenterQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findyouthCenterQuery;
    let query = this.createQueryBuilder('youthCenter')
      .leftJoinAndSelect('youthCenter.serviceYouthCenter', 'serviceYouthCenter')
      .leftJoinAndSelect('serviceYouthCenter.service', 'service');

    if (active !== undefined) {
      query = query.where('youthCenter.isActive = :isActive', {
        isActive: active,
      });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(youthCenter.name) LIKE UPPER(:keyword))', {
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
      query.orderBy('youthCenter.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getYouthHouse(id: string) {
    return this.createQueryBuilder('youthCenter')
      .leftJoinAndSelect('youthCenter.serviceYouthCenter', 'serviceYouthCenter')
      .leftJoinAndSelect('serviceYouthCenter.service', 'service')
      .where('youthCenter.id = :id', { id })
      .getOne();
  }

  async updateYouthHouse(
    id: string,
    updateYouthCenterDao: UpdateYouthCenterDao,
  ) {
    const updatedYouthCenter = await this.findOneBy({ id });
    Object.assign(updatedYouthCenter, updateYouthCenterDao);
    return this.save(updatedYouthCenter);
  }
}
