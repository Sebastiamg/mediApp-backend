import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterCredentialsDto,
  LogInCredentialDto,
} from 'src/auth/dto/user-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt.auth.guard';

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

  @UseGuards(AuthGuard())
  @Get('test')
  testRoute() {
    return {
      message: 'test route',
      guard: 'guardx df',
    };
  }
}
