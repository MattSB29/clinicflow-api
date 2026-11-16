import { Request, Response, NextFunction } from 'express';
import { httpRequestsTotal } from '../config/metrics';

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on('finish', () => {
    const route = req.route ? req.route.path : req.path;
    
    httpRequestsTotal.labels({
      method: req.method,
      route: route,
      status_code: res.statusCode.toString(),
    }).inc();

    console.log(`[Metrics] Requisição registrada: ${req.method} ${route} - Status: ${res.statusCode}`);
  });

  next();
}