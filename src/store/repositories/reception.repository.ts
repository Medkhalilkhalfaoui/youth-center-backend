import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reception } from '../entities';

@Injectable()
export class ReceptionRepository extends Repository<Reception> {
  constructor(private dataSource: DataSource) {
    super(Reception, dataSource.createEntityManager());
  }

  async getReceptions() {
    return this.createQueryBuilder('receptions')
      .leftJoinAndSelect('receptions.hangar', 'hangar')
      .leftJoinAndSelect('receptions.receptionDetails', 'receptionDetails')
      .getManyAndCount();
  }

  async getReceptionById(id: string) {
    return this.createQueryBuilder('reception')
      .leftJoinAndSelect('reception.hangar', 'hangar')
      .leftJoinAndSelect('reception.receptionDetails', 'receptionDetails')
      .where('reception.id = :id', { id })
      .getOne();
  }
}
