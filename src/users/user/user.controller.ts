import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';

import { UserDto, UpdateUserDto, MedicDto } from '../';

import { UserService } from './user.service';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateMedicDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto?: PaginationDto) {
    return this.userService.findAllUsers(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id);
  }

  // medic Controllers
  @Post('medic/post')
  createMedic(@Body() medicDto: MedicDto) {
    return this.userService.createUser(medicDto, true);
  }

  @Get('medic/get')
  getAllMedics(@Query() paginationDto?: PaginationDto) {
    return this.userService.findAllUsers(paginationDto, true);
  }

  @Get('medic/get/:id')
  getOneMedic(@Param('id') id: string) {
    return this.userService.findOneUser(id, true);
  }

  @Patch('medic/patch/:id')
  updateMedic(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMedicDto: UpdateMedicDto,
  ) {
    return this.userService.updateUser(id, updateMedicDto, true);
  }
}
