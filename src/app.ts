import express from 'express';
import { appointmentRouter } from './routes/appointment.routes';
import { metricsMiddleware } from './middlewares/metricsMiddleware';
import { client } from './config/metrics';

const app = express();

app.use(express.json());

app.use(metricsMiddleware);

app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('/metrics', async (_req, res) => {
  try {
    res.setHeader('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/appointments', appointmentRouter);

export { app };