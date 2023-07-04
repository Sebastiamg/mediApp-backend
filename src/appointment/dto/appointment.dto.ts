import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AppointmentDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['pending', 'attended', 'lost'])
  status: string;

  // relation
  @IsString()
  @IsNotEmpty()
  medic: string;

  // User
  @IsString()
  @IsNotEmpty()
  user: string;
}

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  hour?: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'attended', 'lost'])
  status?: string;
}
