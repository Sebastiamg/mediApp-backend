import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PorfileModule } from '../profile/porfile.module';
import { RoleModule } from '../role/role.module';
import { User } from '../';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), PorfileModule, RoleModule],
  exports: [UserService],
})
export class UserModule {}
