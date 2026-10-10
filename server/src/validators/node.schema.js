import { z } from 'zod';

export const nodeRequestSchema = z.object({
  goal: z
    .string({ required_error: 'Career goal context is required.' })
    .trim()
    .min(3, 'Career goal must be at least 3 characters long.')
    .max(250),
  node: z.object({
    id: z.string().min(1),
    key: z.string().optional(),
    title: z.string().min(1),
    kind: z.string().default('skill'),
    phase: z.string().optional(),
    hours: z.number().optional(),
    summary: z.string().optional(),
    why: z.string().optional(),
    deps: z.array(z.string()).optional().default([]),
    isTarget: z.boolean().optional().default(false),
  }),
});

const interviewQuestionSchema = z.object({
  question: z.string().min(5),
  hint: z.string().min(5),
  answer: z.string().optional(),
});

export const aiNodeGuidanceResponseSchema = z.object({
  weekendProject: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    steps: z.array(z.string()).min(2),
    stack: z.array(z.string()).default([]),
    stretchGoal: z.string().default('Add performance instrumentation and unit tests'),
  }),
  repositories: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      stars: z.string().optional(),
      url: z.string().optional(),
    })
  ).default([]),
  interviewQuestions: z.array(interviewQuestionSchema).min(4).max(8),
  resources: z.array(
    z.object({
      title: z.string(),
      type: z.string().default('Documentation'),
      provider: z.string().default('Official Docs'),
      url: z.string().optional(),
      free: z.boolean().default(true),
    })
  ).default([]),
  doneWhen: z.array(z.string()).min(2),
});
