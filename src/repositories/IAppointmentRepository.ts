import { Appointment } from '../models/Appointment';

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
}