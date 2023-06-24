import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

import { BaseDto } from 'src/common/base.dto';

export class ProfileDto extends BaseDto {
  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  idCard?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  phone?: number;
}

export class UpdateProfileDto extends PartialType(ProfileDto) {}
