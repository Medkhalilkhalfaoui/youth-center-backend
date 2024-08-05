import { AuditLog } from 'src/audit-log/entities/audit-log.entity';
import { CreateAuditLogDao } from 'src/audit-log/types/dao/create-audit-log.dao';
import { AuditLogType } from 'src/audit-log/types/enums/audit-log-type.enum';
import { EntityManager } from 'typeorm';

export function parseEvent(event) {
  const targetClass = event.metadata['target'];

  return {
    databaseEntity: event.manager.create(targetClass, event.databaseEntity),
    entity: event.manager.create(targetClass, event.entity),
    user: event.queryRunner.data?.currentUser?.id,
    type: event.metadata.tableName as AuditLogType,
  };
}

export function createAuditLog({
  user,
  type,
  action,
  data,
}): CreateAuditLogDao {
  return {
    user,
    action,
    type,
    data,
  };
}

export function isAuditLogValidType(type) {
  return Object.values(AuditLogType).includes(type);
}

export async function insertAuditLog(
  manager: EntityManager,
  createAuditLogDao: CreateAuditLogDao,
) {
  await manager
    .createQueryBuilder()
    .insert()
    .into(AuditLog)
    .values(createAuditLogDao)
    .execute();
}
