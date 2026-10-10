import { env } from '../config/env.js';
import { aiService } from './ai.service.js';
import { cacheService } from './cache.service.js';
import { buildRoadmapPrompt } from '../prompts/roadmap.prompt.js';
import { aiRoadmapResponseSchema } from '../validators/roadmap.schema.js';
import { validateAndRepairGraph } from '../utils/graph-validator.js';

export const roadmapService = {
  /**
   * Generates a personalized career roadmap
   */
  async generateRoadmap(params) {
    const cacheKey = cacheService.generateKey('roadmap', params);

    // 1. Check in-memory cache
    if (cacheService.has(cacheKey)) {
      return {
        roadmap: cacheService.get(cacheKey),
        isMock: env.MOCK_AI,
        fromCache: true,
      };
    }

    let rawRoadmap;
    const isMock = env.MOCK_AI;

    // 2. Either use Mock Generator or Live Claude API
    if (isMock) {
      rawRoadmap = generateMockRoadmap(params);
    } else {
      const prompt = buildRoadmapPrompt(params);
      rawRoadmap = await aiService.generateStructuredJson(prompt, aiRoadmapResponseSchema);
    }

    // 3. Graph Validation & Safe Topological Repair
    const validatedRoadmap = validateAndRepairGraph({
      id: `rm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      goal: params.goal,
      companyType: params.companyType || 'Any',
      industry: params.industry || 'Technology',
      hoursPerWeek: params.hoursPerWeek,
      monthsAvailable: params.monthsAvailable,
      userLevel: params.currentLevel,
      background: params.background,
      ...rawRoadmap,
    });

    // 4. Cache valid output
    cacheService.set(cacheKey, validatedRoadmap);

    return {
      roadmap: validatedRoadmap,
      isMock,
      fromCache: false,
    };
  },
};

/**
 * Generates an adaptive, realistic mock roadmap when MOCK_AI=true
 */
function generateMockRoadmap(params) {
  const { goal, industry, hoursPerWeek, monthsAvailable, currentLevel, knownSkills } = params;
  const normalizedGoal = (goal || '').toLowerCase();

  // Dynamic domain adjustment
  let techStack = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'];
  if (normalizedGoal.includes('ai') || normalizedGoal.includes('ml') || normalizedGoal.includes('data')) {
    techStack = ['Python', 'Linear Algebra', 'NumPy & Pandas', 'Scikit-Learn', 'PyTorch', 'Transformers', 'MLOps'];
  } else if (normalizedGoal.includes('cloud') || normalizedGoal.includes('devops')) {
    techStack = ['Linux Basics', 'Networking & TCP/IP', 'Terraform (IaC)', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Cloud Security'];
  } else if (normalizedGoal.includes('security') || normalizedGoal.includes('cyber')) {
    techStack = ['Networking & Wireshark', 'Linux & Windows Auditing', 'SIEM Operations (Splunk)', 'Vulnerability Assessment', 'Threat Hunting', 'Incident Response'];
  } else if (normalizedGoal.includes('ui') || normalizedGoal.includes('ux') || normalizedGoal.includes('design')) {
    techStack = ['Design Foundations & Typography', 'Figma Auto Layout & Tokens', 'User Research & Personas', 'Information Architecture', 'High-Fidelity Prototyping', 'Design Systems'];
  }

  const nodes = [
    // Phase 1: Foundations
    {
      id: 'n1',
      key: 'foundations-core',
      title: `${techStack[0]} Fundamentals`,
      kind: 'skill',
      phase: 'Foundations',
      hours: 20,
      summary: `Master the foundational mental models of ${techStack[0]}.`,
      why: `Every advanced milestone for ${goal} requires fluency in ${techStack[0]}.`,
      deps: [],
      isTarget: false,
    },
    {
      id: 'n2',
      key: 'tools-and-hygiene',
      title: `${techStack[1]} & Developer Hygiene`,
      kind: 'skill',
      phase: 'Foundations',
      hours: 20,
      summary: `Professional workflow practices with ${techStack[1]} and version control.`,
      why: 'Standard production engineering expectations across teams.',
      deps: ['n1'],
      isTarget: false,
    },
    {
      id: 'n3',
      key: 'foundation-practice-project',
      title: `Foundational ${techStack[0]} Project`,
      kind: 'project',
      phase: 'Foundations',
      hours: 15,
      summary: 'Hands-on project consolidating core foundational competencies.',
      why: 'Solidifies syntax into problem-solving competence.',
      deps: ['n2'],
      isTarget: false,
    },

    // Phase 2: Core Development
    {
      id: 'n4',
      key: 'core-specialization-1',
      title: `${techStack[2]} Architecture`,
      kind: 'skill',
      phase: 'Core Development',
      hours: 30,
      summary: `Component modeling, data flows, and state logic using ${techStack[2]}.`,
      why: `Dominant tool in modern ${industry} teams.`,
      deps: ['n3'],
      isTarget: false,
    },
    {
      id: 'n5',
      key: 'core-specialization-2',
      title: `${techStack[3]} Integration`,
      kind: 'skill',
      phase: 'Core Development',
      hours: 25,
      summary: `Building resilient workflows with ${techStack[3]}.`,
      why: 'Enables end-to-end execution without manual bottlenecks.',
      deps: ['n4'],
      isTarget: false,
    },
    {
      id: 'n6',
      key: 'core-milestone-project',
      title: `${goal} MVP Prototype`,
      kind: 'project',
      phase: 'Core Development',
      hours: 30,
      summary: `A complete functional mini-product demonstrating ${techStack[2]} and ${techStack[3]}.`,
      why: 'Crucial talking point during initial portfolio screening.',
      deps: ['n5'],
      isTarget: false,
    },

    // Phase 3: Advanced Skills
    {
      id: 'n7',
      key: 'advanced-skill-1',
      title: `${techStack[4]} Mastery`,
      kind: 'skill',
      phase: 'Advanced Skills',
      hours: 35,
      summary: `Scalable design patterns, testing, and optimization with ${techStack[4]}.`,
      why: 'Distinguishes junior tutorial students from autonomous engineers.',
      deps: ['n6'],
      isTarget: false,
    },
    {
      id: 'n8',
      key: 'advanced-skill-2',
      title: `${techStack[5] || 'Distributed Systems'} In-Depth`,
      kind: 'skill',
      phase: 'Advanced Skills',
      hours: 30,
      summary: 'Robust containerization, schemas, and production resilience.',
      why: 'Ensures code runs cleanly in production without regressions.',
      deps: ['n7'],
      isTarget: false,
    },
    {
      id: 'n9',
      key: 'testing-and-security',
      title: 'Automated Testing & Security Guardrails',
      kind: 'skill',
      phase: 'Advanced Skills',
      hours: 20,
      summary: 'Unit, integration, and security checks safeguarding user data.',
      why: 'Non-negotiable requirement for enterprise hiring loops.',
      deps: ['n7'],
      isTarget: false,
    },

    // Phase 4: Projects and Credentials
    {
      id: 'n10',
      key: 'capstone-portfolio',
      title: `Capstone Production Project for ${goal}`,
      kind: 'project',
      phase: 'Projects and Credentials',
      hours: 50,
      summary: `Full-lifecycle application deployed live with tests, documentation, and CI/CD.`,
      why: 'The definitive proof-of-work piece on your technical resume.',
      deps: ['n8', 'n9'],
      isTarget: false,
    },
    {
      id: 'n11',
      key: 'domain-certification',
      title: `${techStack[6] || 'Industry'} Verified Credential`,
      kind: 'cert',
      phase: 'Projects and Credentials',
      hours: 25,
      summary: 'Recognized industry certification benchmarking knowledge.',
      why: 'Provides external credentialing that helps pass ATS recruiter screens.',
      deps: ['n10'],
      isTarget: false,
    },

    // Phase 5: Career Entry
    {
      id: 'n12',
      key: 'interview-readiness',
      title: 'Technical Screen & System Design Drills',
      kind: 'milestone',
      phase: 'Career Entry',
      hours: 25,
      summary: 'Live coding rehearsals, behavioral STAR frameworks, and system design.',
      why: 'Ensures clear communication during high-stakes interview loops.',
      deps: ['n10'],
      isTarget: false,
    },
    {
      id: 'n13',
      key: 'intermediate-role',
      title: `Associate / Junior ${goal.split(' at ')[0]} Role`,
      kind: 'role',
      phase: 'Career Entry',
      hours: 20,
      summary: 'First professional production role delivering real business value.',
      why: 'Builds verified tenure and code-review collaboration.',
      deps: ['n12'],
      isTarget: false,
    },
    {
      id: 'n14',
      key: 'target-career-role',
      title: goal,
      kind: 'role',
      phase: 'Career Entry',
      hours: 0,
      summary: `Ultimate Career Goal: Leading engineering initiatives as ${goal}.`,
      why: 'Reverse-engineering complete. You are equipped to thrive in this role.',
      deps: ['n13'],
      isTarget: true,
    },
  ];

  const totalCalculatedHours = nodes.reduce((sum, n) => sum + n.hours, 0);
  const availableBudget = Math.round(hoursPerWeek * monthsAvailable * 4.3);

  return {
    summary: `Comprehensive roadmap reverse-engineered for ${goal} in ${industry}. Calibrated for ${hoursPerWeek}h/week over ${monthsAvailable} months.`,
    phases: ['Foundations', 'Core Development', 'Advanced Skills', 'Projects and Credentials', 'Career Entry'],
    feasibilityAssessment: {
      fitsTimeline: availableBudget >= totalCalculatedHours,
      pacingNotes: availableBudget >= totalCalculatedHours
        ? `Comfortable pacing: ${availableBudget} available hours vs ${totalCalculatedHours} required.`
        : `Tight schedule: ${availableBudget} available hours vs ${totalCalculatedHours} required. Prioritize core skills and one capstone project.`,
      recommendedFocus: 'Focus on shipping the capstone portfolio project and mastering the 6 interview questions per node.',
    },
    nodes,
    careerPaths: [
      {
        id: 'cs-student',
        title: 'University / CS Student Pipeline',
        persona: 'Student progressing through coursework & summer internships',
        totalDuration: `${monthsAvailable} Months`,
        startingPoint: currentLevel,
        disclaimer: 'Illustrative composite archetype based on college graduate outcomes.',
        steps: [
          {
            year: 'Phase 1',
            phase: 'Foundations',
            role: 'Student Developer',
            description: 'Solidifying fundamentals and version control hygiene.',
            keyMilestones: ['Git PRs', 'Coursework labs'],
            linkedNodeId: 'n1',
            badge: 'Campus Builder',
          },
          {
            year: 'Phase 2',
            phase: 'Core Development',
            role: 'Engineering Intern',
            description: 'Contributing feature PRs in a fast-paced environment.',
            keyMilestones: ['First production feature', 'Component testing'],
            linkedNodeId: 'n6',
            badge: 'Internship Shipped',
          },
          {
            year: 'Phase 3',
            phase: 'Career Entry',
            role: goal,
            description: 'Full-time transition into target dream job.',
            keyMilestones: ['Offer letter accepted', 'System ownership'],
            linkedNodeId: 'n14',
            badge: 'Goal Conquered',
          },
        ],
      },
    ],
  };
}
