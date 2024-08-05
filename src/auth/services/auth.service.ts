import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SigninDto, JWTPayload } from '../types';
import { UserService } from 'src/user/services';
import { JWTToken } from '../types/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async signinBO({ username, password }: SigninDto) {
    const fetchedUser = await this.userService.getUserAuthInfo(username);

    if (!fetchedUser) {
      throw new UnauthorizedException();
    }

    const isMatch = await this._matchPassword(password, fetchedUser.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    if (!fetchedUser.isActive) {
      throw new ForbiddenException('user not active');
    }

    const payload: JWTPayload = { id: fetchedUser.id, type: JWTToken.USER };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async _matchPassword(plainPassword: string, hashedPassword: string) {
    return compare(plainPassword, hashedPassword);
  }
}
