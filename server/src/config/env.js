import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '8080', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Google Gemini AI
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-3.8-flash',

  // Anthropic Claude AI
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
  AI_TIMEOUT_MS: parseInt(process.env.AI_TIMEOUT_MS || '35000', 10),

  // Mock Mode: enabled if MOCK_AI is explicitly 'true' or if no API key is set
  MOCK_AI: process.env.MOCK_AI === 'true' || (!process.env.GEMINI_API_KEY && !process.env.ANTHROPIC_API_KEY),

  // CORS & Security
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),

  // In-Memory Cache
  CACHE_TTL_MS: parseInt(process.env.CACHE_TTL_MS || '3600000', 10), // 1 hour
  CACHE_MAX_ENTRIES: parseInt(process.env.CACHE_MAX_ENTRIES || '500', 10),
};
