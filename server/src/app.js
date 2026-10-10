import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { apiRateLimiter } from './middleware/rate-limit.js';
import { errorHandler } from './middleware/error-handler.js';
import { NotFoundError } from './utils/errors.js';

// Route handlers
import healthRoutes from './routes/health.routes.js';
import roadmapRoutes from './routes/roadmap.routes.js';
import nodeRoutes from './routes/node.routes.js';
import replanRoutes from './routes/replan.routes.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createApp = () => {
  const app = express();

  // 1. Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // API server doesn't serve HTML
  }));

  // 2. CORS configuration (permits localhost on 8080, 5173, and same-origin)
  const allowedOrigins = env.CORS_ORIGIN
    ? env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:8080', 'http://localhost:5173'];

  app.use(cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  }));

  // 3. Body Parser with Size Limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));

  // 4. Request ID Tracing
  app.use(requestIdMiddleware);

  // 5. Rate Limiter
  app.use(apiRateLimiter);

  // 6. Mount Primary API Routes (supports both /api prefix and stripped path rewrites)
  app.use('/api/health', healthRoutes);
  app.use('/health', healthRoutes);

  app.use('/api/roadmap', roadmapRoutes);
  app.use('/roadmap', roadmapRoutes);

  app.use('/api/node', nodeRoutes);
  app.use('/node', nodeRoutes);

  app.use('/api/replan', replanRoutes);
  app.use('/replan', replanRoutes);

  // 7. Serve Built Frontend (Combined Single-Port Deployment)
  const distPath = path.resolve(__dirname, '../../dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 8. Catch-all 404 handler for API routes
  app.use((req, res, next) => {
    next(new NotFoundError(`Endpoint ${req.method} ${req.originalUrl} does not exist.`));
  });

  // 9. Central Error Handler
  app.use(errorHandler);

  return app;
};
