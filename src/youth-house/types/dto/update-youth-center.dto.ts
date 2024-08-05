import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateYouthCenterDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;
  
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    address?: string;
  
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    city?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    governorate?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    isActive?: boolean;
}