import { IAppointmentRepository } from '../repositories/IAppointmentRepository';
import { Appointment } from '../models/Appointment';
import { logger } from '../utils/logger';

interface CreateAppointmentRequest {
  patientName: string;
  symptoms: string;
  priorityScore: number;
}

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: IAppointmentRepository) {}

  async execute(data: CreateAppointmentRequest): Promise<Appointment> {
    const appointment: Appointment = {
      id: `appointment-${Date.now()}`,
      patientName: data.patientName,
      symptoms: data.symptoms,
      priorityScore: data.priorityScore,
      status: 'PENDING',
      createdAt: new Date(),
    };

    await this.appointmentsRepository.save(appointment);

    logger.info(
      { appointmentId: appointment.id, status: appointment.status },
      'Agendamento persistido com sucesso pelo UseCase'
    );

    return appointment;
  }
}