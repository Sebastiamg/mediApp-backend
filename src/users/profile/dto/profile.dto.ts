import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

import { BaseDto } from 'src/common/base.dto';

export class ProfileDto extends BaseDto {
  @IsOptional()
  @IsString()
  lastname?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  idCard?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  phone?: number;
}

export class UpdateProfileDto extends PartialType(ProfileDto) {}
