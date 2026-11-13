import { Request, Response } from 'express';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { IAppointmentRepository } from '../repositories/IAppointmentRepository';
import { ITriageStrategy } from '../services/TriagePriorityStrategy';

export class AppointmentController {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private triageStrategy: ITriageStrategy
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { patientName, symptoms } = req.body;
      if (!patientName || !symptoms) {
        return res.status(400).json({ error: 'Patient name and symptoms are required.' }); //TODO: português
      }

      const createService = new CreateAppointmentService(
        this.appointmentRepository,
        this.triageStrategy
      );

      const appointment = await createService.execute({ patientName, symptoms });
      return res.status(201).json(appointment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    const appointments = await this.appointmentRepository.findAll();
    return res.json(appointments);
  }
}