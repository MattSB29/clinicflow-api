import { Request, Response } from 'express';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { IAppointmentRepository } from '../repositories/IAppointmentRepository';
import { ITriageStrategy } from '../services/TriagePriorityStrategy';
import { logger } from '../utils/logger';

export class AppointmentController {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private triageStrategy: ITriageStrategy
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { patientName, symptoms } = req.body;
      if (!patientName || !symptoms) {
        logger.warn({ body: req.body }, 'Tentativa de criar agendamento com dados incompletos');
        return res.status(400).json({ error: 'Patient name and symptoms are required.' });
      }

      const createService = new CreateAppointmentService(
        this.appointmentRepository,
        this.triageStrategy
      );

      const appointment = await createService.execute({ patientName, symptoms });

      logger.info({ appointmentId: appointment.id }, 'Agendamento criado com sucesso');

      return res.status(201).json(appointment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error({ err: error }, 'Erro ao processar criação de agendamento');
        return res.status(500).json({ error: error.message });
      }
      logger.error({ err: error }, 'Erro desconhecido ao processar agendamento');
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const appointments = await this.appointmentRepository.findAll();
      return res.json(appointments);
    } catch (error: unknown) {
      logger.error({ err: error }, 'Erro ao listar agendamentos');
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}