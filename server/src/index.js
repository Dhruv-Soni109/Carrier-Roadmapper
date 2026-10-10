import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 PathForge Backend Server running on port ${env.PORT}`);
  console.log(`📡 Environment: ${env.NODE_ENV}`);
  console.log(`🤖 AI Engine: ${env.MOCK_AI ? 'MOCK / DEMO ENGINE' : (env.GEMINI_API_KEY ? 'Google Gemini AI' : 'Anthropic Claude AI')}`);
  console.log(`🩺 Health check: http://localhost:${env.PORT}/api/health`);
  console.log(`🌐 CORS Allowed Origin: ${env.CORS_ORIGIN}`);
  console.log(`====================================================`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`\n[Server] Received ${signal}, closing HTTP server gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP server closed. Exiting process.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('[Server] Forcing shutdown after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
