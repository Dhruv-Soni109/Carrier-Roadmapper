import { env } from '../config/env.js';
import { cacheService } from '../services/cache.service.js';
import { successResponse } from '../utils/response.js';

export const healthCheckHandler = (req, res) => {
  const healthData = {
    status: 'ok',
    service: 'PathForge Backend API',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    mockMode: env.MOCK_AI,
    model: env.MOCK_AI ? 'mock-engine' : env.ANTHROPIC_MODEL,
    cacheEntries: cacheService.size(),
    environment: env.NODE_ENV,
    version: '1.0.0',
  };

  return successResponse(res, healthData, { status: 'healthy' }, 200);
};
