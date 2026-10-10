export const CAREER_ARCHETYPES = [
  {
    id: 'cs-student',
    title: 'CS Student: The Academic-to-Industry Pipeline',
    subtitle: 'From algorithms lectures to high-growth startup engineering through structured internships.',
    persona: 'Alex K., 3rd-year CS Major',
    totalDuration: '3.5 Years',
    startingPoint: 'College Sophomore with Java/C++ basics',
    targetRole: 'Full Stack Engineer at Climate Tech Startup',
    roadmapId: 'fullstack-climate',
    disclaimer: 'Illustrative career archetype synthesized from typical university graduate trajectories. Actual timelines vary based on individual circumstances.',
    steps: [
      {
        year: 'Year 1 - Sophomore',
        phase: 'Foundations & Hackathons',
        role: 'Student Developer & Club Lead',
        description: 'Solidified data structures and web development fundamentals. Competed in collegiate hackathons to gain fast product iteration experience.',
        keyMilestones: [
          'Mastered Git, modern JavaScript, and HTML/CSS',
          'Won 2nd place at collegiate Climate Hackathon with an energy tracking prototype',
          'Contributed initial PR to student union website'
        ],
        linkedNodeId: 'node-html-css',
        badge: 'Campus Builder'
      },
      {
        year: 'Year 2 - Junior',
        phase: 'Core Tech & First Internship',
        role: 'Frontend Engineering Intern',
        description: 'Joined a Series-A clean energy SaaS startup for an intensive 12-week summer internship, converting Figma specs to React components.',
        keyMilestones: [
          'Built responsive enterprise analytics dashboard using React 18 & TypeScript',
          'Reduced API latency with TanStack Query client caching',
          'Received return offer recommendation from engineering mentor'
        ],
        linkedNodeId: 'node-react-fundamentals',
        badge: 'First Production PR'
      },
      {
        year: 'Year 3 - Senior',
        phase: 'Full-Stack Ownership & Capstone',
        role: 'Undergraduate Research Assistant',
        description: 'Engineered a full-stack carbon accounting portal as a senior capstone project, integrating real utility APIs with PostgreSQL.',
        keyMilestones: [
          'Authored high-throughput Node.js microservice handling IoT sensor streams',
          'Passed AWS Certified Cloud Practitioner exam',
          'Completed NeetCode 150 algorithmic interview preparation'
        ],
        linkedNodeId: 'node-portfolio-project',
        badge: 'Capstone Architect'
      },
      {
        year: 'Graduation',
        phase: 'Full-Time Transition',
        role: 'Full Stack Developer',
        description: 'Successfully converted interview loops into a full-time role at a high-growth climate tech startup.',
        keyMilestones: [
          'Signed competitive full-time offer with equity',
          'Leading real-time decarbonization software roadmap'
        ],
        linkedNodeId: 'node-target-role',
        badge: 'Mission Achieved'
      }
    ]
  },
  {
    id: 'self-taught',
    title: 'Self-Taught: The Open-Source Craftsperson',
    subtitle: 'From zero coding background to staff-level credibility through public building and open-source contributions.',
    persona: 'Maya R., Independent Builder',
    totalDuration: '14 Months',
    startingPoint: 'Hospitality manager with zero technical background',
    targetRole: 'Full Stack Developer at Climate Tech Startup',
    roadmapId: 'fullstack-climate',
    disclaimer: 'Illustrative career archetype representing self-directed learning paths. Success depends on sustained weekly consistency and high-quality portfolio craft.',
    steps: [
      {
        year: 'Months 1 - 3',
        phase: 'Disciplined Foundations',
        role: 'Full-Time Self-Learner',
        description: 'Dedicated 25 hours weekly to FreeCodeCamp and JavaScript.info, building 10 small utility tools without relying on AI code generation shortcuts.',
        keyMilestones: [
          'Completed 300+ interactive algorithmic and DOM challenges',
          'Published 15 consecutive weekly dev blog posts documenting lessons learned',
          'Constructed responsive green energy tariff calculator'
        ],
        linkedNodeId: 'node-js-fundamentals',
        badge: 'Relentless Learner'
      },
      {
        year: 'Months 4 - 7',
        phase: 'Deep React & Full-Stack Rigor',
        role: 'Open-Source Contributor',
        description: 'Stepped into full-stack development with React, TypeScript, and Node.js. Began actively triaging issues on popular GitHub climate repositories.',
        keyMilestones: [
          'Merged 4 documentation and bug-fix PRs in recognized open climate repositories',
          'Engineered stateful multi-step carbon audit tool with Zustand',
          'Configured automated Vitest and Playwright test suites'
        ],
        linkedNodeId: 'node-typescript',
        badge: 'Open Source Merged'
      },
      {
        year: 'Months 8 - 11',
        phase: 'Capstone SaaS & Cloud Deployment',
        role: 'Independent Product Builder',
        description: 'Designed and deployed "EcoPulse", a full-stack carbon accounting platform deployed on AWS with Docker and PostgreSQL.',
        keyMilestones: [
          'Acquired 50 real active beta users testing GHG calculations',
          'Achieved 100% Lighthouse performance and accessibility scores',
          'Wrote viral technical teardown on PostgreSQL query indexing optimization'
        ],
        linkedNodeId: 'node-portfolio-project',
        badge: 'SaaS Creator'
      },
      {
        year: 'Months 12 - 14',
        phase: 'Interview Gauntlet & Job Offer',
        role: 'Full Stack Engineer',
        description: 'Inbound recruiter reachouts sparked by the open-source portfolio led to an expedited 3-round interview loop and formal job offer.',
        keyMilestones: [
          'Aced live system design screen showcasing EcoPulse architecture',
          'Secured full-stack engineer role at an innovative climate startup'
        ],
        linkedNodeId: 'node-target-role',
        badge: 'Career Transformed'
      }
    ]
  },
  {
    id: 'career-switcher',
    title: 'Career Switcher: Domain Expertise Leveraged',
    subtitle: 'From environmental consultancy to software engineering, compounding 5 years of industry insights with modern code.',
    persona: 'David T., Former Environmental Consultant',
    totalDuration: '9 Months',
    startingPoint: 'Senior ESG Consultant & Excel/Python modeling specialist',
    targetRole: 'Full Stack Developer at Climate Tech Startup',
    roadmapId: 'fullstack-climate',
    disclaimer: 'Illustrative career archetype for professionals transitioning from allied domain fields. Leverages transferable industry knowledge for rapid acceleration.',
    steps: [
      {
        year: 'Months 1 - 2',
        phase: 'Bridging Scripting to Modern Web',
        role: 'Technical ESG Analyst',
        description: 'Transitioned from ad-hoc Python scripts to modern web engineering foundations: HTML5, CSS Grid, and typed JavaScript.',
        keyMilestones: [
          'Automated legacy manual Excel emissions reporting with JavaScript scripts',
          'Built internal company prototype for carbon credits tracking',
          'Earned Git and GitHub collaborative hygiene certifications'
        ],
        linkedNodeId: 'node-html-css',
        badge: 'Domain Bridge'
      },
      {
        year: 'Months 3 - 5',
        phase: 'Frontend & API Engineering',
        role: 'Hybrid Solutions Developer',
        description: 'Mastered React 18, TypeScript, and API integrations, translating ISO 14064 corporate emissions accounting into interactive UI widgets.',
        keyMilestones: [
          'Built reusable component library for GHG Protocol Scopes 1, 2, and 3',
          'Integrated public EPA and electricity map APIs with TanStack Query',
          'Delivered internal talk on automated carbon accounting architecture'
        ],
        linkedNodeId: 'node-api-integration',
        badge: 'Protocol Master'
      },
      {
        year: 'Months 6 - 8',
        phase: 'Cloud & Database Specialization',
        role: 'Full Stack Climate Fellow',
        description: 'Engineered PostgreSQL databases with Prisma ORM, containerized backend services with Docker, and certified on AWS Cloud.',
        keyMilestones: [
          'Designed relational database schema for corporate carbon audit trails',
          'Obtained AWS Certified Cloud Practitioner credential',
          'Conducted mock technical system design interviews with senior tech leads'
        ],
        linkedNodeId: 'node-backend-node',
        badge: 'Enterprise Ready'
      },
      {
        year: 'Month 9',
        phase: 'Target Role Realized',
        role: 'Full Stack Engineer',
        description: 'Hired by top climate software company where combined engineering chops and native ESG domain fluency proved unbeatable.',
        keyMilestones: [
          'Hired with Senior Junior hybrid leveling due to deep domain expertise',
          'Spearheading enterprise carbon data ingestion platform'
        ],
        linkedNodeId: 'node-target-role',
        badge: 'Unbeatable Hybrid'
      }
    ]
  }
];
