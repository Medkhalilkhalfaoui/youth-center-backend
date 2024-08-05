import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services';
import { SigninDto } from '../types';

@ApiTags('Backoffice Auth')
@Controller('backoffice/auth')
export class AuthBackofficeController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signinBO(signinDto);
  }
}
