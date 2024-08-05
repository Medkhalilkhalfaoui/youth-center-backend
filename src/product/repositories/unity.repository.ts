import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Unity } from '../entities';
import { CreateUnityDao, UpdateUnityDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class UnityRepository extends Repository<Unity> {
  constructor(private dataSource: DataSource) {
    super(Unity, dataSource.createEntityManager());
  }
  async createUnity(createUnityDao: CreateUnityDao) {
    return this.save(this.create(createUnityDao));
  }

  async getUnities(findUnityQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findUnityQuery;
    let query = this.createQueryBuilder('unities');

    if (active !== undefined) {
      query = query.where('unities.isActive = :isActive', { isActive: active });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(unities.name) LIKE UPPER(:keyword))', {
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
      query.orderBy('unities.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getUnity(id: string) {
    return this.createQueryBuilder('unity')
      .where('unity.id = :id', { id })
      .getOne();
  }

  async updateUnity(id: string, updateUnityDao: UpdateUnityDao) {
    const updatedUnity = await this.findOneBy({ id });
    Object.assign(updatedUnity, updateUnityDao);
    return this.save(updatedUnity);
  }
}
