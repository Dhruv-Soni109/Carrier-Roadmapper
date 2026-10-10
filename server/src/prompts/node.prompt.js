/**
 * Prompt template for deep-dive node guidance
 */
export const buildNodePrompt = (params) => {
  const { goal, node } = params;

  return `You are a Principal Software Engineer and Technical Interviewer.
The user is pursuing the career goal: "${goal}".
They have selected the roadmap node:
Title: "${node.title}"
Kind: "${node.kind}"
Phase: "${node.phase || 'Core'}"
Summary: "${node.summary || ''}"
Context Why: "${node.why || ''}"

Generate a detailed, actionable, production-caliber learning blueprint for this node.

CRITICAL CONSTRAINTS:
1. Output MUST be strictly valid, raw JSON with zero surrounding conversational text.
2. Generate EXACTLY SIX (6) technical and behavioral interview questions with actionable hints that a candidate will realistically face for this skill.
3. Recommend a domain-tailored weekend project that builds credible portfolio evidence for "${goal}".
4. Only recommend well-known, verified GitHub repositories and standard official documentation (e.g., MDN, React.dev, PyTorch.org, Prisma.io). NEVER hallucinate fake URLs or obscure repositories.
5. Provide 3-4 measurable "Done When" checklist criteria.

OUTPUT JSON SCHEMA:
{
  "weekendProject": {
    "title": "Specific Project Name",
    "description": "2-3 sentence overview of what the student will build",
    "steps": [
      "Step 1: Setup and initial architecture",
      "Step 2: Core feature implementation",
      "Step 3: Error boundaries and testing",
      "Step 4: Deployment and documentation"
    ],
    "stack": ["Technology 1", "Technology 2"],
    "stretchGoal": "Ambitious extension challenge"
  },
  "repositories": [
    {
      "name": "organization/repository",
      "description": "Why this open-source codebase is a great reference",
      "stars": "50k+"
    }
  ],
  "interviewQuestions": [
    {
      "question": "Question 1",
      "hint": "Technical clue or architectural pattern to consider",
      "answer": "Concise architectural explanation"
    },
    {
      "question": "Question 2",
      "hint": "Technical clue",
      "answer": "Concise explanation"
    },
    {
      "question": "Question 3",
      "hint": "Technical clue",
      "answer": "Concise explanation"
    },
    {
      "question": "Question 4",
      "hint": "Technical clue",
      "answer": "Concise explanation"
    },
    {
      "question": "Question 5",
      "hint": "Technical clue",
      "answer": "Concise explanation"
    },
    {
      "question": "Question 6",
      "hint": "Technical clue",
      "answer": "Concise explanation"
    }
  ],
  "resources": [
    {
      "title": "Official Documentation Name",
      "type": "Documentation",
      "provider": "Official",
      "free": true
    }
  ],
  "doneWhen": [
    "Concrete verifiable accomplishment 1",
    "Concrete verifiable accomplishment 2",
    "Concrete verifiable accomplishment 3"
  ]
}`;
};
