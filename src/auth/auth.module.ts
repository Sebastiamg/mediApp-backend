import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // passport estategi configuration
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // jwt configuration
    JwtModule.register({
      privateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
