import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app';

describe('Appointments E2E Tests', () => {
  it('should be able to list appointments', async () => {
    // O Supertest pega a instância do app do Express diretamente
    const response = await request(app)
      .get('/appointments');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should be able to create a new appointment', async () => {
    const response = await request(app)
      .post('/appointments')
      .send({
        patientName: 'Maria Silva',
        symptoms: 'Febre e dor de cabeça',
        priorityScore: 7,
      });

    expect(response.status).toBe(201);
  });
});