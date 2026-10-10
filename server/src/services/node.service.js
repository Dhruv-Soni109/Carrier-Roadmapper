import { env } from '../config/env.js';
import { aiService } from './ai.service.js';
import { cacheService } from './cache.service.js';
import { buildNodePrompt } from '../prompts/node.prompt.js';
import { aiNodeGuidanceResponseSchema } from '../validators/node.schema.js';

export const nodeService = {
  /**
   * Generates deep-dive actionable guidance for a selected node
   */
  async getNodeGuidance(params) {
    const { goal, node } = params;
    const cacheKey = cacheService.generateKey('node', { goal, nodeId: node.id, title: node.title });

    if (cacheService.has(cacheKey)) {
      return {
        guidance: cacheService.get(cacheKey),
        isMock: env.MOCK_AI,
        fromCache: true,
      };
    }

    let rawGuidance;
    const isMock = env.MOCK_AI;

    if (isMock) {
      rawGuidance = generateMockNodeGuidance(params);
    } else {
      const prompt = buildNodePrompt(params);
      rawGuidance = await aiService.generateStructuredJson(prompt, aiNodeGuidanceResponseSchema);
    }

    cacheService.set(cacheKey, rawGuidance);

    return {
      guidance: rawGuidance,
      isMock,
      fromCache: false,
    };
  },
};

/**
 * Generates rich, realistic node guidance when in Mock Mode
 */
function generateMockNodeGuidance({ goal, node }) {
  const title = node.title || 'Core Competency';

  return {
    weekendProject: {
      title: `${title} Showcase Lab`,
      description: `Build an interactive, modular showcase applying ${title} specifically tailored for ${goal}.`,
      steps: [
        `Initialize repository with automated linter and testing pipeline for ${title}`,
        'Implement core business logic and state management structures',
        'Handle edge cases, loading states, and error boundaries gracefully',
        'Document architectural decisions, trade-offs, and run instructions in the README',
      ],
      stack: ['JavaScript', 'Modern Web APIs', 'Testing Framework'],
      stretchGoal: 'Add benchmark telemetry and automated CI integration tests',
    },
    repositories: [
      {
        name: 'goldbergyoni/javascript-testing-best-practices',
        description: 'Comprehensive guidelines and patterns for reliable production code',
        stars: '25k+',
        url: 'https://github.com/goldbergyoni/javascript-testing-best-practices',
      },
      {
        name: 'ryanmcdermott/clean-code-javascript',
        description: 'Clean Code software engineering concepts adapted for JavaScript',
        stars: '90k+',
        url: 'https://github.com/ryanmcdermott/clean-code-javascript',
      },
    ],
    interviewQuestions: [
      {
        question: `What core mental model differentiates beginner and senior usage of ${title}?`,
        hint: 'Think about lifecycle execution, edge cases, and performance memory implications.',
        answer: 'Senior engineers design with error boundaries, lifecycle predictability, and memory profiling rather than simple happy-path implementation.',
      },
      {
        question: `How would you debug an intermittent failure or performance bottleneck involving ${title}?`,
        hint: 'Consider telemetry logging, profiling tools, and reproducible isolation testing.',
        answer: 'Isolate the failure in an automated unit test, inspect memory and event loop metrics, and profile with Chrome DevTools or APM traces.',
      },
      {
        question: `What security considerations or input validation vulnerabilities are relevant to ${title}?`,
        hint: 'Sanitization, injection, rate limits, and defense-in-depth principles.',
        answer: 'Always validate untrusted inputs at boundaries, use parameterized queries or safe APIs, and enforce strict least-privilege configurations.',
      },
      {
        question: `How does ${title} scale when concurrent traffic or data volume increases 10x?`,
        hint: 'Horizontal scaling, caching layers, batching, and asynchronous queues.',
        answer: 'Introduce caching for hot read paths, decouple heavy tasks into background worker queues, and keep application instances stateless.',
      },
      {
        question: `Describe a scenario where choosing ${title} over an alternative technology would be a mistake.`,
        hint: 'Over-engineering, maintenance overhead, team expertise, and cold-start latency.',
        answer: 'Using a heavy framework or complex pattern when a simple native primitive or lightweight alternative satisfies the business SLA.',
      },
      {
        question: `How do you explain the architectural value of ${title} to non-technical project stakeholders?`,
        hint: 'Frame in terms of customer latency, system reliability, development speed, and cost.',
        answer: 'Translate technical capabilities into business impact: faster feature shipping, reduced downtime risk, and lower cloud infrastructure bills.',
      },
    ],
    resources: [
      {
        title: 'MDN Web Docs: Web Development Guides',
        type: 'Documentation',
        provider: 'Mozilla Developer Network',
        url: 'https://developer.mozilla.org',
        free: true,
      },
      {
        title: 'web.dev Performance & Best Practices',
        type: 'Article & Guides',
        provider: 'Google Chrome Team',
        url: 'https://web.dev',
        free: true,
      },
    ],
    doneWhen: [
      `Implemented and verified ${title} in a runnable project repository`,
      'Written automated unit tests covering typical failure and edge cases',
      'Capable of answering the 6 technical interview questions aloud without referring to notes',
    ],
  };
}
