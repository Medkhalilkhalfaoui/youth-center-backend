import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from 'src/auth/guards';
import { AuditLogBackofficeService } from './audit-log-backoffice.service';
import { FindAuditLogDto } from './types';
@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('Backoffice Audit-Logs')
@Controller('backoffice/audit-logs')
export class AuditLogBackofficeController {
  constructor(private readonly logService: AuditLogBackofficeService) {}
  @Get()
  async getLog(@Query() findAuditLogDto: FindAuditLogDto) {
    return this.logService.getlog(findAuditLogDto);
  }
}
