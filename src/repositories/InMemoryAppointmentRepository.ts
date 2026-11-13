import { Appointment } from '../models/Appointment';
import { IAppointmentRepository } from './IAppointmentRepository';

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  async save(appointment: Appointment): Promise<Appointment> {
    this.appointments.push(appointment);
    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }
}