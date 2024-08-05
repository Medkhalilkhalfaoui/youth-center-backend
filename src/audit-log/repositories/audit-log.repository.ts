import { DataSource,  Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';
import { FindAuditLogDao } from '../types';

export class AuditLogRepository extends Repository<AuditLog> {
  constructor(private dataSource: DataSource) {
    super(AuditLog, dataSource.createEntityManager());
  }
  async findAuditLog({
    user,
    type,
    action,
    date,
    take,
    skip,
 
  }: FindAuditLogDao = {}) {
    const query = this.createQueryBuilder('auditLog');
    query.leftJoinAndSelect('auditLog.user', 'user');

    if (user) {
      query.andWhere('auditLog.user = :user', { user });
    }

    if (type) {
      query.andWhere('auditLog.type = :type', { type });
    }

    if (action) {
      query.andWhere('auditLog.action = :action', {
        action,
      });
    }

    if (date) {
      query.andWhere('DATE(auditLog.createdAt) = DATE(:date)', {
        date,
      });
    }

    if (skip) {
      query.skip(skip);
    }

    if (take) {
      query.take(take);
    }

 

    return query.getManyAndCount();
  }
}
