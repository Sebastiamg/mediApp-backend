import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule],
})
export class AuthModule {}
