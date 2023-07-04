import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { validate } from 'uuid';

import { ExeptionLogger } from 'src/common/exceptionLogger';
import { PorfileService } from '../profile/porfile.service';
import { PaginationDto } from 'src/common/pagination.dto';

import {
  Medic,
  MedicDto,
  RegisterCredentialsDto,
  UpdateUserDto,
  User,
  UserDto,
} from '../';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  private readonly exeptionLogger = new ExeptionLogger();
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    @InjectRepository(Medic)
    private readonly medicRepositoty: Repository<Medic>,

    private readonly profileService: PorfileService,
    private readonly roleService: RoleService,
  ) {}

  // createa user
  async createUser(
    payload: UserDto | RegisterCredentialsDto | MedicDto,
    isMedic = false,
  ) {
    const { password, profile, role, speciality, ...userInfo } =
      payload as MedicDto;
    // password hashing
    const hashedPasswod = await hash(password, await genSalt(8));

    const user: User = this.userRepository.create({
      ...userInfo,
      password: hashedPasswod,
      profile: await this.profileService.createProfile(profile && profile),
      role: await this.roleService.findOneRole(role ? role.name : 'pacient'),
    });

    try {
      if (isMedic) {
        (user as Medic).speciality = speciality;
        await this.medicRepositoty.save(user);
      } else {
        await this.userRepository.save(user);
      }

      return user;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
    return user;
  }

  // find all users
  async findAllUsers(
    { limit = 10, offset = 0 }: PaginationDto,
    isMedic = false,
  ) {
    const users = !isMedic
      ? this.userRepository.find({
          skip: offset,
          take: limit,
        })
      : this.medicRepositoty.find({
          skip: offset,
          take: limit,
        });
    return users;
  }

  async findOneUser(param: string, isMedic = false) {
    let user: User;

    if (validate(param)) {
      if (isMedic) {
        user = await this.medicRepositoty.findOneBy({ id: param });
      } else {
        user = await this.userRepository.findOneBy({ id: param });
        if (!user) {
          user = await this.medicRepositoty.findOneBy({ id: param });
        }
      }
    } else {
      user = await this.userRepository.findOneBy({ email: param });
      if (!user) {
        user = await this.medicRepositoty.findOneBy({ email: param });
      }
    }

    if (!user) throw new NotFoundException(`User not found: [ ${param} ]...😥`);

    return user;
  }

  // update user - always sent role
  async updateUser(
    id: string,
    { role, profile, ...userInfo }: UpdateUserDto,
    isMedic = false,
  ) {
    let user;
    if (!isMedic) {
      user = await this.userRepository.preload({
        id,
        ...userInfo,
        role: role ? await this.roleService.findOneRole(role.name) : undefined,
        profile:
          profile &&
          (await this.profileService.updateProfile(
            (
              await this.findOneUser(id)
            ).profile.id,
            profile,
          )),
      });
    } else {
      user = await this.medicRepositoty.preload({
        id,
        ...userInfo,
        role: role ? await this.roleService.findOneRole(role.name) : undefined,
        profile:
          profile &&
          (await this.profileService.updateProfile(
            (
              await this.findOneUser(id)
            ).profile.id,
            profile,
          )),
      });
    }

    if (!user) throw new NotFoundException(`User with id: [${id}] not fond`);

    try {
      if (isMedic) {
        await this.medicRepositoty.save(user);
      } else {
        await this.userRepository.save(user);
      }
      return user;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  // delete user
  async removeUser(id: string, isMedic = false) {
    const user = await this.findOneUser(id);

    if (isMedic) {
      await this.medicRepositoty.remove(user);
    } else {
      await this.userRepository.remove(user);
    }
    await this.profileService.removeProfile(user.profile.id);

    return true;
  }
}
