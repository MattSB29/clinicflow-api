import { describe, expect, it } from 'vitest';
import { ClinicalTriageStrategy } from '../../src/services/TriagePriorityStrategy';

describe('ClinicalTriageStrategy Domain Rules', () => {
  it('should return score 10 for emergency symptoms', () => {
    const strategy = new ClinicalTriageStrategy();
    
    const score1 = strategy.calculateScore('Estou com dor no peito');
    const score2 = strategy.calculateScore('Sinto muita falta de ar');

    expect(score1).toBe(10);
    expect(score2).toBe(10);
  });

  it('should return score 7 for urgency symptoms', () => {
    const strategy = new ClinicalTriageStrategy();
    
    const score1 = strategy.calculateScore('Estou com febre alta');
    const score2 = strategy.calculateScore('Sofri uma fratura no braço');

    expect(score1).toBe(7);
    expect(score2).toBe(7);
  });

  it('should return score 3 for regular elective symptoms by default', () => {
    const strategy = new ClinicalTriageStrategy();
    
    const score = strategy.calculateScore('Dor de cabeça leve e coriza');

    expect(score).toBe(3);
    expect(score).toBeLessThan(7);
  });
});