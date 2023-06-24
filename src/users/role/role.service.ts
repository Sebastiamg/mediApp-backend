import { Injectable, NotFoundException } from '@nestjs/common';

import { RoleDto, Role, UpdateRoleDto } from '../';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExeptionLogger } from 'src/common/exceptionLogger';

@Injectable()
export class RoleService {
  private readonly exeptionLogger = new ExeptionLogger();

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  // crate one role
  async createRole(RoleDto: RoleDto) {
    const role: RoleDto = this.roleRepository.create(RoleDto);

    try {
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  // find all roles
  async findAllRoles() {
    try {
      const roles: RoleDto[] = await this.roleRepository.find({
        // relations: ['users'],
      });
      return roles;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  // find one role
  async findOneRole(parameter: string) {
    let role: RoleDto;
    if (!isNaN(Number(parameter))) {
      role = await this.roleRepository.findOneBy({ id: Number(parameter) });
    } else {
      role = await this.roleRepository.findOneBy({
        name: parameter,
      });
    }

    if (!role)
      throw new NotFoundException(
        `Role with paramether: [${parameter}] not found`,
      );

    return role;
  }

  // update role
  async updateRole(id: number, { name }: UpdateRoleDto) {
    const role = await this.roleRepository.preload({ id, name });

    try {
      // change role name
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  removeRole(id: number) {
    return `This action removes a #${id} role`;
  }
}
