import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: {
      NODE_ENV: 'test',
      MOCK_AI: 'true',
      GEMINI_API_KEY: '',
      ANTHROPIC_API_KEY: '',
    },
  },
});
