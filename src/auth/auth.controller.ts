import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterCredentialsDto,
  LogInCredentialDto,
} from 'src/auth/dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userCredentialsDto: LogInCredentialDto) {
    return this.authService.LogIn(userCredentialsDto);
  }

  @Post('register')
  register(@Body() userCredentialsDto: RegisterCredentialsDto) {
    return this.authService.SingIn(userCredentialsDto);
  }
}
