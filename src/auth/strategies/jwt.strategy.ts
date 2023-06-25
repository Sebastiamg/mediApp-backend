import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // method to validate jwt
  async validate({ id, email }: JwtPayload) {
    const user = await this.userService.findOneUser(id);

    if (user.role.name === ('pacient' || 'medic'))
      throw new UnauthorizedException(
        'You are not an authorized to do this...😡',
      );

    return { id, email };
  }
}
