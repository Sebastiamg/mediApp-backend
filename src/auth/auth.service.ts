import { ForbiddenException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from 'src/users/user/user.service';
import {
  RegisterCredentialsDto,
  LogInCredentialDto,
} from './dto/user-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // login
  async LogIn(userCredentialsDto: LogInCredentialDto) {
    const user = await this.userService.findOneUser(userCredentialsDto.email);

    if (!user || !(await compare(userCredentialsDto.password, user.password)))
      throw new ForbiddenException(
        `Email or password incorrect, please check it`,
      );

    return user;
  }

  // register
  async SingIn(userCredentialsDto: RegisterCredentialsDto) {
    return await this.userService.createUser(userCredentialsDto);
  }
}
