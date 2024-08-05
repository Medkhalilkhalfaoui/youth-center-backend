import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Job } from '../enums/job.enum';

export class CreateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  role: string;

  @ApiPropertyOptional()
  @IsEnum(Job)
  @IsNotEmpty()
  job: Job;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  store?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  serviceYouthCenter?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  youthCenter?: string;
}
