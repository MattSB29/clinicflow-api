import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryAppointmentRepository } from '../../src/repositories/InMemoryAppointmentRepository';
import { Appointment } from '../../src/models/Appointment';

let appointmentsRepository: InMemoryAppointmentRepository;

describe('InMemory Appointment Repository', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentRepository();
  });

  it('should be able to save a new appointment', async () => {
    const appointment: Appointment = {
      id: 'appointment-1',
      patientName: 'Maria Silva',
      symptoms: 'Dor de cabeça e febre',
      priorityScore: 8,
      status: 'PENDING',
      createdAt: new Date(),
    };

    await appointmentsRepository.save(appointment);

    const appointments = await appointmentsRepository.findAll();

    expect(appointments).toHaveLength(1);
    expect(appointments[0]).toEqual(appointment);
  });

  it('should be able to list all appointments', async () => {
    const appointment1: Appointment = {
      id: 'appointment-1',
      patientName: 'Maria Silva',
      symptoms: 'Dor de cabeça',
      priorityScore: 5,
      status: 'PENDING',
      createdAt: new Date(),
    };

    const appointment2: Appointment = {
      id: 'appointment-2',
      patientName: 'Carlos Souza',
      symptoms: 'Dor no peito',
      priorityScore: 10,
      status: 'PENDING',
      createdAt: new Date(),
    };

    await appointmentsRepository.save(appointment1);
    await appointmentsRepository.save(appointment2);

    const appointments = await appointmentsRepository.findAll();

    expect(appointments).toHaveLength(2);
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});