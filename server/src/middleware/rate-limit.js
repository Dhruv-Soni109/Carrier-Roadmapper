import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP address. Please try again after 15 minutes.',
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  },
  skip: (req) => {
    // Skip rate-limiting for test runs or health checks
    return env.NODE_ENV === 'test' || req.path === '/api/health';
  },
});
