import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceDao {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsUUID()
  // @IsOptional()
  // @IsNotEmpty()
  // youthCenter?: string;
}
