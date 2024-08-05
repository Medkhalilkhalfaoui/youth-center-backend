import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Store } from '../entities';
import { CreateStoreDao, UpdateStoreDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class StoreRepository extends Repository<Store> {
  constructor(private dataSource: DataSource) {
    super(Store, dataSource.createEntityManager());
  }
  async createStore(createStoreDao: CreateStoreDao) {
    return this.save(this.create(createStoreDao));
  }

  async getStores(findStoreQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findStoreQuery;
    let query = this.createQueryBuilder('store')
      .leftJoinAndSelect('store.hangars', 'hangars')
    if (active !== undefined) {
      query = query.where('store.isActive = :isActive', { isActive: active });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(store.name) LIKE UPPER(:keyword))', {
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
      query.orderBy('store.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getStore(id: string) {
    return this.createQueryBuilder('store')
      .leftJoinAndSelect('store.hangars', 'hangars')
      .where('store.id = :id', { id })
      .getOne();
  }

  async updateStore(id: string, updateStoreDao: UpdateStoreDao) {
    const updatedStore = await this.findOneBy({ id });
    Object.assign(updatedStore, updateStoreDao);
    return this.save(updatedStore);
  }
}
