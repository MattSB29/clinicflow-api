import { logger } from '../utils/logger';

export interface ITriageStrategy {
  calculateScore(symptoms: string): number;
}

export class ClinicalTriageStrategy implements ITriageStrategy {
  calculateScore(symptoms: string): number {
    const lowerSymptoms = symptoms.toLowerCase();
    if (lowerSymptoms.includes('dor no peito') || lowerSymptoms.includes('falta de ar')) {
      logger.warn({ symptoms }, 'Alerta clínico: Caso de alta prioridade (Emergência) detectado');
      return 10; // Alta prioridade (Emergência)
    }
    if (lowerSymptoms.includes('febre alta') || lowerSymptoms.includes('fratura')) {
      logger.info({ symptoms }, 'Caso de média prioridade (Urgência) detectado na triagem');
      return 7;  // Média prioridade (Urgência)
    }
    return 3;    // Baixa prioridade (Consulta eletiva)
  }
}