# 🚀 PathForge — Reverse-Engineered Career Roadmapper

**Turn your dream job into a clear, personalized, and actionable career roadmap.**

PathForge is an AI-powered career planning platform that helps users work backward from their dream job to identify the skills, prerequisites, projects, and learning milestones required to reach it. Instead of providing generic career advice, PathForge transforms a specific career goal into an interactive visual roadmap that users can explore, personalize, and track.

- **Project Name:** PathForge
- **Category:** Generative AI + Interactive Visualization
- **live demo:** PathForge(https://ubiquitous-malasada-5851cb.netlify.app/).
- **GitHub Repository:** [https://github.com/Dhruv-Soni109/Carrier-Roadmapper](https://github.com/Dhruv-Soni109/Carrier-Roadmapper)

---

## 1. 🎯 What It Does

PathForge solves the problem of unclear career pathways by reverse-engineering a user's dream job into a structured, step-by-step learning plan.

Users enter their target role, existing skills, available weekly learning hours, and desired timeline. The platform generates a personalized career roadmap containing essential competencies, skill dependencies, practical projects, learning resources, and milestones.

### Key Features

* **AI-Powered Career Roadmaps:** Generate personalized roadmaps for specific career goals using Google Gemini & Anthropic Claude.
* **Interactive Skill Tree:** Explore skills, prerequisites, and learning dependencies through a visual DAG graph (React Flow + Dagre).
* **Skill Gap Analysis:** Identify the skills users already possess and those they still need to develop.
* **Project-Based Learning:** Discover practical projects that help build and demonstrate relevant skills.
* **Learning Resources:** Access suggested documentation, courses, and cheat-sheets for individual competencies.
* **6 Technical Interview Questions per Node:** Practice real-world interview scenarios tailored to each milestone.
* **Progress Tracking & Gamification:** Mark skills as completed or already known, earn XP, and level up your developer profile.
* **Adaptive Planning:** Recalculate and pace the roadmap when learning availability or timelines change.
* **Roadmap Export and Sharing:** Export roadmap visualizations as PNG, copy compressed shareable URLs, or download JSON.

Our goal is to make career planning more personalized, visual, practical, and achievable.

---

## 2. ✅ Done / Left / Plan

### Done — Implemented & Verified

* Developed the complete PathForge concept and intuitive user workflow.
* Created the career roadmap generation modal with customizable parameters and instant presets.
* Implemented the interactive DAG skill tree canvas with Dagre auto-layout, readable default zoom, focus controls, and orientation toggle (Horizontal & Vertical).
* Integrated multi-provider AI engine supporting **Google Gemini API** (`gemini-2.5-flash`), Anthropic Claude, and zero-config local simulation.
* Built full gamification system with XP calculation, developer archetype titles, and milestone achievements.
* Developed Smart Planner for adaptive replanning when weekly hours or target months change.
* Implemented compressed URL-based state sharing (`lz-string`) and PNG high-res export (`html-to-image`).
* Unified frontend and backend onto a single high-performance local server (`port 8080`).

### Left — Remaining Polish

* Deploy to public production hosting (e.g. Render / Railway / Vercel).
* Expand real-time collaborative roadmapping between peers and mentors.
* Add integration with job board APIs for real-time market salary data.

### Plan — Hackathon Timeline

| Time        | Planned Work                                               | Expected Outcome                 |
| ----------- | ---------------------------------------------------------- | -------------------------------- |
| Hours 1–3   | Test core functionality and fix critical bugs              | Stable core application          |
| Hours 4–6   | Verify AI integration and roadmap generation               | Reliable AI-generated roadmaps   |
| Hours 7–9   | Test skill dependencies, progress tracking, and replanning | Functional user workflow         |
| Hours 10–12 | Improve UI, validation, and error handling                 | Better usability and reliability |
| Hours 13–14 | Perform end-to-end testing                                 | Demonstration-ready application  |
| Hours 15–16 | Deploy, verify the live link, and prepare the pitch        | Final hackathon submission       |

---

## 3. 🏗️ Architecture and Why

PathForge follows a modular architecture that separates the user interface, application logic, AI-powered generation, and progress storage.

### System Architecture

```text
                ┌─────────────────────────────────────────┐
                │                  USER                   │
                │     Dream Job, Skills, Time Budget      │
                └────────────────────┬────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │          REACT 18 + VITE FRONTEND       │
                │ Interactive DAG Canvas, Controls & UI   │
                └────────────────────┬────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │            EXPRESS API SERVER           │
                │ Route Validation, Rate Limiter, Cache   │
                └────────────────────┬────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │         AI INFERENCE ENGINE             │
                │ Google Gemini API / Anthropic Claude    │
                └────────────────────┬────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │       TOPOLOGICAL GRAPH VALIDATOR       │
                │ Cycle Repair, Edge Gen & Phase Mapping  │
                └────────────────────┬────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │           INTERACTIVE ROADMAP           │
                │        Visualize, Track, Replan         │
                └─────────────────────────────────────────┘
```

### Technology Stack

| Component             | Technology                | Why We Chose It                                                                  |
| --------------------- | ------------------------- | -------------------------------------------------------------------------------- |
| Frontend              | React 18                  | Component-based reactive state management and fast updates                       |
| Build Tool            | Vite                      | Lightning-fast HMR and optimized production bundle                               |
| Visualization         | React Flow                | Renders interactive, zoomable, draggable node graphs with custom cards           |
| Graph Layout          | Dagre                     | Automatically calculates hierarchical DAG positions for balanced branch layouts  |
| Styling               | Tailwind CSS              | Modern glassmorphism, responsive grid, and custom cyber-dark aesthetic           |
| Animations            | Framer Motion             | Fluid modal transitions and micro-interactions                                   |
| Backend               | Node.js & Express         | Lightweight, robust server handling API requests, validation, and caching       |
| AI Services           | Gemini API / Claude API   | Generates structured, industry-calibrated career competencies and dependencies   |
| Schema Validation     | Zod                       | Strict runtime schema enforcement for AI responses                               |
| Progress Storage      | Browser localStorage      | Seamless persistence across sessions without requiring database credentials     |
| Export & Sharing      | html-to-image / lz-string | Instant PNG graphic exports and shareable URLs                                   |

### Why This Architecture?

1. **AI-Powered Generation**: A language model interprets a user's unique ambition and maps it to realistic, industry-standard competencies.
2. **Interactive Visualization**: React Flow allows users to visually navigate their roadmap rather than being overwhelmed by a static, intimidating checklist.
3. **Dependency-Aware DAG Layout**: Clear prerequisite relationships show users exactly what to learn first to avoid tutorial paralysis.
4. **Structured JSON Validation**: Zod guarantees every node contains necessary properties (hours, phase, dependencies, interview questions) before rendering.
5. **Secure Key Isolation**: AI API keys remain strictly on the backend server in environment variables, never leaked to client bundles.
6. **Zero-Friction Local Storage**: Users can start and track their journey immediately without mandatory signup friction.

---

## 4. ✨ What We Added

### 1. Reverse-Engineered Career Planning
Instead of starting with random courses, users begin with their specific dream destination (e.g. "Full Stack Developer at a Climate-Tech Startup" or "AI/ML Engineer at Google DeepMind"). The engine works backward to construct the necessary stepping stones.

### 2. Interactive Skill Dependency Graph (DAG)
Skills are rendered as a connected skill tree with custom status glow rings:
- **Emerald**: Completed skills
- **Cyan**: Skills you already know
- **Blue**: Ready to learn (prerequisites fulfilled)
- **Muted Slate**: Locked skills (prerequisites pending)
- **Amber Glow**: Dream Job Capstone

### 3. Smart Planner & Adaptive Replanning
If your schedule changes (e.g., dropping from 20 hours/week to 10 hours/week), the Smart Planner recalculates timeline estimates and reallocates stretch tasks into backlog milestones.

### 4. Technical Interview Prep Engine
Each roadmap node features **6 realistic technical interview questions** across conceptual foundations, system architecture, debugging scenarios, and behavioral trade-offs.

### 5. Gamified XP & Career Ranks
Users earn XP for completing milestones and verifying existing competencies, advancing from *Novice Explorer* (Level 1) to *Principal Visionary* (Level 6).

---

## 5. 🚀 How to Run It

### Prerequisites
* Node.js (v18+ or v20+ recommended)
* Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Dhruv-Soni109/Carrier-Roadmapper.git
cd Carrier-Roadmapper
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=8080
NODE_ENV=development

# AI Provider (Configure either or use built-in mock mode)
GEMINI_API_KEY=your_gemini_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: Set to true to test without calling live AI APIs
MOCK_AI=false
```

### Step 4: Run the Application

#### Option A: Unified Local Server (Recommended)
Build the frontend and run the unified server on port **8080**:

```bash
npm run build
npm start
```
Open **`http://localhost:8080`** in your browser.

#### Option B: Development Mode (Vite HMR)
Run backend and frontend independently for active coding:

```bash
# Terminal 1: Backend server
node server/src/index.js

# Terminal 2: Vite Frontend Dev Server
npm run dev:vite
```

---

## 6. 🤖 Tools and AI Used

### Development Stack
* **Frontend**: React 18, Vite, React Flow, Dagre, Tailwind CSS, Lucide Icons, Framer Motion
* **Backend**: Express, Helmet, CORS, Express-Rate-Limit, Zod
* **AI Engine**: Google GenAI SDK (`@google/genai`), Anthropic SDK (`@anthropic-ai/sdk`)
* **Utilities**: `lz-string` (compression), `canvas-confetti`, `html-to-image`

### Responsible AI & Disclosures
* **Transparency**: Roadmaps are clearly tagged with AI synthesis indicators.
* **Accuracy Notice**: Recommendations provide structured guidance and should be supplemented with official documentation and university/company prerequisites.
* **Security**: No personal identifying information (PII) is stored or sent to AI endpoints.

---

## 7. 👥 Who It Is For

* **College Students**: Pinpoint what skills to learn for competitive internships.
* **Fresh Graduates**: Bridge the gap between academic theory and production-grade technologies.
* **Career Switchers**: Pivot into software engineering, AI/ML, cloud, or design with a structured, step-by-step pathway.
* **Mentors & Advisors**: Visually discuss skill development and milestone pacing with mentees.

---

## 8. 🌱 Our Vision

**"Don't just dream about your future. Map the path to it."**

PathForge turns abstract ambitions into structured, actionable, and visual plans. By combining Generative AI with interactive DAG visualization, we empower learners to master what matters most and step confidently into their dream careers.
