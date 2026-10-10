# PathForge — Express AI Backend & Graph Engine

A production-grade, secure Node.js & Express REST API for **PathForge** — an AI-Powered Career Roadmap Generator. The backend reverse-engineers high-impact career goals into validated, acyclic Directed Acyclic Graphs (DAGs) of milestones, projects, certifications, and target job roles.

---

## Architecture Overview

```
server/
├── src/
│   ├── app.js               # Express app configuration & middleware pipeline
│   ├── index.js             # HTTP server listener & graceful shutdown handlers
│   ├── config/
│   │   └── env.js           # Central typed environment variables (dotenv)
│   ├── controllers/
│   │   ├── health.controller.js   # GET /api/health
│   │   ├── roadmap.controller.js  # POST /api/roadmap
│   │   ├── node.controller.js     # POST /api/node
│   │   └── replan.controller.js   # POST /api/replan
│   ├── middleware/
│   │   ├── error-handler.js       # Centralized error formatting & sanitization
│   │   ├── rate-limit.js          # express-rate-limit window & header enforcement
│   │   └── request-id.js          # Unique X-Request-Id header tracing
│   ├── prompts/
│   │   ├── node.prompt.js         # Deep-dive actionable guidance prompt
│   │   ├── replan.prompt.js       # Curriculum budget recalculation prompt
│   │   └── roadmap.prompt.js      # Structured reverse-engineering LLM prompt
│   ├── routes/
│   │   ├── health.routes.js
│   │   ├── node.routes.js
│   │   ├── replan.routes.js
│   │   └── roadmap.routes.js
│   ├── services/
│   │   ├── ai.service.js          # Dual Gemini (@google/genai) & Claude (@anthropic-ai/sdk) client
│   │   ├── cache.service.js       # In-memory bounded TTL LRU cache
│   │   ├── node.service.js        # Node deep-dive domain service
│   │   ├── replan.service.js      # Timeline re-planning domain service
│   │   └── roadmap.service.js     # Career roadmap generation domain service
│   ├── utils/
│   │   ├── errors.js              # Application error hierarchy (AppError, ValidationError, etc.)
│   │   ├── graph-validator.js     # Graph cycle detection, unique IDs, leaf-node healing
│   │   └── response.js            # Standardized API response and error envelopes
│   └── validators/
│       ├── node.schema.js         # Zod schemas for /api/node
│       ├── replan.schema.js       # Zod schemas for /api/replan
│       └── roadmap.schema.js      # Zod schemas for /api/roadmap
├── tests/
│   ├── graph-validator.test.js    # Unit tests for topological DAG repair
│   ├── mock-mode.test.js          # Integration tests for health check and mock mode
│   ├── node.test.js               # Integration tests for /api/node
│   ├── replan.test.js             # Integration tests for /api/replan
│   └── roadmap.test.js            # Integration tests for /api/roadmap
├── .env.example
├── package.json
└── vitest.config.js
```

---

## Features

1. **Dual AI Model Support**:
   - Primary: **Google Gemini API** (`@google/genai`) using structured JSON mode.
   - Secondary / Fallback: **Anthropic Claude API** (`@anthropic-ai/sdk`) using `claude-3-5-sonnet`.
   - Standalone: Zero-dependency **Mock Engine** (`MOCK_AI=true`) for offline development and instant CI testing.

2. **Topological Graph Repair Engine**:
   - Detects and breaks cyclic dependencies via depth-first search (DFS).
   - Enforces unique node identifiers and sanitizes dangling dependencies.
   - Ensures exactly one terminal target node (`isTarget: true`).
   - Automatically attaches orphaned leaf branches to the target role so the visual Dagre graph connects smoothly.

3. **In-Memory TTL Cache**:
   - LRU eviction with 1-hour configurable time-to-live (`CACHE_TTL_MS`).
   - Prevents duplicate AI calls on identical prompts.

4. **Security & Guardrails**:
   - Helmet HTTP header protection.
   - CORS origin enforcement for `http://localhost:5173`.
   - API rate limiting (100 requests per 15-minute window).
   - Zod request body validation with descriptive error feedback.
   - Error masking to prevent stack trace leaks in client responses.

---

## Quickstart

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your configuration values:
```env
PORT=8787
NODE_ENV=development

# Google Gemini API (Recommended)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Anthropic Claude API (Alternative)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# Set to true to bypass AI APIs and use the deterministic mock engine
MOCK_AI=false

# Security & Limits
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
AI_TIMEOUT_MS=30000
CACHE_TTL_MS=3600000
CACHE_MAX_ENTRIES=500
```

### 3. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:8787`.

---

## API Endpoints

### 1. Health Check
`GET /api/health`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "PathForge Backend API",
    "uptimeSeconds": 42,
    "timestamp": "2026-10-10T07:20:00.000Z",
    "mockMode": false,
    "model": "gemini-2.5-flash",
    "cacheEntries": 2,
    "environment": "development",
    "version": "1.0.0"
  },
  "meta": {
    "requestId": "req-1728544800000-abc1",
    "timestamp": "2026-10-10T07:20:00.000Z",
    "status": "healthy"
  }
}
```

---

### 2. Generate Career Roadmap
`POST /api/roadmap`

**Request Body:**
```json
{
  "goal": "Full Stack Developer at a climate-tech startup",
  "companyType": "Climate Tech Startup",
  "industry": "Clean Energy",
  "currentLevel": "Beginner",
  "knownSkills": ["HTML", "CSS"],
  "hoursPerWeek": 15,
  "monthsAvailable": 6,
  "background": "Computer Science Undergraduate"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "rm_1728544810000_3x8a",
    "goal": "Full Stack Developer at a climate-tech startup",
    "phases": [
      "Foundations",
      "Core Development",
      "Advanced Skills",
      "Projects and Credentials",
      "Career Entry"
    ],
    "feasibilityAssessment": {
      "fitsTimeline": true,
      "pacingNotes": "Comfortable pacing: 387 available hours vs 320 required hours.",
      "recommendedFocus": "Build hands-on energy grid dashboards and deploy complete capstone."
    },
    "nodes": [
      {
        "id": "n1",
        "key": "foundations-core",
        "title": "JavaScript Fundamentals",
        "kind": "skill",
        "type": "skill",
        "phase": 1,
        "phaseName": "Foundations",
        "hours": 20,
        "summary": "Master core syntax, async patterns, and DOM APIs.",
        "why": "Essential prerequisite for building dynamic interfaces.",
        "whyItMatters": "Essential prerequisite for building dynamic interfaces.",
        "deps": [],
        "prerequisites": [],
        "xp": 100,
        "isTarget": false
      },
      {
        "id": "n14",
        "key": "target-career-role",
        "title": "Full Stack Developer at a climate-tech startup",
        "kind": "role",
        "type": "role",
        "phase": 5,
        "phaseName": "Career Entry",
        "hours": 0,
        "summary": "Full-time role delivering carbon tracking platforms.",
        "why": "Target goal successfully achieved.",
        "deps": ["n13"],
        "prerequisites": ["n13"],
        "xp": 0,
        "isTarget": true
      }
    ],
    "edges": [
      {
        "id": "e-n1-n2",
        "source": "n1",
        "target": "n2",
        "type": "smoothstep",
        "animated": false
      }
    ],
    "totalHours": 320,
    "targetNodeId": "n14",
    "careerPaths": [
      {
        "id": "cs-student",
        "title": "University / CS Student Pipeline",
        "persona": "Student progressing through coursework & summer internships",
        "totalDuration": "6 Months",
        "startingPoint": "Beginner",
        "steps": [ ... ]
      }
    ]
  },
  "meta": {
    "requestId": "req-1728544810000-xyz9",
    "isMock": false,
    "fromCache": false,
    "nodesCount": 14,
    "totalHours": 320
  }
}
```

---

### 3. Node Deep-Dive Guidance
`POST /api/node`

**Request Body:**
```json
{
  "goal": "Full Stack Developer at a climate-tech startup",
  "node": {
    "id": "node-react-architecture",
    "title": "React Architecture & State Management",
    "kind": "skill",
    "phase": "Core Development",
    "hours": 30
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "weekendProject": {
      "title": "React Architecture Showcase Lab",
      "description": "Build an interactive, modular showcase applying React Architecture specifically tailored for Full Stack Developer at a climate-tech startup.",
      "steps": [
        "Initialize repository with automated linter and testing pipeline",
        "Implement core state logic using custom hooks and Context",
        "Build error boundaries and responsive layout components",
        "Write unit tests with React Testing Library"
      ],
      "stack": ["React 18", "Vite", "Tailwind CSS", "Vitest"],
      "stretchGoal": "Add benchmark telemetry and performance profiling"
    },
    "repositories": [
      {
        "name": "goldbergyoni/javascript-testing-best-practices",
        "description": "Comprehensive guidelines and patterns for reliable production code",
        "stars": "25k+",
        "url": "https://github.com/goldbergyoni/javascript-testing-best-practices"
      }
    ],
    "interviewQuestions": [
      {
        "question": "What core mental model differentiates beginner and senior usage of React Architecture?",
        "hint": "Think about component lifecycles, memoization boundaries, and predictable state transitions.",
        "answer": "Senior engineers design component hierarchies around unidirectional data flow and minimal re-render triggers."
      }
    ],
    "resources": [
      {
        "title": "MDN Web Docs",
        "type": "Documentation",
        "provider": "Mozilla",
        "url": "https://developer.mozilla.org",
        "free": true
      }
    ],
    "doneWhen": [
      "Implemented and verified React Architecture in a runnable repository",
      "Written automated tests covering edge cases",
      "Capable of answering the 6 technical interview questions aloud without notes"
    ]
  },
  "meta": {
    "requestId": "req-1728544820000-987a",
    "nodeId": "node-react-architecture"
  }
}
```

---

### 4. Timeline Re-Planning
`POST /api/replan`

**Request Body:**
```json
{
  "goal": "Full Stack Developer",
  "hoursPerWeek": 5,
  "monthsAvailable": 2,
  "nodes": [ ... ],
  "completedNodeIds": ["n1"],
  "knownNodeIds": ["n2"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "fits": false,
    "availableHours": 43,
    "requiredHours": 180,
    "stretchNodeIds": ["n11"],
    "adjustedHours": {},
    "explanation": "The requested timeline (43 hrs available) is shorter than the estimated curriculum effort (180 hrs required, deficit of ~137 hrs). To keep your target role viable without burnout, we have marked non-blocking certifications and secondary milestones as optional stretch goals."
  },
  "meta": {
    "requestId": "req-1728544830000-replan",
    "stretchCount": 1
  }
}
```

---

## Automated Testing

PathForge backend includes complete unit and integration test coverage using **Vitest** and **Supertest**. All tests run deterministically in isolated mock mode:

```bash
cd server
npm test
```

### Test Suites Covered:
- `tests/graph-validator.test.js`: Validates cycle detection, ID deduplication, and topological healing.
- `tests/mock-mode.test.js`: Validates health check telemetry, Helmet headers, and 404 envelope.
- `tests/roadmap.test.js`: Validates DAG structure, phase generation, Zod validation, and caching.
- `tests/node.test.js`: Validates 6 interview questions with hints, weekend project, and input checks.
- `tests/replan.test.js`: Validates budget calculation (`hoursPerWeek * monthsAvailable * 4.3`), tight schedules, completed skill preservation, and stretch task designation.
