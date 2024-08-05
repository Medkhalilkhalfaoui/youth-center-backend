import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload} from '../types';
import { IUser } from '../../user/types';
import { UserService } from '../../user/services';
import { JWTToken } from '../types/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ id, type }: JWTPayload): Promise<IUser> {
    if (type === JWTToken.USER) return this._validateUser(id);

    throw new UnauthorizedException();
  }

  async _validateUser(id: string): Promise<IUser> {
    const fetchedUser = await this.userService.getUser(id);

    if (!fetchedUser) throw new UnauthorizedException();

    return fetchedUser;
  }
}
