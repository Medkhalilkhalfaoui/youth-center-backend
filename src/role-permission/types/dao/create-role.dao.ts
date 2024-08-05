import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDao {
  @IsString()
  @IsNotEmpty()
  name: string;
}
