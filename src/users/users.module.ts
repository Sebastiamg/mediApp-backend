import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PorfileModule } from './profile/porfile.module';

@Module({
  imports: [UserModule, PorfileModule, RoleModule],
})
export class UsersModule {}
