/**
 * Prompt template for career roadmap generation
 */
export const buildRoadmapPrompt = (params) => {
  const {
    goal,
    companyType = 'Startup',
    industry = 'Technology',
    currentLevel = 'Beginner',
    knownSkills = [],
    hoursPerWeek = 15,
    monthsAvailable = 6,
    background = 'Independent Learner',
  } = params;

  return `You are a Senior Staff Engineer, Tech Hiring Manager, and AI Career Navigation Architect.
Your mission is to generate a comprehensive, highly realistic, reverse-engineered career roadmap for a user targeting:
Target Role: "${goal}"
Target Company Type: "${companyType}"
Industry Sector: "${industry}"
Current Level: "${currentLevel}"
Known Skills: ${knownSkills.length > 0 ? knownSkills.join(', ') : 'None specified'}
Weekly Study Budget: ${hoursPerWeek} hours/week
Timeline Horizon: ${monthsAvailable} months
Learner Background: "${background}"

CRITICAL INSTRUCTIONS:
1. Output MUST be strictly valid, raw JSON (no conversational commentary, no markdown before/after).
2. Generate 4 to 6 learning phases:
   Phase 1: Foundations
   Phase 2: Core Development
   Phase 3: Advanced Skills
   Phase 4: Projects and Credentials
   Phase 5: Career Entry
3. Generate approximately 16 to 22 meaningful nodes tailored specifically to "${goal}" and "${industry}".
4. Allowed node 'kind' values: "skill", "project", "cert", "role", "milestone".
5. Every node must have:
   - "id": string like "n1", "n2", "n3"...
   - "key": kebab-case normalized skill name (e.g. "javascript-fundamentals")
   - "title": descriptive human-readable title
   - "kind": one of "skill", "project", "cert", "role", "milestone"
   - "phase": string phase name
   - "hours": realistic integer hours (10 to 60)
   - "summary": concise 1-2 sentence description of what is learned
   - "why": 1-2 sentence explanation of why this skill is demanded specifically for "${goal}"
   - "deps": array of prerequisite node IDs that must be completed BEFORE this node.
   - "isTarget": boolean (MUST BE TRUE FOR EXACTLY ONE FINAL TARGET-ROLE NODE, false for all others).
6. The graph must be a strict Directed Acyclic Graph (DAG) with zero circular dependencies. Every branch must connect toward the final target node.
7. Include 3 illustrative career-path archetypes (e.g., CS Student, Self-Taught Developer, Career Switcher) with intermediate milestones.
8. Include a feasibilityAssessment evaluating if the total hours fit within (${hoursPerWeek} * ${monthsAvailable} * 4.3) available hours.

JSON OUTPUT STRUCTURE SCHEMA:
{
  "summary": "Detailed strategic summary of this reverse-engineered career track",
  "phases": ["Foundations", "Core Development", "Advanced Skills", "Projects and Credentials", "Career Entry"],
  "feasibilityAssessment": {
    "fitsTimeline": true,
    "pacingNotes": "Pacing analysis comparing needed hours to available budget",
    "recommendedFocus": "Core priority advice"
  },
  "nodes": [
    {
      "id": "n1",
      "key": "html-css",
      "title": "Modern HTML & Responsive CSS",
      "kind": "skill",
      "phase": "Foundations",
      "hours": 20,
      "summary": "Semantic markup, modern grid, and accessibility.",
      "why": "Essential to build clean responsive user interfaces.",
      "deps": [],
      "isTarget": false
    }
    ...
  ],
  "careerPaths": [
    {
      "id": "cs-student",
      "title": "CS Student: Internship-Driven Progression",
      "persona": "College Student",
      "totalDuration": "2 Years",
      "startingPoint": "Sophomore with academic basics",
      "disclaimer": "Illustrative career archetype synthesized from graduate hiring data.",
      "steps": [
        {
          "year": "Year 1",
          "phase": "Foundations",
          "role": "Student Contributor",
          "description": "Mastering web fundamentals and hackathons",
          "keyMilestones": ["Git hygiene", "Collegiate hackathon project"],
          "linkedNodeId": "n1",
          "badge": "First PR"
        }
      ]
    }
  ]
}
Ensure all node IDs referenced in "deps" exist in the "nodes" array. Exactly one final node must have "isTarget": true.`;
};
