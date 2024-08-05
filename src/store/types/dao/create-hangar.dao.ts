import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateHangarDao {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  surface: number;
}
