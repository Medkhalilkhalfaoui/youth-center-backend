import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogBackofficeController } from './audit-log-backoffice.controller';
import { AuditLogBackofficeService } from './audit-log-backoffice.service';
import { AuditLogRepository } from './repositories/audit-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogRepository])],
  controllers: [AuditLogBackofficeController],
  providers: [AuditLogBackofficeService],
})
export class AuditLogModule {}
