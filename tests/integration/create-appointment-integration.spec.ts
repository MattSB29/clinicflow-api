// test/integration/create-appointment-integration.spec.ts
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryAppointmentRepository } from '../../src/repositories/InMemoryAppointmentRepository';
import { CreateAppointmentUseCase } from '../../src/use-cases/create-appointment';

describe('Create Appointment Integration Flow', () => {
  let appointmentsRepository: InMemoryAppointmentRepository;
  let createAppointmentUseCase: CreateAppointmentUseCase;

  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentRepository();
    createAppointmentUseCase = new CreateAppointmentUseCase(appointmentsRepository);
  });

  it('should successfully execute use case and persist the appointment in the repository', async () => {
    const appointmentInput = {
      patientName: 'Mariana Oliveira',
      symptoms: 'Falta de ar intensa e tontura',
      priorityScore: 10,
    };

    // Executa o caso de uso (integração entre Use Case e Repositório)
    const createdAppointment = await createAppointmentUseCase.execute(appointmentInput);

    expect(createdAppointment).toHaveProperty('id');
    expect(createdAppointment.patientName).toBe('Mariana Oliveira');
    expect(createdAppointment.status).toBe('PENDING');

    // Valida se o dado realmente foi gravado e pode ser recuperado do repositório
    const allAppointments = await appointmentsRepository.findAll();
    
    expect(allAppointments).toHaveLength(1);
    expect(allAppointments[0]).toEqual(createdAppointment);
  });
});