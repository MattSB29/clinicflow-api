export interface ITriageStrategy {
  calculateScore(symptoms: string): number;
}

export class ClinicalTriageStrategy implements ITriageStrategy {
  calculateScore(symptoms: string): number {
    const lowerSymptoms = symptoms.toLowerCase();
    if (lowerSymptoms.includes('dor no peito') || lowerSymptoms.includes('falta de ar')) {
      return 10; // Alta prioridade (Emergência)
    }
    if (lowerSymptoms.includes('febre alta') || lowerSymptoms.includes('fratura')) {
      return 7;  // Média prioridade (Urgência)
    }
    return 3;    // Baixa prioridade (Consulta eletiva)
  }
}