import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('Server Infrastructure, Health & Mock Mode Tests', () => {
  const app = createApp();

  it('GET /api/health should return 200 OK with operational telemetry', async () => {
    const res = await request(app)
      .get('/api/health')
      .expect(200);

    expect(res.body.success).toBe(true);
    const { data } = res.body;

    expect(data.status).toBe('ok');
    expect(data.service).toBe('PathForge Backend API');
    expect(typeof data.uptimeSeconds).toBe('number');
    expect(data.mockMode).toBe(true);
    expect(data).toHaveProperty('cacheEntries');
    expect(data).toHaveProperty('timestamp');
  });

  it('should return a standardized 404 error envelope for nonexistent endpoints', async () => {
    const res = await request(app)
      .get('/api/nonexistent-route')
      .expect(404);

    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe('NOT_FOUND');
    expect(res.body.error.message).toMatch(/does not exist/i);
    expect(res.body.meta).toHaveProperty('requestId');
  });

  it('should set security headers configured by Helmet', async () => {
    const res = await request(app).get('/api/health');

    expect(res.headers).toHaveProperty('x-dns-prefetch-control');
    expect(res.headers).toHaveProperty('x-frame-options');
    expect(res.headers).toHaveProperty('x-content-type-options');
  });
});
