import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities';
import { UpdateProductDao } from '../types/dao';
import { IFindStatusOptions } from 'src/category/types';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
  async createProduct(productBody) {
    return this.save(this.create(productBody));
  }

  async getProducts(findProductQuery: IFindStatusOptions) {
    const {
      active,
      take,
      skip,
      keyword,
      orderKey,
      provider,
      code_article,
      name,
    } = findProductQuery;
    let query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.file', 'file')
      .leftJoinAndSelect('products.category', 'category')
      .leftJoinAndSelect('products.unity', 'unity')
      .leftJoinAndSelect('products.provider', 'provider')

      .leftJoinAndSelect('products.childrenProducts', 'childrenProducts')
      .where('products.parentProductId IS NULL');

    if (active !== undefined) {
      query = query.andWhere('products.isActive = :isActive', {
        isActive: active,
      });
    }
    if (code_article) {
      query.andWhere('products.code_article = :code_article', { code_article });
    }
    if (name) {
      query.andWhere('products.name = :name', { name });
    }
    if (provider) {
      query.andWhere('provider.id = :provider', { provider });
    }

    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;

      query.andWhere('(CAST(products.name AS varchar) LIKE UPPER(:keyword))', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(products.code_article) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(products.marque) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(products.family) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(category.name) LIKE UPPER(:keyword)', {
        keyword: KEYWORD_SQL_FORMATTED,
      });

      query.orWhere('UPPER(provider.fullName) LIKE UPPER(:keyword)', {
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
      query.orderBy('products.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getProduct(id: string) {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.file', 'file')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.unity', 'unity')
      .leftJoinAndSelect('product.provider', 'provider')
      .leftJoinAndSelect('product.childrenProducts', 'childrenProducts')
      .where('product.id = :id', { id })
      .getOne();
  }

  async updateProduct(id: string, updateProductDao: UpdateProductDao) {
    const updatedProduct = await this.findOneBy({ id });
    Object.assign(updatedProduct, updateProductDao);
    return this.save(updatedProduct);
  }
}
