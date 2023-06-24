import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile, ProfileDto, UpdateProfileDto } from '../';
import { ExeptionLogger } from 'src/common/exceptionLogger';

@Injectable()
export class PorfileService {
  private readonly exeptionLogger = new ExeptionLogger();

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // create one profile
  async createProfile(createPorfileDto?: ProfileDto) {
    const profile: ProfileDto = this.profileRepository.create(createPorfileDto);
    try {
      // await this.profileRepository.save(profile);
      return profile;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  // find one profile
  async findOneProfile(id: number) {
    const profile = await this.profileRepository.findOneBy({ id });

    if (!profile) throw new NotFoundException('Profile not found');

    await this.profileRepository.remove(profile);
    return profile;
  }

  // TODO
  async updateProfile(id: number, updatePorfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.preload({
      id,
      ...updatePorfileDto,
    });

    if (!profile) throw new NotFoundException(`Profile not found`);

    try {
      return profile;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  // delete one profile
  async removeProfile(id: number) {
    await this.profileRepository.delete(id);
    return true;
  }
}
