// test/domain/appointment-priority.spec.ts
import { describe, expect, it } from 'vitest';

// Regra de domínio pura
function classifyPatientPriority(score: number): 'URGENT' | 'NORMAL' | 'LOW' {
  if (score >= 8) return 'URGENT';
  if (score >= 4) return 'NORMAL';
  return 'LOW';
}

describe('Appointment Priority Classification Domain Rules', () => {
  it('should classify score 8 or higher as URGENT', () => {
    expect(classifyPatientPriority(9)).toBe('URGENT');
    expect(classifyPatientPriority(8)).toBe('URGENT');
  });

  it('should classify scores between 4 and 7 as NORMAL', () => {
    expect(classifyPatientPriority(5)).toBe('NORMAL');
    expect(classifyPatientPriority(7)).toBe('NORMAL');
  });

  it('should classify scores below 4 as LOW', () => {
    expect(classifyPatientPriority(3)).toBe('LOW');
    expect(classifyPatientPriority(1)).toBe('LOW');
  });
});