import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Job } from '../enums/job.enum';

export class CreateUserDao {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Job)
  @IsNotEmpty()
  job: Job;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  store?: string;

  @IsUUID()
  @IsNotEmpty()
  role: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  serviceYouthCenter?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  youthCenter?: string;
}
