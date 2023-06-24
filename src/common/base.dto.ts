import { IsDate, IsOptional } from 'class-validator';

export class BaseDto {
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
