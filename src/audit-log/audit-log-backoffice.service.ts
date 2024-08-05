import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from './repositories/audit-log.repository';
import { FindAuditLogDto } from './types';

@Injectable()
export class AuditLogBackofficeService {
  constructor(private readonly auditLogRepository: AuditLogRepository) {}
  async getlog(findAuditLogDto: FindAuditLogDto) {
    const { user, type, action, date, page, pageSize } = findAuditLogDto;
    const take = pageSize || 10;
    const skip = (page - 1) * take || 0;
    const [fetchedAuditLogLines, total] =
      await this.auditLogRepository.findAuditLog({
        user,
        type,
        action,
        date,
        take,
        skip,
         
      });
    let nextPage = 0;
    let hasNext = false;
    if (total > page * pageSize) {
      hasNext = true;
      nextPage = page + 1;
    }

    return {
      total,
      hasNext,
      nextPage,
      result: fetchedAuditLogLines,
    };
  }
}
