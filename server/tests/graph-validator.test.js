import { describe, it, expect } from 'vitest';
import { validateAndRepairGraph, normalizeKey } from '../src/utils/graph-validator.js';
import { GraphValidationError } from '../src/utils/errors.js';

describe('Graph Validator & Repair Utility', () => {
  it('should normalize skill keys to kebab-case', () => {
    expect(normalizeKey('JavaScript Fundamentals 101!')).toBe('javascript-fundamentals-101');
    expect(normalizeKey('  React.js & Redux  ')).toBe('react-js-redux');
  });

  it('should handle duplicate node IDs by remapping them uniquely', () => {
    const raw = {
      nodes: [
        { id: 'n1', title: 'HTML', kind: 'skill', hours: 10, deps: [] },
        { id: 'n1', title: 'CSS', kind: 'skill', hours: 10, deps: ['n1'] },
        { id: 'n2', title: 'Target Role', kind: 'role', hours: 0, deps: ['n1'], isTarget: true },
      ],
    };

    const repaired = validateAndRepairGraph(raw);
    const ids = repaired.nodes.map((n) => n.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(repaired.nodes.length);
    expect(repaired.nodes.length).toBe(3);
  });

  it('should prune dependencies referencing nonexistent nodes and self-dependencies', () => {
    const raw = {
      nodes: [
        { id: 'n1', title: 'Node 1', kind: 'skill', hours: 10, deps: ['n1', 'nonexistent_id'] },
        { id: 'n2', title: 'Target Role', kind: 'role', hours: 0, deps: ['n1'], isTarget: true },
      ],
    };

    const repaired = validateAndRepairGraph(raw);
    const node1 = repaired.nodes.find((n) => n.id === 'n1');

    expect(node1.deps).not.toContain('n1'); // self dependency removed
    expect(node1.deps).not.toContain('nonexistent_id'); // unreferenced dependency removed
    expect(node1.deps).toEqual([]);
  });

  it('should detect and repair simple circular dependency cycles', () => {
    const raw = {
      nodes: [
        { id: 'n1', title: 'Node 1', kind: 'skill', hours: 10, deps: ['n2'] },
        { id: 'n2', title: 'Node 2', kind: 'skill', hours: 10, deps: ['n1'] },
        { id: 'n3', title: 'Target Role', kind: 'role', hours: 0, deps: ['n2'], isTarget: true },
      ],
    };

    const repaired = validateAndRepairGraph(raw);
    expect(repaired.nodes.length).toBe(3);
  });

  it('should ensure exactly one final target node when none is marked', () => {
    const raw = {
      nodes: [
        { id: 'n1', title: 'HTML', kind: 'skill', hours: 10, deps: [] },
        { id: 'n2', title: 'Frontend Engineer', kind: 'role', hours: 0, deps: ['n1'], isTarget: false },
      ],
    };

    const repaired = validateAndRepairGraph(raw);
    const targets = repaired.nodes.filter((n) => n.isTarget);

    expect(targets.length).toBe(1);
    expect(targets[0].id).toBe('n2');
  });

  it('should ensure exactly one target node when multiple are erroneously marked', () => {
    const raw = {
      nodes: [
        { id: 'n1', title: 'Mid-Level Role', kind: 'role', hours: 10, deps: [], isTarget: true },
        { id: 'n2', title: 'Target Role', kind: 'role', hours: 0, deps: ['n1'], isTarget: true },
      ],
    };

    const repaired = validateAndRepairGraph(raw);
    const targets = repaired.nodes.filter((n) => n.isTarget);

    expect(targets.length).toBe(1);
    expect(targets[0].id).toBe('n2');
  });

  it('should sanitize career paths referencing non-existent nodes', () => {
    const raw = {
      nodes: [
        { id: 'n1', title: 'Node 1', kind: 'skill', hours: 10, deps: [] },
        { id: 'n2', title: 'Target Role', kind: 'role', hours: 0, deps: ['n1'], isTarget: true },
      ],
      careerPaths: [
        {
          id: 'path1',
          title: 'Career Path',
          steps: [
            { year: '1', role: 'Dev', linkedNodeId: 'nonexistent_node' },
            { year: '2', role: 'Senior', linkedNodeId: 'n1' },
          ],
        },
      ],
    };

    const repaired = validateAndRepairGraph(raw);
    const step1 = repaired.careerPaths[0].steps[0];
    const step2 = repaired.careerPaths[0].steps[1];

    expect(step1.linkedNodeId).toBeNull();
    expect(step2.linkedNodeId).toBe('n1');
  });
});
