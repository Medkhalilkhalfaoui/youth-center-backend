import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Hangar } from '../entities';
import { CreateHangarDao, UpdateHangarDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class HangarRepository extends Repository<Hangar> {
  constructor(private dataSource: DataSource) {
    super(Hangar, dataSource.createEntityManager());
  }

  async createHangar(createHangarDao: CreateHangarDao) {
    return this.save(this.create(createHangarDao));
  }

  async getHangars(findHangarQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findHangarQuery;
    let query = this.createQueryBuilder('hangar').leftJoinAndSelect(
      'hangar.store',
      'store',
    );

    if (active !== undefined) {
      query = query.where('hangar.isActive = :isActive', { isActive: active });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(hangar.name) LIKE UPPER(:keyword))', {
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
      query.orderBy('hangar.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getHangar(id: string) {
    return this.createQueryBuilder('hangar')
      .leftJoinAndSelect('hangar.store', 'store')
      .where('hangar.id = :id', { id })
      .getOne();
  }

  async updateHangar(id: string, updateHangarDao: UpdateHangarDao) {
    const updatedHangar = await this.findOneBy({ id });
    Object.assign(updatedHangar, updateHangarDao);
    return this.save(updatedHangar);
  }
}
