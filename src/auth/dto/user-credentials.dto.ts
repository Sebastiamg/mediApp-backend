import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from 'src/users';

export class RegisterCredentialsDto extends OmitType(UserDto, [
  'profile',
  'role',
]) {}

export class LogInCredentialDto extends OmitType(RegisterCredentialsDto, [
  'firstname',
]) {}
