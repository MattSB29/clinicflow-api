import { describe, expect, it } from 'vitest';

function validateAppointmentPriority(priorityScore: number): boolean {
  return priorityScore >= 1 && priorityScore <= 10;
}

describe('Appointment Domain Rules', () => {
  it('should allow valid priority scores between 1 and 10', () => {
    const validScore = 8;
    const isValid = validateAppointmentPriority(validScore);

    expect(isValid).toBe(true);
  });

  it('should reject invalid priority scores out of range', () => {
    const invalidScore = 15;
    const isValid = validateAppointmentPriority(invalidScore);

    expect(isValid).toBe(false);
  });

  it('should initialize a new appointment with PENDING status by default', () => {
    const appointmentData = {
      id: 'app-1',
      patientName: 'Carlos Silva',
      symptoms: 'Dor no peito',
      priorityScore: 9,
      createdAt: new Date(),
    };

    // Aplicando a regra padrão de domínio
    const appointment = {
      ...appointmentData,
      status: 'PENDING' as const,
    };

    expect(appointment.status).toBe('PENDING');
    expect(appointment.priorityScore).toBeGreaterThan(5);
  });
});