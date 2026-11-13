import express from 'express';
import { appointmentRouter } from './routes/appointment.routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.use('/appointments', appointmentRouter);

export { app };