import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class RoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRoleDto extends PartialType(RoleDto) {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
