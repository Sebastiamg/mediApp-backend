import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from 'src/users/user/user.service';
import {
  RegisterCredentialsDto,
  LogInCredentialDto,
} from './dto/user-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // login
  async LogIn(userCredentialsDto: LogInCredentialDto) {
    const user = await this.userService.findOneUser(userCredentialsDto.email);

    if (!user || !(await compare(userCredentialsDto.password, user.password)))
      throw new UnauthorizedException(
        `Email or Password incorrect, please check it`,
      );

    const { email, id } = user;
    return {
      ...user,
      token: this.generateJWT({ id, email }),
    };
  }

  // register
  async SingIn(userCredentialsDto: RegisterCredentialsDto) {
    const user = await this.userService.createUser(userCredentialsDto);

    const { email, id } = user;
    return {
      ...user,
      token: this.generateJWT({ id, email }),
    };
  }

  private generateJWT(payload: JwtPayload) {
    const JWT = this.jwtService.sign(payload);

    return JWT;
  }
}
