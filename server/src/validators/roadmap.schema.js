import { z } from 'zod';

export const roadmapRequestSchema = z.object({
  goal: z
    .string({ required_error: 'Career goal is required.' })
    .trim()
    .min(3, 'Career goal must be at least 3 characters long.')
    .max(250, 'Career goal cannot exceed 250 characters.'),
  companyType: z.string().trim().max(100).optional().default('Any'),
  industry: z.string().trim().max(100).optional().default('Technology'),
  currentLevel: z.string().trim().max(100).optional().default('Beginner'),
  knownSkills: z.array(z.string().trim().max(100)).optional().default([]),
  hoursPerWeek: z
    .number({ required_error: 'Hours per week is required.' })
    .min(1, 'Hours per week must be at least 1.')
    .max(80, 'Hours per week cannot exceed 80.'),
  monthsAvailable: z
    .number({ required_error: 'Months available is required.' })
    .min(1, 'Months available must be at least 1.')
    .max(48, 'Months available cannot exceed 48.'),
  background: z.string().trim().max(500).optional().default('Independent Learner'),
});

const nodeSchema = z.object({
  id: z.string().min(1),
  key: z.string().optional(),
  title: z.string().min(1),
  kind: z.enum(['skill', 'project', 'cert', 'role', 'milestone']).default('skill'),
  phase: z.string().default('Foundations'),
  hours: z.number().nonnegative().default(15),
  summary: z.string().default(''),
  why: z.string().default(''),
  deps: z.array(z.string()).default([]),
  isTarget: z.boolean().default(false),
});

const archetypeStepSchema = z.object({
  year: z.string().default('Month 1-3'),
  phase: z.string().default('Foundations'),
  role: z.string().default('Learner'),
  description: z.string().default(''),
  keyMilestones: z.array(z.string()).default([]),
  linkedNodeId: z.string().nullable().optional(),
  badge: z.string().default('Milestone Badge')
});

const archetypeSchema = z.object({
  id: z.string().default('archetype-1'),
  title: z.string().default('Illustrative Career Path'),
  persona: z.string().default('Learner Archetype'),
  totalDuration: z.string().default('12 Months'),
  startingPoint: z.string().default('Beginner'),
  disclaimer: z.string().default('Illustrative archetype synthesized from career benchmarks.'),
  steps: z.array(archetypeStepSchema).default([])
});

export const aiRoadmapResponseSchema = z.object({
  summary: z.string().default('Personalized career roadmap'),
  phases: z.array(z.string()).min(4).max(6).default([
    'Foundations',
    'Core Development',
    'Advanced Skills',
    'Projects and Credentials',
    'Career Entry'
  ]),
  feasibilityAssessment: z.object({
    fitsTimeline: z.boolean().default(true),
    pacingNotes: z.string().default('Realistic pacing with sustained weekly practice.'),
    recommendedFocus: z.string().default('Build hands-on projects alongside conceptual theory.')
  }).default({}),
  nodes: z.array(nodeSchema).min(6),
  careerPaths: z.array(archetypeSchema).default([])
});
