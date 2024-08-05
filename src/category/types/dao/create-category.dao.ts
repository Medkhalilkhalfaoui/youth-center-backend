import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDao {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
