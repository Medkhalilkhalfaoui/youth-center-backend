import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQuery } from 'src/shared/types';
import { AuditLogAction } from '../enums/audit-log-action.enum';
import { AuditLogType } from '../enums/audit-log-type.enum';

export class FindAuditLogDto extends PaginationQuery {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  user?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(AuditLogType)
  type?: AuditLogType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(AuditLogAction)
  action?: AuditLogAction;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: Date;

}
