import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ProfileDto, RoleDto } from '../../';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsEmail({}, { message: 'Put a valid Email Ex: sebas@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @Type(() => ProfileDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  profile?: ProfileDto;

  @Type(() => RoleDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  role?: RoleDto;
}

export class UpdateUserDto extends PartialType(UserDto) {}
