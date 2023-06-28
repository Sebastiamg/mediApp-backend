import { Injectable } from '@nestjs/common';
import { AppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
  create(createAppointmentDto: AppointmentDto) {
    return 'This action adds a new appointment';
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: any) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
