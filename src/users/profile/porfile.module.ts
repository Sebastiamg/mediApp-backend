import { Module } from '@nestjs/common';
import { PorfileService } from './porfile.service';
import { PorfileController } from './porfile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from '../';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [PorfileController],
  providers: [PorfileService],
  exports: [PorfileService],
})
export class PorfileModule {}
