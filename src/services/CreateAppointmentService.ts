import { Appointment } from '../models/Appointment';
import { IAppointmentRepository } from '../repositories/IAppointmentRepository';
import { ITriageStrategy } from './TriagePriorityStrategy';

interface RequestDTO {
  patientName: string;
  symptoms: string;
}

export class CreateAppointmentService {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private triageStrategy: ITriageStrategy
  ) {}

  async execute({ patientName, symptoms }: RequestDTO): Promise<Appointment> {
    const priorityScore = this.triageStrategy.calculateScore(symptoms);

    const appointment: Appointment = {
      id: Math.random().toString(36).substring(2, 9),
      patientName,
      symptoms,
      priorityScore,
      status: 'TRIAGED',
      createdAt: new Date(),
    };

    return await this.appointmentRepository.save(appointment);
  }
}