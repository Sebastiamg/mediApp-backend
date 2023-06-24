import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PorfileService } from './porfile.service';

import { ProfileDto, UpdateProfileDto } from '../';

@Controller('porfile')
export class PorfileController {
  constructor(private readonly porfileService: PorfileService) {}

  @Post()
  create(@Body() createPorfileDto: ProfileDto) {
    return this.porfileService.createProfile(createPorfileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.porfileService.findOneProfile(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePorfileDto: UpdateProfileDto) {
    return this.porfileService.updateProfile(+id, updatePorfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.porfileService.removeProfile(+id);
  }
}
