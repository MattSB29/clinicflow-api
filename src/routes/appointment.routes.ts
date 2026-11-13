import { Router } from 'express';
import { AppointmentController } from '../controllers/AppointmentController';
import { InMemoryAppointmentRepository } from '../repositories/InMemoryAppointmentRepository';
import { ClinicalTriageStrategy } from '../services/TriagePriorityStrategy';

const appointmentRouter = Router();

const repository = new InMemoryAppointmentRepository();
const strategy = new ClinicalTriageStrategy();
const controller = new AppointmentController(repository, strategy);

appointmentRouter.post('/', (req, res) => controller.create(req, res));
appointmentRouter.get('/', (req, res) => controller.index(req, res));

export { appointmentRouter };