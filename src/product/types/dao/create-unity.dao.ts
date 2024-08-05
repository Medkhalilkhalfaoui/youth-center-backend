import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnityDao {
  @IsString()
  @IsNotEmpty()
  name: string;
}
