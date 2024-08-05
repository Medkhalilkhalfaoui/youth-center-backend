import { Injectable } from '@nestjs/common';
import { AuditLogAction } from 'src/audit-log/types/enums';

import {
  insertAuditLog,
  createAuditLog,
  isAuditLogValidType,
  parseEvent,
} from 'src/utils/audit-log-methods';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
 

@Injectable()
@EventSubscriber()
export class GlobalSubscriber implements EntitySubscriberInterface<any> {
  async afterUpdate(event: UpdateEvent<any>) {
    const { entity, type, user } = parseEvent(event);

    const action = AuditLogAction.UPDATE;

    if (isAuditLogValidType(type) && user) {
      const data = {
        id: entity.id,
      };

      const log = createAuditLog({
        user,
        type,
        action,
        data,
      });

      await insertAuditLog(event.manager, log);
    }
  }

  async afterInsert(event: InsertEvent<any>) {
    const { entity, type, user } = parseEvent(event);

    const action = AuditLogAction.INSERT;
    if (isAuditLogValidType(type) && user) {
      const log = createAuditLog({ user, type, action, data: JSON.stringify(entity) });
      await insertAuditLog(event.manager, log);
    }
  }

  async afterRemove(event: RemoveEvent<any>) {
    const { databaseEntity, type, user } = parseEvent(event);
    const action = AuditLogAction.DELETE;
    if (isAuditLogValidType(type) && user) {
      const log = createAuditLog({
        user,
        type,
        action,
        data: JSON.stringify(databaseEntity),
      });

      await insertAuditLog(event.manager, log);
    }
  }
}
