import { z } from 'zod';

export const replanRequestSchema = z.object({
  goal: z.string().trim().min(3).max(250),
  hoursPerWeek: z.number().min(1).max(80),
  monthsAvailable: z.number().min(1).max(48),
  nodes: z.array(
    z.object({
      id: z.string().min(1),
      key: z.string().optional(),
      title: z.string().min(1),
      kind: z.string().default('skill'),
      phase: z.string().default('Foundations'),
      hours: z.number().nonnegative().default(15),
      summary: z.string().optional().default(''),
      why: z.string().optional().default(''),
      deps: z.array(z.string()).default([]),
      isTarget: z.boolean().default(false),
    })
  ).min(1, 'Nodes array must contain at least 1 node.'),
  completedNodeIds: z.array(z.string()).default([]),
  knownNodeIds: z.array(z.string()).default([]),
});

export const replanResponseSchema = z.object({
  fits: z.boolean(),
  availableHours: z.number().nonnegative(),
  requiredHours: z.number().nonnegative(),
  stretchNodeIds: z.array(z.string()),
  adjustedHours: z.record(z.string(), z.number()),
  explanation: z.string(),
});
