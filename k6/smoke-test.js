import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Configuração do Smoke Test: carga mínima e rápida
  vus: 1, // 1 usuário virtual
  duration: '30s', // rodando por 30 segundos

  thresholds: {
    // O p95 (percentil 95) do tempo de requisição HTTP deve ser menor que 200ms
    http_req_duration: ['p(95) < 200'],
    // Taxa de falhas deve ser estritamente 0%
    http_req_failed: ['rate == 0'],
  },
};

export default function () {
  const url = 'http://localhost:3000/appointments';

  const res = http.get(url);

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}