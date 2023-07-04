import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { UserService } from 'src/users/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { ExeptionLogger } from 'src/common/exceptionLogger';

@Injectable()
export class AppointmentService {
  private readonly exeptionLogger = new ExeptionLogger();

  constructor(
    @InjectRepository(Appointment)
    private readonly appointMentRepository: Repository<Appointment>,

    private readonly userService: UserService,
  ) {}

  async create({ user, medic, date, ...appointmentData }: AppointmentDto) {
    const appointment = this.appointMentRepository.create({
      ...appointmentData,
      date: new Date(date),
      user: await this.userService.findOneUser(user),
      medic: await this.userService.findOneUser(medic, true),
    });

    try {
      await this.appointMentRepository.save(appointment);
      return appointment;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }

  findAll() {
    return `This action returns all appointment`;
  }

  async findOne(id: number) {
    const appointment = await this.appointMentRepository.findOne({
      where: { id },
      relations: ['user', 'medic'],
    });

    if (!appointment) throw new NotFoundException('Appointmen not found');

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointMentRepository.preload({
      id,
      ...updateAppointmentDto,
    });

    try {
      await this.appointMentRepository.save(appointment);
      return appointment;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }

    return;
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);

    try {
      await this.appointMentRepository.remove(appointment);
      return true;
    } catch (error) {
      this.exeptionLogger.logError(error);
    }
  }
}
