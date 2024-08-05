import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Provider } from '../entities';
import { CreateProviderDao, UpdateProviderDao } from '../types/dao';
import { IFindProviderOptions, IFindStatusOptions } from 'src/category/types';

@Injectable()
export class ProviderRepository extends Repository<Provider> {
  constructor(private dataSource: DataSource) {
    super(Provider, dataSource.createEntityManager());
  }

  async createProvider(createProviderDao: CreateProviderDao) {
    return this.save(this.create(createProviderDao));
  }

  async getProviders(findProviderQuery: IFindProviderOptions) {
    const { active, take, skip, keyword, orderKey } = findProviderQuery;
    let query = this.createQueryBuilder('providers');
    if (active !== undefined) {
      query = query.where('providers.isActive = :isActive', {
        isActive: active,
      });
    }

    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;

      query.andWhere(
        '(CAST(providers.fullName AS varchar) LIKE UPPER(:keyword))',
        {
          keyword: KEYWORD_SQL_FORMATTED,
        },
      );

      query.orWhere('UPPER(providers.email) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(providers.governorate) LIKE UPPER(:keyword)', {
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
      query.orderBy('providers.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getProvider(id: string) {
    return this.createQueryBuilder('provider')
      .where('provider.id = :id', { id })
      .getOne();
  }

  async updateProvider(id: string, updateProviderDao: UpdateProviderDao) {
    const updatedProvider = await this.findOneBy({ id });
    Object.assign(updatedProvider, updateProviderDao);
    return this.save(updatedProvider);
  }
}
