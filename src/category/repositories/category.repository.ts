import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDao, UpdateCategoryDao } from '../types/dao';
import { IFindStatusOptions } from '../types';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
  async createCategory(createCategoryDao: CreateCategoryDao) {
    return this.save(this.create(createCategoryDao));
  }

  async getCategories(findCategoriesQuery: IFindStatusOptions) {
    const { active, take, skip, keyword, orderKey } = findCategoriesQuery;
    let query = this.createQueryBuilder('categories');

    if (active !== undefined) {
      query = query.where('categories.isActive = :isActive', {
        isActive: active,
      });
    }
    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(providers.name) LIKE UPPER(:keyword))', {
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
      query.orderBy('categories.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getCategory(id: string) {
    return this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  async updateCategory(id: string, updateCategoryDao: UpdateCategoryDao) {
    const updatedCategory = await this.findOneBy({ id });
    Object.assign(updatedCategory, updateCategoryDao);
    return this.save(updatedCategory);
  }
}
