export interface Appointment {
  id: string;
  patientName: string;
  symptoms: string;
  priorityScore: number;
  status: 'PENDING' | 'TRIAGED' | 'CANCELLED'; //TODO: Renomear para português
  createdAt: Date;
}