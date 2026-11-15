// test/domain/appointment-status.spec.ts
import { describe, expect, it } from 'vitest';

// Regra de domínio pura
function canUpdateAppointmentStatus(currentStatus: 'PENDING' | 'TRIAGED' | 'CANCELLED', newStatus: 'PENDING' | 'TRIAGED' | 'CANCELLED'): boolean {
  if (currentStatus === 'CANCELLED') {
    return false; // Atendimentos cancelados não podem ser alterados
  }
  if (currentStatus === 'TRIAGED' && newStatus === 'PENDING') {
    return false; // Não pode voltar para pendente após a triagem
  }
  return true;
}

describe('Appointment Status Transition Domain Rules', () => {
  it('should allow changing status from PENDING to TRIAGED', () => {
    const isValid = canUpdateAppointmentStatus('PENDING', 'TRIAGED');
    expect(isValid).toBe(true);
  });

  it('should reject status change if appointment is already CANCELLED', () => {
    const isValid = canUpdateAppointmentStatus('CANCELLED', 'TRIAGED');
    expect(isValid).toBe(false);
  });

  it('should reject reverting status from TRIAGED back to PENDING', () => {
    const isValid = canUpdateAppointmentStatus('TRIAGED', 'PENDING');
    expect(isValid).toBe(false);
  });
});