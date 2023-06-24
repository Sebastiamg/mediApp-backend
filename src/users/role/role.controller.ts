import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';

import { RoleDto, UpdateRoleDto } from '../';
import { ROLES } from './entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: RoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAllRoles();
  }

  @Get(':parameter')
  findOne(@Param('parameter') parameter: string) {
    return this.roleService.findOneRole(parameter);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.removeRole(+id);
  }
}
