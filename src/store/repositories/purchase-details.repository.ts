import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PurchaseDetails } from '../entities';

@Injectable()
export class PurchaseDetailsRepository extends Repository<PurchaseDetails> {
  constructor(private dataSource: DataSource) {
    super(PurchaseDetails, dataSource.createEntityManager());
  }

  async getDetailsPurshaceByProductAndPurchase(purchase: string, product) {
    return this.createQueryBuilder('PurchaseDetails')
      .where('productId=:product', { product })
      .andWhere('purchaseId=:purchase', { purchase })
      .getOne();
  }
}
