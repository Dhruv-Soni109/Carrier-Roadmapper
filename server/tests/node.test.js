import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { cacheService } from '../src/services/cache.service.js';

describe('POST /api/node Integration Tests', () => {
  const app = createApp();

  beforeEach(() => {
    cacheService.clear();
  });

  const validPayload = {
    goal: 'AI/ML Engineer at Google',
    node: {
      id: 'node-ml-transformers',
      title: 'Attention Mechanisms & Transformers',
      kind: 'skill',
      phase: 'Core Development',
      hours: 30,
      summary: 'Deep dive into multi-head self-attention and encoder-decoder architecture',
      why: 'Fundamental architecture behind modern LLMs',
      deps: ['node-deep-learning-basics'],
      isTarget: false,
    },
  };

  it('should generate rich node guidance with weekend project, 6 interview questions, and done checklist', async () => {
    const res = await request(app)
      .post('/api/node')
      .send(validPayload)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.headers).toHaveProperty('x-request-id');

    const { data, meta } = res.body;
    expect(meta.isMock).toBe(true);
    expect(meta.fromCache).toBe(false);
    expect(meta.nodeId).toBe(validPayload.node.id);

    // Verify Weekend Project
    expect(data.weekendProject).toBeDefined();
    expect(data.weekendProject.title).toContain(validPayload.node.title);
    expect(data.weekendProject.description).toBeDefined();
    expect(Array.isArray(data.weekendProject.steps)).toBe(true);
    expect(data.weekendProject.steps.length).toBeGreaterThanOrEqual(2);
    expect(Array.isArray(data.weekendProject.stack)).toBe(true);
    expect(data.weekendProject.stretchGoal).toBeDefined();

    // Verify GitHub Repositories
    expect(Array.isArray(data.repositories)).toBe(true);
    expect(data.repositories.length).toBeGreaterThanOrEqual(1);
    data.repositories.forEach((repo) => {
      expect(repo).toHaveProperty('name');
      expect(repo).toHaveProperty('description');
    });

    // Verify Interview Questions with Hints
    expect(Array.isArray(data.interviewQuestions)).toBe(true);
    expect(data.interviewQuestions.length).toBeGreaterThanOrEqual(4);
    data.interviewQuestions.forEach((q) => {
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('hint');
      expect(q.question.length).toBeGreaterThanOrEqual(5);
      expect(q.hint.length).toBeGreaterThanOrEqual(5);
    });

    // Verify Curated Resources
    expect(Array.isArray(data.resources)).toBe(true);
    expect(data.resources.length).toBeGreaterThanOrEqual(1);

    // Verify Done-When Checklist
    expect(Array.isArray(data.doneWhen)).toBe(true);
    expect(data.doneWhen.length).toBeGreaterThanOrEqual(2);
  });

  it('should return cached node guidance on repeated requests', async () => {
    const res1 = await request(app)
      .post('/api/node')
      .send(validPayload)
      .expect(200);
    expect(res1.body.meta.fromCache).toBe(false);

    const res2 = await request(app)
      .post('/api/node')
      .send(validPayload)
      .expect(200);
    expect(res2.body.meta.fromCache).toBe(true);
  });

  it('should reject requests missing goal with 400', async () => {
    const invalidPayload = { ...validPayload };
    delete invalidPayload.goal;

    const res = await request(app)
      .post('/api/node')
      .send(invalidPayload)
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('should reject requests missing node object or node id with 400', async () => {
    const res1 = await request(app)
      .post('/api/node')
      .send({ goal: validPayload.goal })
      .expect(400);
    expect(res1.body.success).toBe(false);
    expect(res1.body.error.code).toBe('VALIDATION_FAILED');

    const res2 = await request(app)
      .post('/api/node')
      .send({ goal: validPayload.goal, node: { title: 'Missing ID' } })
      .expect(400);
    expect(res2.body.success).toBe(false);
    expect(res2.body.error.code).toBe('VALIDATION_FAILED');
  });
});
