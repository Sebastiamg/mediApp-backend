import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PorfileModule } from '../profile/porfile.module';
import { RoleModule } from '../role/role.module';
import { User, Medic } from '../';

@Module({
  imports: [TypeOrmModule.forFeature([User, Medic]), PorfileModule, RoleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
