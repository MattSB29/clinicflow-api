import client from 'prom-client';

// Inicializa a coleta de métricas padrão do Node.js (event loop, memória, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'clinicflow_' });

// Métrica customizada: Contador total de requisições HTTP
export const httpRequestsTotal = new client.Counter({
  name: 'clinicflow_http_requests_total',
  help: 'Total de requisições HTTP recebidas na ClinicFlow API',
  labelNames: ['method', 'route', 'status_code'],
});

export { client };