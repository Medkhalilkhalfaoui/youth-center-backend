import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Purchase } from '../entities';
import { IFindQueryOptions } from '../types';
import { UpdateStatusPurchaseDao } from '../types/dao';

@Injectable()
export class PurchaseRepository extends Repository<Purchase> {
  constructor(private dataSource: DataSource) {
    super(Purchase, dataSource.createEntityManager());
  }
  async getPurchases(findQuery: IFindQueryOptions) {
    const { take, skip, keyword, orderKey, status } = findQuery;

    let query = this.createQueryBuilder('purchases').leftJoinAndSelect(
      'purchases.user',
      'user',
    );
    if (status) {
      query.where('purchases.status IN (:...status)', {
        status,
      });
    }

    if (keyword) {
      const KEYWORD_SQL_FORMATTED = `%${keyword}%`;
      query.andWhere('(UPPER(purchases.numero) LIKE UPPER(:keyword))', {
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
      query.orderBy('purchases.createdAt', orderKey);
    }
    return query.getManyAndCount();
  }

  async getPurchaseById(id: string) {
    return this.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.user', 'user')
      .leftJoinAndSelect('purchase.purchaseDetails', 'purchaseDetails')
      .leftJoinAndSelect('purchaseDetails.product', 'product')
      .leftJoinAndSelect('product.childrenProducts', 'childrenProducts')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.unity', 'unity')
      .leftJoinAndSelect('product.file', 'file')
      .where('purchase.id = :id', { id })
      .getOne();
  }

  async updateStatusPurchase(
    id: string,
    updateStatusPurchaseDao: UpdateStatusPurchaseDao,
  ) {
    const updatedPurhase = await this.findOneBy({ id });
    const { status } = updateStatusPurchaseDao;
    updatedPurhase.status = status;
    return this.save(updatedPurhase);
  }
}
