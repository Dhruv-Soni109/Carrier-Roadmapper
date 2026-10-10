import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { cacheService } from '../src/services/cache.service.js';

describe('POST /api/replan Integration Tests', () => {
  const app = createApp();

  beforeEach(() => {
    cacheService.clear();
  });

  const sampleNodes = [
    { id: 'n1', title: 'HTML & CSS', kind: 'skill', phase: 'Foundations', hours: 20, deps: [] },
    { id: 'n2', title: 'JavaScript Fundamentals', kind: 'skill', phase: 'Foundations', hours: 30, deps: ['n1'] },
    { id: 'n3', title: 'React Architecture', kind: 'skill', phase: 'Core Development', hours: 40, deps: ['n2'] },
    { id: 'n4', title: 'Node.js & Express', kind: 'skill', phase: 'Core Development', hours: 35, deps: ['n2'] },
    { id: 'n5', title: 'AWS Cloud Practitioner Certification', kind: 'cert', phase: 'Projects and Credentials', hours: 30, deps: ['n4'] },
    { id: 'n6', title: 'Capstone Full-Stack Project', kind: 'project', phase: 'Projects and Credentials', hours: 50, deps: ['n3', 'n4'] },
    { id: 'n7', title: 'Full Stack Engineer', kind: 'role', phase: 'Career Entry', hours: 0, deps: ['n6'], isTarget: true },
  ];

  it('should calculate budget and indicate fits=true when schedule is generous', async () => {
    // 20 hours/week * 6 months * 4.3 = 516 hours. Total nodes = 205 hours.
    const res = await request(app)
      .post('/api/replan')
      .send({
        goal: 'Full Stack Engineer',
        hoursPerWeek: 20,
        monthsAvailable: 6,
        nodes: sampleNodes,
        completedNodeIds: [],
        knownNodeIds: [],
      })
      .expect(200);

    expect(res.body.success).toBe(true);
    const { data } = res.body;

    expect(data.fits).toBe(true);
    expect(data.availableHours).toBe(516);
    expect(data.requiredHours).toBe(205);
    expect(data.stretchNodeIds).toEqual([]);
    expect(data.explanation).toMatch(/comfortably/i);
  });

  it('should detect tight schedule, flag fits=false, and designate non-blocking cert as stretch task', async () => {
    // 5 hours/week * 2 months * 4.3 = 43 hours. Total nodes = 205 hours.
    const res = await request(app)
      .post('/api/replan')
      .send({
        goal: 'Full Stack Engineer',
        hoursPerWeek: 5,
        monthsAvailable: 2,
        nodes: sampleNodes,
        completedNodeIds: [],
        knownNodeIds: [],
      })
      .expect(200);

    expect(res.body.success).toBe(true);
    const { data } = res.body;

    expect(data.fits).toBe(false);
    expect(data.availableHours).toBe(43);
    expect(data.requiredHours).toBe(205);
    // Cert n5 should be designated as stretch goal
    expect(data.stretchNodeIds).toContain('n5');
    // Target role n7 must NEVER be marked as stretch
    expect(data.stretchNodeIds).not.toContain('n7');
    expect(data.explanation).toMatch(/tight|shorter|stretch/i);
  });

  it('should exclude completed and known nodes from required hours calculation', async () => {
    // n1 (20h) and n2 (30h) already done. Remaining = 205 - 50 = 155h.
    const res = await request(app)
      .post('/api/replan')
      .send({
        goal: 'Full Stack Engineer',
        hoursPerWeek: 15,
        monthsAvailable: 3,
        nodes: sampleNodes,
        completedNodeIds: ['n1'],
        knownNodeIds: ['n2'],
      })
      .expect(200);

    expect(res.body.success).toBe(true);
    const { data } = res.body;

    expect(data.requiredHours).toBe(155);
  });

  it('should reject invalid hours or empty node lists with 400', async () => {
    const res1 = await request(app)
      .post('/api/replan')
      .send({
        goal: 'Full Stack Engineer',
        hoursPerWeek: 0,
        monthsAvailable: 6,
        nodes: sampleNodes,
      })
      .expect(400);
    expect(res1.body.success).toBe(false);

    const res2 = await request(app)
      .post('/api/replan')
      .send({
        goal: 'Full Stack Engineer',
        hoursPerWeek: 10,
        monthsAvailable: 6,
        nodes: [],
      })
      .expect(400);
    expect(res2.body.success).toBe(false);
  });
});
