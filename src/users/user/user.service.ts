import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { validate } from 'uuid';

import { ExeptionLogger } from 'src/common/exceptionLogger';
import { PorfileService } from '../profile/porfile.service';
import { PaginationDto } from 'src/common/pagination.dto';

import { RegisterCredentialsDto, UpdateUserDto, User, UserDto } from '../';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  private readonly exeptionLogger = new ExeptionLogger();
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    private readonly profileService: PorfileService,
    private readonly roleService: RoleService,
  ) {}

  // createa user
  async createUser(payload: UserDto | RegisterCredentialsDto) {
    console.log(payload);
    const { password, profile, role, ...userInfo } = payload as UserDto;
    // password hashing
    const hashedPasswod = await hash(password, await genSalt(8));

    const user: User = this.userRepository.create({
      ...userInfo,
      password: hashedPasswod,
      profile: await this.profileService.createProfile(profile && profile),
      role: await this.roleService.findOneRole(role ? role.name : 'pacient'),
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
    return user;
  }

  // find all users
  async findAllUsers({ limit = 10, offset = 0 }: PaginationDto) {
    const users = this.userRepository.find({
      skip: offset,
      take: limit,
    });

    return users;
  }

  async findOneUser(param: string) {
    let user: User;
    if (validate(param)) {
      user = await this.userRepository.findOneBy({ id: param });
    } else {
      user = await this.userRepository.findOneBy({ email: param });
    }

    if (!user) throw new NotFoundException(`User not found: [ ${param} ]...😥`);

    return user;
  }

  // update user - always sent role
  async updateUser(id: string, { role, profile, ...userInfo }: UpdateUserDto) {
    const user = await this.userRepository.preload({
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

    if (!user) throw new NotFoundException(`User with id: [${id}] not fond`);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  // delete user
  async removeUser(id: string) {
    const user = await this.findOneUser(id);

    await this.userRepository.remove(user);
    await this.profileService.removeProfile(user.profile.id);

    return true;
  }
}
