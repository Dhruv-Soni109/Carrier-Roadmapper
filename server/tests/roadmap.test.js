import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { cacheService } from '../src/services/cache.service.js';

describe('POST /api/roadmap Integration Tests', () => {
  const app = createApp();

  beforeEach(() => {
    cacheService.clear();
  });

  const validPayload = {
    goal: 'Full Stack Engineer at an AI Startup',
    companyType: 'Startup',
    industry: 'Technology',
    currentLevel: 'Beginner',
    knownSkills: ['HTML', 'CSS'],
    hoursPerWeek: 15,
    monthsAvailable: 6,
    background: 'Computer Science Undergraduate',
  };

  it('should generate a comprehensive, valid roadmap DAG with 201 Created', async () => {
    const res = await request(app)
      .post('/api/roadmap')
      .send(validPayload)
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.headers).toHaveProperty('x-request-id');

    const { data, meta } = res.body;
    expect(meta).toHaveProperty('requestId');
    expect(meta.isMock).toBe(true);
    expect(meta.fromCache).toBe(false);

    // Verify roadmap root fields
    expect(data).toHaveProperty('id');
    expect(data.goal).toBe(validPayload.goal);
    expect(Array.isArray(data.phases)).toBe(true);
    expect(data.phases.length).toBeGreaterThanOrEqual(4);
    expect(data.phases.length).toBeLessThanOrEqual(6);

    // Verify nodes array
    expect(Array.isArray(data.nodes)).toBe(true);
    expect(data.nodes.length).toBeGreaterThanOrEqual(12);

    // Verify each node structure
    data.nodes.forEach((node) => {
      expect(node).toHaveProperty('id');
      expect(node).toHaveProperty('title');
      expect(node).toHaveProperty('kind');
      expect(['skill', 'project', 'cert', 'role', 'milestone']).toContain(node.kind);
      expect(node).toHaveProperty('phase');
      expect(node).toHaveProperty('hours');
      expect(typeof node.hours).toBe('number');
      expect(Array.isArray(node.deps)).toBe(true);
    });

    // Verify target node
    const targetNodes = data.nodes.filter((n) => n.isTarget);
    expect(targetNodes.length).toBe(1);
    expect(targetNodes[0].kind).toBe('role');

    // Verify feasibility assessment
    expect(data.feasibilityAssessment).toBeDefined();
    expect(typeof data.feasibilityAssessment.fitsTimeline).toBe('boolean');
    expect(typeof data.feasibilityAssessment.pacingNotes).toBe('string');
    expect(typeof data.feasibilityAssessment.recommendedFocus).toBe('string');

    // Verify career path archetypes
    expect(Array.isArray(data.careerPaths)).toBe(true);
    expect(data.careerPaths.length).toBeGreaterThanOrEqual(1);
  });

  it('should return from cache on repeated requests with identical payload', async () => {
    // First request (uncached)
    const res1 = await request(app)
      .post('/api/roadmap')
      .send(validPayload)
      .expect(201);
    expect(res1.body.meta.fromCache).toBe(false);

    // Second request (cached)
    const res2 = await request(app)
      .post('/api/roadmap')
      .send(validPayload)
      .expect(201);
    expect(res2.body.meta.fromCache).toBe(true);
    expect(res2.body.data.id).toBe(res1.body.data.id);
  });

  it('should reject requests missing the required goal property with 400', async () => {
    const invalidPayload = { ...validPayload };
    delete invalidPayload.goal;

    const res = await request(app)
      .post('/api/roadmap')
      .send(invalidPayload)
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('should reject requests with invalid hoursPerWeek (0 or > 80) with 400', async () => {
    const resZero = await request(app)
      .post('/api/roadmap')
      .send({ ...validPayload, hoursPerWeek: 0 })
      .expect(400);
    expect(resZero.body.success).toBe(false);
    expect(resZero.body.error.code).toBe('VALIDATION_FAILED');

    const resExcess = await request(app)
      .post('/api/roadmap')
      .send({ ...validPayload, hoursPerWeek: 120 })
      .expect(400);
    expect(resExcess.body.success).toBe(false);
    expect(resExcess.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('should reject requests with invalid monthsAvailable with 400', async () => {
    const res = await request(app)
      .post('/api/roadmap')
      .send({ ...validPayload, monthsAvailable: -2 })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_FAILED');
  });
});
