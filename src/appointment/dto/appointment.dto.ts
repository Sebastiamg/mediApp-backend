import { IsIn, IsNotEmpty, IsString } from 'class-validator';

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
