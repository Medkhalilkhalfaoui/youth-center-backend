import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProviderDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fullName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    isActive?: boolean;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    email?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phoneNumber?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    city?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    governorate?: string;
  }