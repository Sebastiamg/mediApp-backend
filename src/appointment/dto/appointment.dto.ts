import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  // relation
  @IsString()
  @IsNotEmpty()
  medic: string;

  // User
  @IsString()
  @IsNotEmpty()
  user: string;
}
