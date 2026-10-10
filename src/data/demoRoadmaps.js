export const DEMO_ROADMAPS = {
  'fullstack-climate': {
    id: 'fullstack-climate',
    goal: 'Full Stack Developer at a Climate-Tech Startup',
    targetCompany: 'Watershed / Watershed Climate / Patch',
    industry: 'Climate Tech & Clean Energy',
    level: 'Beginner to Job-Ready',
    weeklyHours: 15,
    targetMonths: 6,
    totalHours: 320,
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'ESG Data APIs'],
    summary: 'A complete reverse-engineered pathway to building high-performance carbon tracking dashboards, energy grid APIs, and resilient full-stack web applications for leading climate-tech startups.',
    nodes: [
      // Phase 1: Foundations
      {
        id: 'node-html-css',
        title: 'Modern HTML & Responsive CSS',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 20,
        xp: 120,
        summary: 'Semantic markup, modern CSS grid/flexbox, accessibility (a11y), and responsive mobile-first layouts.',
        whyItMatters: 'Climate dashboards aggregate complex energy metrics that require crystal-clear, accessible, and responsive data displays across all screen sizes.',
        prerequisites: [],
        stepByStepPlan: [
          'Master semantic HTML5 tags and accessibility landmarks (ARIA)',
          'Deep dive into modern CSS Flexbox and 12-column CSS Grid',
          'Implement mobile-first responsive breakpoints and container queries',
          'Build CSS variables for dark/light environmental mode styling'
        ],
        weekendProject: {
          title: 'EcoGrid: Green Energy Consumption Calculator',
          description: 'A responsive single-page utility allowing households to calculate daily kWh usage and carbon footprint with interactive sliders.',
          features: ['Pure CSS layout with fluid typography', 'Accessible form controls with ARIA states', 'Dark mode toggle with CSS custom properties']
        },
        resources: [
          { title: 'MDN Web Docs: CSS Layout', type: 'Documentation', url: 'https://developer.mozilla.org', provider: 'Mozilla', free: true },
          { title: 'Responsive Web Design Certification', type: 'Course', url: 'https://freecodecamp.org', provider: 'freeCodeCamp', free: true }
        ],
        githubRepos: [
          { name: 'modern-css-solutions', description: 'Modern CSS layouts without heavy frameworks', stars: '4.2k' }
        ],
        interviewQuestions: [
          {
            question: 'What is the CSS Box Model and how does box-sizing: border-box alter layout calculations?',
            hint: 'Think about how padding and borders are factored into total width and height.',
            answer: 'The standard CSS box model calculates width as content-width only; adding padding or border expands the element. Setting box-sizing: border-box includes padding and border within the declared width, preventing unintentional overflow in responsive dashboards.'
          },
          {
            question: 'How do CSS Grid and Flexbox differ in mental model and use cases?',
            hint: 'One-dimensional vs two-dimensional layouts.',
            answer: 'Flexbox is designed for one-dimensional layouts (either a row or a column), ideal for navbars or card toolbars. CSS Grid is two-dimensional, perfect for grid dashboards with complex row/column spanning.'
          },
          {
            question: 'Why is semantic HTML critical for Web Accessibility (WCAG 2.1 AA)?',
            hint: 'Consider screen readers and document tree parsing.',
            answer: 'Semantic tags like <main>, <nav>, <article>, and <button> provide inherent keyboard navigation, screen reader roles, and focus management without manual ARIA polyfills.'
          },
          {
            question: 'What are CSS Container Queries and how do they differ from Media Queries?',
            hint: 'Component-level responsive design vs viewport-level.',
            answer: 'Media queries query the browser viewport width, while Container Queries allow components (like a reusable energy widget) to adjust their styling based on the size of their parent container.'
          },
          {
            question: 'How can you optimize Cumulative Layout Shift (CLS) in CSS?',
            hint: 'Explicit dimensions and aspect-ratio.',
            answer: 'Reserve space for images, charts, and embeds by declaring explicit width/height attributes or CSS aspect-ratio, avoiding abrupt layout jumps as assets load.'
          },
          {
            question: 'What is the difference between rem and em units in CSS?',
            hint: 'Root html font size vs parent element font size.',
            answer: 'rem is relative to the root html element font-size (making typography scalable with user browser preferences), whereas em is relative to its nearest parent element font-size.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Built a 100% responsive multi-section page without horizontal scroll' },
          { id: 'c2', text: 'Scored 100% on Lighthouse Accessibility and Best Practices' },
          { id: 'c3', text: 'Implemented CSS Grid and Flexbox in a real layout' }
        ]
      },
      {
        id: 'node-js-fundamentals',
        title: 'JavaScript Core & Async Patterns',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 35,
        xp: 180,
        summary: 'ES6+ syntax, closures, event loop, Promises, async/await, DOM APIs, and functional array methods.',
        whyItMatters: 'Climate tech applications process continuous streaming time-series sensor data and carbon emissions metrics, requiring strong asynchronous JS mastery.',
        prerequisites: ['node-html-css'],
        stepByStepPlan: [
          'Variables (let/const), arrow functions, destructuring, and rest/spread',
          'Understand JavaScript Execution Context, Call Stack, and Microtask Event Loop',
          'Async JavaScript: Promises, fetch API, and async/await error handling',
          'Array transformations: map, filter, reduce, and flatMap for time-series math'
        ],
        weekendProject: {
          title: 'EmissionStream: Realtime Climate API Consumer',
          description: 'A pure JS dashboard fetching live regional electric grid carbon intensity from public APIs with caching and debounce.',
          features: ['Live API ingestion via Fetch & Async/Await', 'Statistical aggregation with Array.reduce', 'Error boundaries and offline fallback caching']
        },
        resources: [
          { title: 'JavaScript.info: Modern JS Tutorial', type: 'Interactive Book', url: 'https://javascript.info', provider: 'Ilya Kantor', free: true },
          { title: 'You Don\'t Know JS Yet', type: 'Book Series', url: 'https://github.com/getify/You-Dont-Know-JS', provider: 'Kyle Simpson', free: true }
        ],
        githubRepos: [
          { name: 'clean-code-javascript', description: 'Clean Code concepts adapted for JavaScript', stars: '92k' }
        ],
        interviewQuestions: [
          {
            question: 'Explain the JavaScript Event Loop, Call Stack, and Task Queues.',
            hint: 'Microtasks (Promises) vs Macrotasks (setTimeout).',
            answer: 'The event loop continuously monitors the Call Stack. When the stack is empty, it flushes the Microtask Queue (Promise callbacks, queueMicrotask) before executing tasks from the Macrotask Queue (setTimeout, setInterval).'
          },
          {
            question: 'What is a Closure in JavaScript and provide a practical real-world use case?',
            hint: 'Function retaining access to its lexical scope.',
            answer: 'A closure is a function bundled with references to its surrounding lexical environment. Practical use cases include data privacy (private variables), memoization caches, and event handler factory functions.'
          },
          {
            question: 'How does prototypal inheritance work compared to classical OOP inheritance?',
            hint: '__proto__ and Prototype chain.',
            answer: 'Objects in JavaScript link directly to other prototype objects via a prototype chain. When a property or method is accessed, JS traverses up the prototype chain until found or reaching null.'
          },
          {
            question: 'What are the main differences between shallow copy and deep copy?',
            hint: 'Object.assign vs structuredClone.',
            answer: 'Shallow copy (Object.assign, spread) copies top-level properties; nested objects share the same memory reference. Deep copy (structuredClone, JSON.parse) recursively clones all nested objects.'
          },
          {
            question: 'How do Promise.all, Promise.allSettled, and Promise.race differ?',
            hint: 'Short-circuiting on rejection vs waiting for all outcomes.',
            answer: 'Promise.all rejects immediately if any promise fails; Promise.allSettled waits for all promises to settle regardless of outcome; Promise.race settles as soon as the first promise resolves or rejects.'
          },
          {
            question: 'What is debouncing and throttling, and when would you use each in a metrics dashboard?',
            hint: 'Delaying execution until silence vs rate limiting executions over a fixed interval.',
            answer: 'Debounce delays function execution until no new events occur for X ms (perfect for search inputs). Throttle ensures the function runs at most once every X ms (ideal for window resize or real-time telemetry scroll).'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Implemented Promise chaining and async/await with robust try/catch/finally' },
          { id: 'c2', text: 'Wrote a custom debounce and throttle function from scratch' },
          { id: 'c3', text: 'Manipulated nested data structures using Array.prototype.reduce' }
        ]
      },
      {
        id: 'node-git-github',
        title: 'Git Version Control & CI/CD Hygiene',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 15,
        xp: 100,
        summary: 'Branching strategies (GitFlow, Trunk-based), interactive rebase, merge conflicts, Git hooks, and PR etiquette.',
        whyItMatters: 'Climate tech teams deploy fast-moving iterations where branch hygiene, atomic commits, and pull-request collaboration are essential.',
        prerequisites: [],
        stepByStepPlan: [
          'Init, staging, branching, stash, and semantic commit messaging',
          'Resolve complex merge conflicts and perform git rebase -i',
          'Configure GitHub branch protection rules and PR templates',
          'Setup pre-commit hooks with Husky, lint-staged, and prettier'
        ],
        weekendProject: {
          title: 'Open Source Carbon Calculator Contributor Simulation',
          description: 'Fork an open-source project, open a feature branch, resolve an intentional merge conflict, and submit a pristine PR with changelog.',
          features: ['Conventional commits (feat:, fix:, chore:)', 'Interactive git rebase demonstration', 'Automated Husky pre-commit hook']
        },
        resources: [
          { title: 'Pro Git Book (Free)', type: 'Book', url: 'https://git-scm.com/book/en/v2', provider: 'Scott Chacon', free: true },
          { title: 'GitHub Skills Interactive Courses', type: 'Interactive', url: 'https://skills.github.com', provider: 'GitHub', free: true }
        ],
        githubRepos: [
          { name: 'git-flight-rules', description: 'Guide on what to do when things go wrong in git', stars: '45k' }
        ],
        interviewQuestions: [
          {
            question: 'Explain the difference between git merge and git rebase.',
            hint: 'Preserving historical commit timeline vs linear history.',
            answer: 'git merge creates a 3-way merge commit preserving the exact chronological sequence and branch topology. git rebase replays your commits on top of the target branch tip, creating a clean linear history.'
          },
          {
            question: 'What is git cherry-pick and when should you use it cautiously?',
            hint: 'Applying a specific commit from another branch.',
            answer: 'Cherry-pick copies a specific commit from one branch to another without merging the whole branch. Use cautiously to avoid duplicate commits and divergent histories.'
          },
          {
            question: 'How do you recover a deleted branch or lost commits in Git?',
            hint: 'git reflog.',
            answer: 'git reflog tracks every HEAD movement locally. You locate the SHA where the branch was deleted and run git checkout -b branch-name <commit-sha>.'
          },
          {
            question: 'What is the purpose of Git hooks (e.g. pre-commit, pre-push)?',
            hint: 'Automating linting, tests, and formatting before commits.',
            answer: 'Git hooks are shell scripts triggered before or after Git actions. They automate unit tests, lint checks, and commit message validation before bad code enters the repository.'
          },
          {
            question: 'What is Trunk-Based Development vs GitFlow?',
            hint: 'Short-lived feature branches vs long-lived release/develop branches.',
            answer: 'GitFlow uses long-lived develop, release, and feature branches. Trunk-based development merges frequent, short-lived feature branches directly into main, enabling continuous integration.'
          },
          {
            question: 'What does git stash pop vs git stash apply do?',
            hint: 'Removing stash from list vs keeping it.',
            answer: 'git stash apply restores changes while retaining the stash entry in your stash list. git stash pop restores changes and deletes that stash from the list.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Created a GitHub repository with branch protection rules' },
          { id: 'c2', text: 'Performed an interactive rebase (squashing 3 commits into 1)' },
          { id: 'c3', text: 'Configured Husky and commitlint for conventional commits' }
        ]
      },

      // Phase 2: Core Development
      {
        id: 'node-react-fundamentals',
        title: 'React 18 & Component Architecture',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 45,
        xp: 250,
        summary: 'JSX, component lifecycle, useState, useEffect, useMemo, useCallback, custom hooks, and React 18 Concurrent features.',
        whyItMatters: 'React is the gold standard for climate intelligence platforms like Watershed, Sylvera, and Patch for building interactive analytics.',
        prerequisites: ['node-js-fundamentals', 'node-git-github'],
        stepByStepPlan: [
          'Component composition, props, conditional rendering, and state lifting',
          'Hook lifecycles: useEffect dependencies, cleanup functions, and rules of hooks',
          'Performance hooks: useMemo, useCallback, and React.memo memoization',
          'Building reusable custom hooks (e.g., useLocalStorage, useMediaQuery, useFetch)'
        ],
        weekendProject: {
          title: 'EcoWidget: Interactive Emission Factor Explorer',
          description: 'A modular React widget library enabling energy analysts to filter and inspect GHG conversion coefficients by industry.',
          features: ['Custom hooks for state and debounced search', 'Optimized rendering with useMemo for 1000+ emission items', 'Accessible keyboard navigation modal']
        },
        resources: [
          { title: 'React Official Documentation (React.dev)', type: 'Docs', url: 'https://react.dev', provider: 'React Team', free: true },
          { title: 'Full Stack Open: Deep Dive into Modern Web Dev', type: 'Course', url: 'https://fullstackopen.com', provider: 'Univ. of Helsinki', free: true }
        ],
        githubRepos: [
          { name: 'awesome-react', description: 'Curated list of React resources and libraries', stars: '65k' }
        ],
        interviewQuestions: [
          {
            question: 'How does React\'s Virtual DOM and Reconciliation algorithm (Fiber) work?',
            hint: 'Diffing algorithm and concurrent scheduling.',
            answer: 'React maintains a Virtual DOM representation in memory. Fiber breaks work into incremental units with priority levels. It diffs changes and commits minimal batch mutations to the real browser DOM.'
          },
          {
            question: 'What are the rules of React Hooks and why do they exist?',
            hint: 'Only call hooks at the top level and in React functions.',
            answer: 'Hooks rely on predictable call order in internal linked lists. Calling them conditionally or inside loops breaks the hook index alignment across re-renders.'
          },
          {
            question: 'When should you use useMemo and useCallback vs when is it premature optimization?',
            hint: 'Referential equality for props and expensive calculations.',
            answer: 'Use them when passing callbacks to memoized child components to prevent unnecessary re-renders or when computing expensive calculations (e.g., thousands of array items). For cheap primitives, overhead exceeds benefits.'
          },
          {
            question: 'What is the purpose of useEffect cleanup functions?',
            hint: 'Preventing memory leaks, cancelling network requests or timers.',
            answer: 'Cleanup functions execute before component unmount or before the effect runs again, unsubscribing event listeners, clearing timers, and aborting active AbortController requests.'
          },
          {
            question: 'What is the difference between controlled and uncontrolled components?',
            hint: 'React state driving the value vs DOM ref.',
            answer: 'Controlled components have their value driven by React state with onChange handlers. Uncontrolled components store their value directly in the DOM accessed via useRef.'
          },
          {
            question: 'How do React 18 Concurrent features (useTransition, useDeferredValue) work?',
            hint: 'Urgent vs non-urgent state updates.',
            answer: 'useTransition marks state updates as non-urgent transitions, keeping the UI responsive to user keystrokes while heavy chart recalculations render in the background.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Built a component tree with clean state lifting and composition' },
          { id: 'c2', text: 'Authored at least 3 production-grade custom hooks' },
          { id: 'c3', text: 'Profiled re-renders using React DevTools Profiler' }
        ]
      },
      {
        id: 'node-typescript',
        title: 'TypeScript for Scale & Strict Type Safety',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 30,
        xp: 220,
        summary: 'Type inference, interfaces vs types, generics, utility types, discriminated unions, and TS with React components.',
        whyItMatters: 'Climate compliance software requires strict calculations. A type mismatch in CO2e calculations can lead to regulatory reporting errors.',
        prerequisites: ['node-react-fundamentals'],
        stepByStepPlan: [
          'Basic and complex types: tuples, enums, literals, and union/intersection',
          'Generics in functions, interfaces, and React props (e.g., generic table components)',
          'Advanced utility types: Partial, Pick, Omit, Record, and ReturnType',
          'Discriminated unions for modeling state machines (Idle | Loading | Success | Error)'
        ],
        weekendProject: {
          title: 'TypeSafe ESG Metric Ledger',
          description: 'A TypeScript data validation package ensuring energy data schemas adhere to ISO 14064 GHG standards before ingestion.',
          features: ['Strictly typed ESG models with Zod validation', 'Generic table component rendering typed sensor logs', 'Zero \'any\' compiler enforcement']
        },
        resources: [
          { title: 'TypeScript Handbook', type: 'Docs', url: 'https://typescriptlang.org', provider: 'Microsoft', free: true },
          { title: 'Total TypeScript Interactive', type: 'Tutorials', url: 'https://totaltypescript.com', provider: 'Matt Pocock', free: true }
        ],
        githubRepos: [
          { name: 'type-challenges', description: 'Collection of TypeScript type challenges with solutions', stars: '42k' }
        ],
        interviewQuestions: [
          {
            question: 'What are Discriminated Unions in TypeScript and why are they powerful?',
            hint: 'Union of objects sharing a common literal property.',
            answer: 'A discriminated union uses a common literal discriminant property (like type: "success" | "error"). In switch/if statements, TypeScript automatically narrows the type, eliminating runtime casting.'
          },
          {
            question: 'What is the difference between interface and type in modern TypeScript?',
            hint: 'Declaration merging vs union/tuple capabilities.',
            answer: 'Interfaces support declaration merging and are optimal for public API object contracts. Types are more versatile, supporting unions, intersections, mapped types, and primitive aliases.'
          },
          {
            question: 'How do TypeScript Generics work in a reusable React component?',
            hint: '<T,> syntax on component props.',
            answer: 'Generics allow components (like a Select<T> or Table<T>) to work with multiple data types while maintaining end-to-end type safety for row items and render callbacks.'
          },
          {
            question: 'What is the difference between unknown and any types?',
            hint: 'Type safety vs disabling compiler checks.',
            answer: 'any disables all type checking. unknown is a type-safe counterpart; any value can be assigned to unknown, but no operations or methods can be invoked without narrowing the type first.'
          },
          {
            question: 'What is the purpose of keyof, typeof, and mapped types?',
            hint: 'Generating types from object structures dynamically.',
            answer: 'typeof extracts the type of an existing JS value; keyof produces a union of an object\'s property keys; mapped types iterate over keys to create transformed types (like Record or custom Readonly).'
          },
          {
            question: 'Explain how type assertions (as Type) differ from type guards (is Type).',
            hint: 'Forcing the compiler vs validating at runtime.',
            answer: 'Type assertion (as) forces the compiler to accept a type without runtime validation, which can cause runtime crashes. Type guards (arg is Type) perform real runtime checks that safely narrow the compiler type.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Configured strict: true in tsconfig.json without compiler warnings' },
          { id: 'c2', text: 'Built a generic reusable React component with TypeScript' },
          { id: 'c3', text: 'Created a discriminated union to model asynchronous network states' }
        ]
      },
      {
        id: 'node-api-integration',
        title: 'REST & GraphQL API Integration',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 25,
        xp: 200,
        summary: 'Axios/Fetch, TanStack Query (React Query), cache invalidation, pagination, optimistic updates, and GraphQL queries.',
        whyItMatters: 'Climate apps ingest data from satellite feeds, smart meters, and carbon registries that require efficient client-side caching and sync.',
        prerequisites: ['node-react-fundamentals'],
        stepByStepPlan: [
          'RESTful design principles, status codes, query params, and JWT headers',
          'TanStack Query: query keys, staleTime, cacheTime, and background refetching',
          'Mutations with optimistic UI updates and rollback on failure',
          'Handling infinite scroll pagination and server-sent events (SSE)'
        ],
        weekendProject: {
          title: 'PowerGrid Explorer with TanStack Query',
          description: 'A high-speed grid telemetry dashboard with background auto-polling every 30s, optimistic bookmarking, and retry backoff.',
          features: ['TanStack Query caching & window focus refetching', 'Optimistic UI update for favorite grid stations', 'Infinite scroll pagination']
        },
        resources: [
          { title: 'TanStack Query Documentation', type: 'Docs', url: 'https://tanstack.com/query', provider: 'Tanner Linsley', free: true }
        ],
        githubRepos: [
          { name: 'tanstack-query', description: 'Powerful asynchronous state management for TS/JS', stars: '41k' }
        ],
        interviewQuestions: [
          {
            question: 'Why use TanStack Query instead of storing fetched API data in Redux or useState?',
            hint: 'Server state vs client UI state separation.',
            answer: 'TanStack Query is designed for server state management: it handles caching, deduplication, stale data detection, background refetching, retry backoff, and pagination out of the box without boilerplate.'
          },
          {
            question: 'How do optimistic UI updates work and how do you handle rollbacks?',
            hint: 'Updating client UI immediately while saving snapshot of previous state.',
            answer: 'In onMutate, cancel ongoing queries, take a snapshot of the current cache, and update the cache immediately with expected output. If the mutation errors, restore the cache snapshot in onError.'
          },
          {
            question: 'What are Query Keys in TanStack Query and why is structure important?',
            hint: 'Array-based keys for hierarchical cache invalidation.',
            answer: 'Query keys (e.g. [\'emissions\', companyId, { year }]) uniquely identify data in cache. Hierarchical keys allow invalidating all emissions queries or just a specific year\'s data.'
          },
          {
            question: 'Explain the difference between staleTime and gcTime (cacheTime).',
            hint: 'Freshness threshold vs garbage collection retention.',
            answer: 'staleTime is how long fetched data is considered fresh before needing background re-fetch. gcTime is how long unused data remains stored in cache before memory garbage collection.'
          },
          {
            question: 'What are the trade-offs between GraphQL and REST APIs?',
            hint: 'Over-fetching/under-fetching vs caching complexity.',
            answer: 'GraphQL prevents over-fetching and allows clients to request exact fields in one query, but introduces HTTP caching complexity and query complexity risks compared to standardized REST.'
          },
          {
            question: 'How do you handle JWT refresh token rotation safely?',
            hint: 'Short-lived access token, httpOnly refresh token cookie, interceptor.',
            answer: 'Store access tokens in memory and refresh tokens in httpOnly secure cookies. Use an Axios/Fetch response interceptor to intercept 401s, request a new access token, and replay the original request.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Implemented TanStack Query with custom staleTime configuration' },
          { id: 'c2', text: 'Engineered an optimistic mutation with snapshot rollback' },
          { id: 'c3', text: 'Built paginated API data fetching with prefetching' }
        ]
      },

      // Phase 3: Advanced Skills
      {
        id: 'node-state-management',
        title: 'Global State Management (Zustand & Context)',
        type: 'skill',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 20,
        xp: 180,
        summary: 'Zustand stores, selectors, middleware (persist, devtools), React Context trade-offs, and state normalization.',
        whyItMatters: 'Managing multi-step carbon accounting audits across thousands of supply chain facilities demands clean global client state.',
        prerequisites: ['node-typescript', 'node-api-integration'],
        stepByStepPlan: [
          'Evaluate React Context vs Zustand for performance and re-render prevention',
          'Create Zustand stores with atomic slices and selector subscriptions',
          'Configure Zustand middleware for LocalStorage persistence and Redux DevTools',
          'Normalize relational state to avoid nested mutation pitfalls'
        ],
        weekendProject: {
          title: 'Carbon Ledger: Multi-Step ESG Audit Wizard',
          description: 'A 5-step interactive wizard tracking corporate emissions data across Scope 1, 2, and 3 with auto-saved drafts and undo/redo.',
          features: ['Zustand store with persist middleware', 'Atomic selectors to eliminate unnecessary form re-renders', 'History undo/redo middleware']
        },
        resources: [
          { title: 'Zustand Official Documentation', type: 'Docs', url: 'https://zustand.docs.pmnd.rs', provider: 'Poimandres', free: true }
        ],
        githubRepos: [
          { name: 'zustand', description: 'Bear necessities for state management in React', stars: '48k' }
        ],
        interviewQuestions: [
          {
            question: 'Why choose Zustand over Redux Toolkit or React Context in a modern React application?',
            hint: 'Boilerplate, bundle size, and re-render behavior.',
            answer: 'Zustand has minimal boilerplate, sub-3kB footprint, requires no Context Provider wrappers, and uses selective subscriptions so components only re-render when their selected slice changes.'
          },
          {
            question: 'Why can React Context cause unwanted re-renders and how do you mitigate it?',
            hint: 'All consumers of a context re-render on value change.',
            answer: 'Any change to context value forces all consuming components to re-render. Mitigation includes splitting state and dispatch into separate contexts or using external store libraries like Zustand.'
          },
          {
            question: 'How does state normalization work in client-side state stores?',
            hint: 'Storing entities by ID like a relational database.',
            answer: 'State normalization organizes entities as an object of IDs ({ byId: { 1: {...} }, allIds: [1] }). This prevents data duplication, simplifies updates, and ensures consistency across views.'
          },
          {
            question: 'How do you test state changes in a Zustand store?',
            hint: 'Testing vanilla store functions independently from React components.',
            answer: 'Zustand stores can be invoked and asserted directly in Node/Vitest without mounting React components, resetting state between tests using store.setState(initialState, true).'
          },
          {
            question: 'What is the purpose of transient updates in state management?',
            hint: 'Updating DOM elements without triggering React render cycle.',
            answer: 'Transient updates subscribe directly to store changes to mutate DOM properties directly (e.g. CSS transforms or audio players) for 60fps animations without React re-render overhead.'
          },
          {
            question: 'How does Zustand handle asynchronous actions compared to Redux Thunk?',
            hint: 'Direct async/await functions inside store actions.',
            answer: 'In Zustand, actions are plain functions. You simply write async/await directly inside store functions and call set() when asynchronous data resolves without extra middleware.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Built a multi-slice Zustand store with TypeScript typing' },
          { id: 'c2', text: 'Implemented LocalStorage persistence with state migration' },
          { id: 'c3', text: 'Verified re-render isolation using atomic selectors' }
        ]
      },
      {
        id: 'node-testing',
        title: 'Modern Testing: Vitest & Playwright',
        type: 'skill',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 25,
        xp: 190,
        summary: 'Unit testing with Vitest, React Testing Library (RTL), mocking APIs with MSW, and end-to-end testing with Playwright.',
        whyItMatters: 'Greenhouse gas compliance calculations cannot afford regressions. Automated testing ensures reporting accuracy.',
        prerequisites: ['node-react-fundamentals'],
        stepByStepPlan: [
          'Configure Vitest with happy-dom and coverage reports',
          'Write behavioral tests with React Testing Library (getByRole, userEvent)',
          'Mock network traffic reliably using Mock Service Worker (MSW)',
          'Author Playwright end-to-end browser journeys for critical user paths'
        ],
        weekendProject: {
          title: 'Emission Calculator Automated Test Suite',
          description: 'A rock-solid test suite achieving 95% coverage for carbon conversion algorithms, plus an automated Playwright login-to-export workflow.',
          features: ['Vitest unit tests for GHG math formulas', 'MSW mocked API endpoints', 'Playwright cross-browser test runner']
        },
        resources: [
          { title: 'Testing JavaScript by Kent C. Dodds', type: 'Course', url: 'https://testingjavascript.com', provider: 'Kent C. Dodds', free: false },
          { title: 'Playwright Official Docs', type: 'Docs', url: 'https://playwright.dev', provider: 'Microsoft', free: true }
        ],
        githubRepos: [
          { name: 'playwright', description: 'Fast and reliable end-to-end testing for modern web apps', stars: '68k' }
        ],
        interviewQuestions: [
          {
            question: 'What is the philosophy behind React Testing Library\'s "test behavior, not implementation"?',
            hint: 'User interactions vs component internal state/methods.',
            answer: 'Testing internal component state makes tests brittle and prone to breakage during refactors. RTL tests what the user sees and interacts with (buttons, text, accessibility roles).'
          },
          {
            question: 'Why use Mock Service Worker (MSW) over mocking fetch or axios manually?',
            hint: 'Intercepting at network layer vs prototype overriding.',
            answer: 'MSW intercepts HTTP requests at the network layer using Service Workers (browser) and Node interceptors. Your actual application code runs unmodified without brittle global mock replacements.'
          },
          {
            question: 'What is the Testing Trophy hierarchy according to modern testing practices?',
            hint: 'Static -> Unit -> Integration -> End-to-End.',
            answer: 'Static checks (TypeScript/ESLint) catch typos, Unit tests verify isolated algorithms, Integration tests (largest layer) verify interconnected components, and End-to-End tests verify full user journeys.'
          },
          {
            question: 'How do you prevent flaky tests in Playwright or Cypress?',
            hint: 'Avoid arbitrary hardcoded wait timeouts; use auto-waiting locators.',
            answer: 'Never use hardcoded sleep/delays. Rely on Playwright\'s built-in auto-waiting locators, test against user-visible states, and ensure tests run with isolated test database fixtures.'
          },
          {
            question: 'What is code coverage and what are its limitations?',
            hint: 'Line execution vs logical edge cases and assertion quality.',
            answer: 'Code coverage measures which lines were executed during tests, but high coverage doesn\'t guarantee high quality assertions or that business edge cases are properly validated.'
          },
          {
            question: 'How do you test accessibility automatically within your CI/CD test suite?',
            hint: 'axe-core integration with Playwright or Vitest.',
            answer: 'Integrate @axe-core/playwright to scan rendered pages for WCAG violations (color contrast, missing labels, incorrect ARIA roles) as part of automated PR gates.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Written 15+ Vitest tests for complex data transformation functions' },
          { id: 'c2', text: 'Implemented MSW handlers for mock API integration testing' },
          { id: 'c3', text: 'Created an automated Playwright E2E test running headless' }
        ]
      },
      {
        id: 'node-backend-node',
        title: 'Backend Services: Node.js, Express & PostgreSQL',
        type: 'skill',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 45,
        xp: 280,
        summary: 'Node.js runtime, RESTful API architecture, Express/Fastify, PostgreSQL relational database, Prisma ORM, migrations, and auth.',
        whyItMatters: 'Full-stack climate engineers must build reliable backends that process millions of utility bill records and geospatial emissions polygons.',
        prerequisites: ['node-js-fundamentals', 'node-typescript'],
        stepByStepPlan: [
          'Build layered Express/Fastify architectures (routes, controllers, services, repositories)',
          'Design normalized PostgreSQL schemas with foreign keys, indexes, and constraints',
          'Manage schema migrations and type-safe queries using Prisma ORM or Drizzle',
          'Implement JWT authentication, rate limiting, and input validation with Zod'
        ],
        weekendProject: {
          title: 'CarbonMetrics API: Enterprise Emissions Backend',
          description: 'A production-grade REST API for enterprise carbon audits with role-based access control, Prisma PostgreSQL, and Swagger documentation.',
          features: ['PostgreSQL database with Prisma schema & migrations', 'JWT auth with bcrypt password hashing', 'Zod request validation middleware']
        },
        resources: [
          { title: 'Prisma ORM Getting Started', type: 'Docs', url: 'https://prisma.io/docs', provider: 'Prisma', free: true },
          { title: 'Node.js Best Practices Repository', type: 'Guide', url: 'https://github.com/goldbergyoni/nodebestpractices', provider: 'Yoni Goldberg', free: true }
        ],
        githubRepos: [
          { name: 'nodebestpractices', description: 'The largest Node.js best practices list', stars: '98k' }
        ],
        interviewQuestions: [
          {
            question: 'How do database indexes work in PostgreSQL and when can an index degrade performance?',
            hint: 'B-tree index lookups vs write overhead on INSERT/UPDATE.',
            answer: 'PostgreSQL indexes (like B-trees) create fast lookup pointer structures for SELECT queries. However, each index adds overhead to every INSERT, UPDATE, and DELETE because the index tree must be updated.'
          },
          {
            question: 'What is the N+1 query problem and how do you resolve it in an ORM like Prisma?',
            hint: 'Fetching a parent list and executing 1 separate query for every child item.',
            answer: 'N+1 occurs when fetching N records triggers N additional database queries for relations. Resolve it by using SQL JOINs, Prisma\'s include/select relations, or dataloader batching.'
          },
          {
            question: 'What are database transactions and ACID properties?',
            hint: 'Atomicity, Consistency, Isolation, Durability.',
            answer: 'Transactions group multiple SQL operations into a single atomic unit. If any operation fails, the entire transaction rolls back, preserving data integrity (all or nothing).'
          },
          {
            question: 'Explain how Node.js handles I/O operations asynchronously under the hood.',
            hint: 'libuv thread pool and non-blocking event demultiplexer.',
            answer: 'Node.js delegates I/O (filesystem, DNS, network) to libuv. Non-blocking operations use OS asynchronous primitives (epoll/kqueue); blocking operations run on libuv\'s internal worker thread pool.'
          },
          {
            question: 'How do you safeguard a REST API against SQL injection and Cross-Site Scripting (XSS)?',
            hint: 'Parameterized queries and proper output sanitization.',
            answer: 'Prevent SQL injection by using parameterized prepared statements (handled by modern ORMs like Prisma). Prevent XSS by escaping output, using Content Security Policy (CSP), and avoiding dangerous innerHTML.'
          },
          {
            question: 'What is horizontal vs vertical scaling and how does stateless backend design enable it?',
            hint: 'Adding more machines vs bigger CPU/RAM; storing session in Redis/JWT.',
            answer: 'Vertical scaling upgrades existing server specs; horizontal scaling adds more server instances behind a load balancer. Keeping backends stateless (no in-memory sessions) enables effortless horizontal scaling.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Designed and migrated a PostgreSQL schema with relations and indexes' },
          { id: 'c2', text: 'Built a secure REST API with authentication and middleware pipeline' },
          { id: 'c3', text: 'Optimized slow queries using EXPLAIN ANALYZE' }
        ]
      },

      // Phase 4: Projects and Credentials
      {
        id: 'node-portfolio-project',
        title: 'Full Stack Climate-Tech Portfolio Project',
        type: 'project',
        phase: 4,
        phaseName: 'Projects and Credentials',
        hours: 50,
        xp: 400,
        summary: 'Build and deploy "EcoPulse": an end-to-end Enterprise Carbon Accounting SaaS with interactive charts, audit logs, and PDF reporting.',
        whyItMatters: 'Top climate startups look for candidates who understand real-world domain nuances: GHG Protocol Scopes 1, 2, and 3 calculations and enterprise UI standards.',
        prerequisites: ['node-state-management', 'node-backend-node'],
        stepByStepPlan: [
          'Architect system design: React 18, Tailwind, Recharts, Express, Prisma, PostgreSQL',
          'Implement Scope 1, 2, 3 carbon footprint calculators with certified emission factors',
          'Build interactive executive dashboards with Recharts and exportable analytics',
          'Deploy web application with CI/CD pipeline and custom domain'
        ],
        weekendProject: {
          title: 'EcoPulse Enterprise SaaS',
          description: 'A capstone enterprise carbon management web application featuring automated bill ingestion, Scope 1-3 analytics, and compliance audit trail.',
          features: ['Interactive carbon analytics with Recharts', 'PostgreSQL database with Prisma schema', 'Multi-tenant organization authorization']
        },
        resources: [
          { title: 'GHG Protocol Corporate Standard', type: 'Guide', url: 'https://ghgprotocol.org', provider: 'WRI & WBCSD', free: true }
        ],
        githubRepos: [
          { name: 'open-climate-data', description: 'Curated open-source climate and emissions data', stars: '1.8k' }
        ],
        interviewQuestions: [
          {
            question: 'Walk me through the architecture of your full-stack carbon accounting project.',
            hint: 'Frontend layer, API gateway, database design, and key tradeoffs.',
            answer: 'Highlight the React frontend with responsive visualizations, the REST API service layer with Prisma, database indexing strategy for time-series emissions, and automated CI/CD pipeline.'
          },
          {
            question: 'How did you handle data consistency and precision in calculations?',
            hint: 'Floating point rounding errors vs Decimal types in PostgreSQL.',
            answer: 'In financial and emissions reporting, JavaScript floating-point arithmetic can introduce rounding errors. Use Prisma Decimal / PostgreSQL NUMERIC types and decimal.js on the client.'
          },
          {
            question: 'How did you optimize dashboard load times when visualizing thousands of emissions entries?',
            hint: 'Aggregation at database level vs client-side virtualization.',
            answer: 'Pre-aggregate metrics using SQL views and grouping, implement TanStack Query caching, and use windowing/virtualization for long audit log tables.'
          },
          {
            question: 'What security measures did you implement for multi-tenant data isolation?',
            hint: 'Tenant ID scoping in database queries and middleware validation.',
            answer: 'Every database query enforces organization_id filters derived strictly from validated JWT claims in middleware, preventing cross-tenant data leakage.'
          },
          {
            question: 'How do you handle background processing for heavy exports (like PDF carbon reports)?',
            hint: 'Job queues (BullMQ/Redis) vs blocking the HTTP request thread.',
            answer: 'Offload PDF generation to background worker queues (like BullMQ with Redis). The API immediately returns a job ID and notifies the user via polling or WebSocket when ready.'
          },
          {
            question: 'What would you re-architect if your project had to scale to 100,000 corporate users?',
            hint: 'Caching layers, read replicas, and CDN asset distribution.',
            answer: 'Introduce Redis caching for hot emission factors, configure PostgreSQL read replicas for dashboard queries, and move static assets to Cloudflare CDN edge.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Live deployed application accessible via public HTTPS URL' },
          { id: 'c2', text: 'Clean README with architecture diagram, test commands, and demo credentials' },
          { id: 'c3', text: 'Over 85% automated test coverage across critical calculation modules' }
        ]
      },
      {
        id: 'node-cloud-deploy',
        title: 'Docker, Containerization & Cloud Deployment',
        type: 'skill',
        phase: 4,
        phaseName: 'Projects and Credentials',
        hours: 25,
        xp: 220,
        summary: 'Dockerfiles, multi-stage builds, docker-compose, environment secrets management, and deployment on AWS / Render / Vercel.',
        whyItMatters: 'Production climate systems run containerized microservices across cloud environments to ensure reproducible builds and zero-downtime rollouts.',
        prerequisites: ['node-backend-node'],
        stepByStepPlan: [
          'Author multi-stage Dockerfiles optimizing image size from 1GB to <100MB',
          'Orchestrate local full-stack development with Docker Compose (App + Postgres + Redis)',
          'Configure GitHub Actions for automated lint, test, build, and deployment on push',
          'Deploy application to cloud platforms with SSL and health-check monitoring'
        ],
        weekendProject: {
          title: 'Containerized Climate Microservice Deployment',
          description: 'Package your full-stack app into lean production Docker containers with automated GitHub Actions CI/CD to a live cloud host.',
          features: ['Multi-stage Alpine Node.js Dockerfile', 'Docker Compose with Postgres healthcheck', 'Automated GitHub Actions deploy pipeline']
        },
        resources: [
          { title: 'Docker Official Getting Started', type: 'Docs', url: 'https://docs.docker.com/get-started', provider: 'Docker', free: true }
        ],
        githubRepos: [
          { name: 'awesome-docker', description: 'Curated list of Docker resources and best practices', stars: '31k' }
        ],
        interviewQuestions: [
          {
            question: 'What is a multi-stage Docker build and why is it crucial for production Node.js images?',
            hint: 'Separating build dependencies from final minimal runtime container.',
            answer: 'Multi-stage builds compile code (TypeScript, bundling) in a build stage with all devDependencies, then copy only compiled assets and production dependencies to a lean final Alpine image, reducing attack surface and image size.'
          },
          {
            question: 'How do containers differ from Virtual Machines (VMs)?',
            hint: 'Shared host OS kernel vs hypervisor and guest operating systems.',
            answer: 'VMs virtualize hardware and run entire guest OSs on a hypervisor, consuming gigabytes of memory. Containers virtualize at the OS level, sharing the host Linux kernel for lightweight and instant startups.'
          },
          {
            question: 'How should you manage secret API keys and database credentials in production Docker deployments?',
            hint: 'Never baked into image layers; inject via environment variables or secret managers.',
            answer: 'Never hardcode secrets in Dockerfiles. Inject secrets at runtime using environment variables, Docker Secrets, or cloud secret managers (AWS Secrets Manager, Doppler).'
          },
          {
            question: 'What is the purpose of Docker layer caching and how do you optimize Dockerfiles for it?',
            hint: 'Order commands from least frequently changed to most frequently changed.',
            answer: 'Docker caches image layers. Copy package.json and run npm install BEFORE copying source code so dependency layers remain cached unless package.json changes.'
          },
          {
            question: 'What is the difference between Docker CMD and ENTRYPOINT?',
            hint: 'Default executable vs default command arguments that can be overridden.',
            answer: 'ENTRYPOINT specifies the immutable command to run when the container starts. CMD provides default arguments that can be easily overridden from the CLI.'
          },
          {
            question: 'How do health checks in Docker and cloud orchestrators prevent downtime during updates?',
            hint: 'Routing traffic only after the health endpoint returns 200 OK.',
            answer: 'Orchestrators poll a /health endpoint. Traffic is routed to the new container only after it returns healthy, rolling back if startup fails without disrupting live users.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Authored an optimized multi-stage Dockerfile' },
          { id: 'c2', text: 'Configured GitHub Actions workflow for automated testing and builds' },
          { id: 'c3', text: 'Live cloud deployment with automated health check verification' }
        ]
      },
      {
        id: 'node-cert-cloud',
        title: 'AWS Certified Cloud Practitioner or Developer',
        type: 'cert',
        phase: 4,
        phaseName: 'Projects and Credentials',
        hours: 30,
        xp: 300,
        summary: 'AWS core services: EC2, S3, RDS, Lambda, VPC, IAM security, CloudWatch monitoring, and CloudFront CDN.',
        whyItMatters: 'Demonstrates verified cloud literacy that sets you apart from junior applicants in enterprise-funded climate tech startups.',
        prerequisites: ['node-cloud-deploy'],
        stepByStepPlan: [
          'Study AWS compute (EC2, ECS, Lambda) and storage (S3, EBS, EFS)',
          'Master AWS networking basics (VPC, subnets, security groups, route tables)',
          'Understand IAM policies, roles, and least-privilege security architectures',
          'Pass practice exams with >85% score and register for official certification'
        ],
        weekendProject: {
          title: 'AWS Serverless Carbon Ping Service',
          description: 'Deploy an AWS Lambda function with API Gateway and S3 storage that triggers an alert if regional power grid emissions exceed clean energy thresholds.',
          features: ['AWS Lambda triggered via API Gateway', 'IAM role with least privilege', 'S3 bucket hosting static dashboard assets']
        },
        resources: [
          { title: 'AWS Skill Builder Official Free Courses', type: 'Course', url: 'https://skillbuilder.aws', provider: 'Amazon Web Services', free: true },
          { title: 'Stephane Maarek AWS Courses', type: 'Course', url: 'https://udemy.com', provider: 'Stephane Maarek', free: false }
        ],
        githubRepos: [
          { name: 'aws-certified-developer-associate-resources', description: 'Curated cheatsheets and study guides', stars: '8.4k' }
        ],
        interviewQuestions: [
          {
            question: 'Explain the difference between Amazon S3 and Amazon EBS.',
            hint: 'Object storage vs block-level storage attached to an instance.',
            answer: 'S3 is highly scalable, distributed object storage accessible via HTTP/REST, ideal for static assets and backups. EBS is network-attached block storage attached directly to a single EC2 instance for OS and database storage.'
          },
          {
            question: 'What is the principle of least privilege in AWS IAM?',
            hint: 'Granting only the bare minimum permissions needed to perform a role.',
            answer: 'Least privilege dictates that identities (users, services, roles) receive only the exact permissions necessary to execute their assigned duties and nothing more, reducing security exposure.'
          },
          {
            question: 'How does AWS Lambda serverless execution model work and what is a cold start?',
            hint: 'Event-driven compute that spins down to zero; initialization latency.',
            answer: 'Lambda runs code in response to events and scales automatically without provisioning servers. A cold start occurs when an invocation requires downloading code and initializing a new execution environment.'
          },
          {
            question: 'What is an AWS VPC and what is the difference between a public and private subnet?',
            hint: 'Internet Gateway attachment and NAT Gateway.',
            answer: 'A VPC is an isolated virtual network in AWS. A public subnet routes outbound internet traffic through an Internet Gateway. A private subnet has no direct internet route and communicates externally via a NAT Gateway.'
          },
          {
            question: 'What is Amazon CloudFront and how does it reduce frontend latency?',
            hint: 'Global Content Delivery Network (CDN) edge locations.',
            answer: 'CloudFront is a global CDN that caches static and dynamic web content at edge locations worldwide close to users, drastically cutting latency and reducing load on origin servers.'
          },
          {
            question: 'What is the AWS Shared Responsibility Model?',
            hint: 'Security OF the cloud vs security IN the cloud.',
            answer: 'AWS is responsible for security OF the cloud (physical data centers, hardware, hypervisors, network infrastructure). The customer is responsible for security IN the cloud (customer data, IAM, OS patches, firewall rules).'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Completed official AWS foundational training modules' },
          { id: 'c2', text: 'Achieved 85%+ on three timed full-length practice exams' },
          { id: 'c3', text: 'Deployed a serverless application using AWS Lambda and S3' }
        ]
      },

      // Phase 5: Career Entry
      {
        id: 'node-resume-portfolio',
        title: 'Climate-Tech Resume & Portfolio Polish',
        type: 'milestone',
        phase: 5,
        phaseName: 'Career Entry',
        hours: 15,
        xp: 150,
        summary: 'ATS-optimized resume tailoring, impact metrics formatting (STAR/XYZ), developer portfolio website, and clean GitHub profile.',
        whyItMatters: 'Recruiters spend 7 seconds on initial resume scans. Highlighting carbon-accounting domain impact guarantees interview callbacks.',
        prerequisites: ['node-portfolio-project', 'node-cert-cloud'],
        stepByStepPlan: [
          'Format experience using Google\'s XYZ formula ("Accomplished [X] as measured by [Y] by doing [Z]")',
          'Deploy a minimalist developer portfolio showcasing the live EcoPulse SaaS project',
          'Optimize GitHub pinned repositories with comprehensive READMEs and architecture diagrams',
          'Conduct ATS keyword analysis targeting climate-tech job listings'
        ],
        weekendProject: {
          title: 'High-Impact Developer Portfolio Site',
          description: 'A blazing-fast portfolio showcasing your live full-stack projects, architecture case studies, and engineering philosophy.',
          features: ['Lighthouse 100/100 performance score', 'Interactive project case study walkthroughs', 'Clean dark-mode aesthetic with direct contact integration']
        },
        resources: [
          { title: 'Tech Resume Guide by Gergely Orosz', type: 'Article', url: 'https://blog.pragmaticengineer.com', provider: 'Pragmatic Engineer', free: true }
        ],
        githubRepos: [
          { name: 'developer-portfolios', description: 'Showcase of great developer portfolios', stars: '14k' }
        ],
        interviewQuestions: [
          {
            question: 'How do you structure project bullet points on a tech resume for maximum impact?',
            hint: 'Lead with strong action verbs and quantifiable business/technical metrics.',
            answer: 'Use Google\'s XYZ formula: "Architected real-time carbon emissions dashboard reducing query latency by 45% for 12 enterprise clients using Prisma and PostgreSQL indexing."'
          },
          {
            question: 'What are the top red flags tech hiring managers look for on junior resumes?',
            hint: 'Generic tutorial clones, lack of live links, passive voice, missing tech stack details.',
            answer: 'Listing tutorial clones (like standard todo apps) without unique domain value, broken live demo links, missing GitHub repositories, and vague descriptions without technical depth.'
          },
          {
            question: 'How do you tailor a resume for a climate-tech startup vs a big tech enterprise?',
            hint: 'Startup speed and mission passion vs large-scale systems and formal process.',
            answer: 'For climate startups, highlight rapid feature delivery, mission alignment with sustainability, and full-stack ownership. For big tech, emphasize scalability, testing rigor, and system design.'
          },
          {
            question: 'What should be included in a technical project README to impress senior engineers?',
            hint: 'Architecture diagram, problem statement, key engineering tradeoffs, setup instructions.',
            answer: 'A high-level architecture diagram, why you chose specific technologies over alternatives, testing instructions, live demo URL, and what you would improve next.'
          },
          {
            question: 'How do ATS (Applicant Tracking Systems) actually parse resumes?',
            hint: 'Standard single-column layouts, plain text parsing, keyword density.',
            answer: 'ATS engines strip formatting to parse text into fields. Two-column graphic-heavy templates often fail to parse properly; clean single-column markdown/PDF layouts parse reliably.'
          },
          {
            question: 'How can you demonstrate passionate interest in the climate tech sector without prior formal work experience?',
            hint: 'Open source climate projects, climate hackathons, domain knowledge of ESG/GHG.',
            answer: 'Build domain-specific applications (e.g. GHG protocol calculators), contribute to open climate data repositories, participate in climate hackathons, and discuss climate tech trends in blog posts.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Resume audited with 85%+ score on tech resume scanners' },
          { id: 'c2', text: 'Live portfolio website deployed with custom domain' },
          { id: 'c3', text: 'All pinned GitHub repositories have informative visual READMEs' }
        ]
      },
      {
        id: 'node-interview-prep',
        title: 'Full Stack & Climate Domain Interview Simulation',
        type: 'milestone',
        phase: 5,
        phaseName: 'Career Entry',
        hours: 30,
        xp: 250,
        summary: 'Data structures & algorithms (LeetCode Easy/Medium), frontend system design, live coding drills, and behavioral questions.',
        whyItMatters: 'Technical interview loops at top climate startups test both practical coding speed and system design communication.',
        prerequisites: ['node-resume-portfolio'],
        stepByStepPlan: [
          'Solve top 50 LeetCode patterns (Two Pointers, Hash Maps, BFS/DFS, Sliding Window)',
          'Frontend system design practice (building an infinite-scroll metrics feed, autocomplete)',
          'Behavioral answers using STAR framework (Situation, Task, Action, Result)',
          'Mock technical interviews with peers or recording self-evaluations'
        ],
        weekendProject: {
          title: 'Timed Mock Interview Gauntlet',
          description: 'Simulate a 45-minute live technical screen: build a debounced emissions search widget while talking through time/space complexity.',
          features: ['Live coding under 45-minute countdown', 'Verbalizing thought process and edge cases', 'Space and time complexity big-O breakdown']
        },
        resources: [
          { title: 'NeetCode 150 Roadmap', type: 'Practice', url: 'https://neetcode.io', provider: 'NeetCode', free: true },
          { title: 'Frontend Interview Handbook', type: 'Guide', url: 'https://frontendinterviewhandbook.com', provider: 'GreatFrontEnd', free: true }
        ],
        githubRepos: [
          { name: 'front-end-interview-handbook', description: 'Curated frontend interview prep questions', stars: '40k' }
        ],
        interviewQuestions: [
          {
            question: 'Design a high-frequency real-time telemetry dashboard for 500,000 smart energy meters.',
            hint: 'WebSockets vs Server-Sent Events, client-side batching, windowing.',
            answer: 'Use Server-Sent Events or WebSockets for unidirectional live updates, buffer telemetry in Redis on the backend, throttle client updates to 1-second ticks, and virtualize table/chart rendering.'
          },
          {
            question: 'Tell me about a time you faced a difficult technical bug and how you resolved it (STAR).',
            hint: 'Situation, Task, Action, Result with humble ownership and systematic debugging.',
            answer: 'Structure your response clearly: describe the high-stakes issue, your methodical root cause analysis using telemetry and logs, your targeted fix, and preventative tests added.'
          },
          {
            question: 'How do you approach a live coding question when you don\'t immediately know the solution?',
            hint: 'Clarify constraints, start with brute force, communicate trade-offs, iterate.',
            answer: 'Never stay silent. Clarify constraints and edge cases, outline a brute-force approach first, discuss why it is suboptimal, and collaboratively brainstorm optimizations.'
          },
          {
            question: 'What is the time and space complexity of searching a value in a hash table vs a balanced binary search tree?',
            hint: 'O(1) average vs O(log n).',
            answer: 'Hash table lookup is O(1) average (O(n) worst case on hash collisions). A balanced BST (AVL or Red-Black) is strictly O(log n) worst case and preserves ordered traversal.'
          },
          {
            question: 'How do you handle disagreement with a senior engineer or product manager on architectural choices?',
            hint: 'Data-driven discussion, understanding constraints, disagree and commit.',
            answer: 'Listen actively to understand their constraints (deadline, budget, scalability). Present benchmark data or prototypes objectively, and once a team decision is reached, commit 100%.'
          },
          {
            question: 'Why do you want to work at this specific climate-tech company?',
            hint: 'Connect personal mission with company product and engineering challenges.',
            answer: 'Show genuine research: articulate admiration for their specific product (e.g. Scope 3 supply chain decarbonization), their market traction, and how your skills can solve their current pain points.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Completed NeetCode Core 75 algorithmic challenges' },
          { id: 'c2', text: 'Conducted 3 live peer mock technical interviews' },
          { id: 'c3', text: 'Drafted 5 polished STAR behavioral stories' }
        ]
      },
      {
        id: 'node-junior-role',
        title: 'Junior Software Engineer / Apprentice',
        type: 'role',
        phase: 5,
        phaseName: 'Career Entry',
        hours: 20,
        xp: 350,
        summary: 'First professional full-stack role at an agency, green tech startup, or fellowship working with production codebases.',
        whyItMatters: 'Translates theoretical learning into verified production tenure, code review collaboration, and real business impact.',
        prerequisites: ['node-interview-prep'],
        stepByStepPlan: [
          'Onboard into existing large-scale monorepos and microservice architectures',
          'Submit clean PRs adhering to engineering guidelines and internal testing standards',
          'Participate in agile sprint ceremonies, retrospectives, and architecture reviews',
          'Identify and champion small UX or performance improvements in the backlog'
        ],
        weekendProject: {
          title: '30-Day Engineering Onboarding Blueprint',
          description: 'A structured blueprint for hitting the ground running in your first 30 days: setup automation, first PR within 72 hours, and team knowledge docs.',
          features: ['Local dev environment setup script', 'First bug fix pull request checklist', '1-on-1 question roadmap with engineering leads']
        },
        resources: [
          { title: 'The Effective Engineer by Edmond Lau', type: 'Book', url: 'https://effectiveengineer.com', provider: 'Edmond Lau', free: false }
        ],
        githubRepos: [
          { name: 'first-contributions', description: 'Hands-on guide to making open source contributions', stars: '45k' }
        ],
        interviewQuestions: [
          {
            question: 'What was the most challenging technical feature you contributed to during your engineering experience?',
            hint: 'Focus on scale, ambiguity, and collaboration.',
            answer: 'Articulate the technical complexity, trade-offs between speed and maintainability, collaboration with designers and backend leads, and quantifiable outcome.'
          },
          {
            question: 'How do you handle receiving critical feedback on a pull request?',
            hint: 'Growth mindset, detaching ego from code, seeking clarification.',
            answer: 'Code review comments improve product quality, not judge personal worth. Thank the reviewer, discuss the technical reasoning, implement the changes, and learn the underlying pattern.'
          },
          {
            question: 'How do you prioritize competing priorities during an agile sprint?',
            hint: 'Communication with PM/Lead, identifying blockers, transparent estimates.',
            answer: 'Align with the sprint goal, communicate blockers early, break large tasks into atomic deliverables, and re-estimate transparently when unforeseen complexity arises.'
          },
          {
            question: 'Describe a time you diagnosed and resolved a production outage or regression.',
            hint: 'Triage, mitigation (rollback/hotfix), post-mortem root cause analysis.',
            answer: 'Walk through isolating the blast radius using error monitoring (Sentry/Datadog), executing an immediate rollback or safe patch, verifying recovery, and writing a blameless post-mortem.'
          },
          {
            question: 'How do you write clean, maintainable code in a fast-paced environment?',
            hint: 'Self-documenting variable names, atomic functions, comprehensive tests.',
            answer: 'Follow single responsibility principles, use explicit naming over cryptic abbreviations, write automated unit tests, and avoid clever one-liners in favor of readable clarity.'
          },
          {
            question: 'What engineering practices did you adopt to prevent future regressions?',
            hint: 'Automated CI checks, integration tests, static typing, code reviews.',
            answer: 'Add regression unit tests replicating the failure before writing the fix, enforce strict TypeScript compiler flags, and add automated linting in CI.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Shipped 10+ merged production pull requests' },
          { id: 'c2', text: 'Participated in on-call rotation or incident triaging' },
          { id: 'c3', text: 'Authored engineering documentation or runbook for team' }
        ]
      },
      {
        id: 'node-target-role',
        title: 'Full Stack Developer at Climate-Tech Startup',
        type: 'target',
        phase: 5,
        phaseName: 'Target Dream Job',
        isTarget: true,
        hours: 0,
        xp: 1000,
        summary: 'Target Career Goal: Build mission-critical decarbonization software, real-time energy grid dashboards, and scalable climate infrastructure.',
        whyItMatters: 'Reverse-engineering complete! You are ready to drive high-impact technological solutions for global carbon neutrality.',
        prerequisites: ['node-junior-role'],
        stepByStepPlan: [
          'Full-stack architecture ownership across web dashboards and cloud services',
          'Direct collaboration with climate scientists, ESG data partners, and product designers',
          'Mentoring junior engineers and driving team engineering excellence',
          'Deploying systems that measurably eliminate gigatons of CO2 equivalent'
        ],
        weekendProject: {
          title: 'Decarbonization Impact Presentation',
          description: 'A comprehensive technical demo and slide deck showcasing how your full-stack engineering work drives planetary carbon reduction.',
          features: ['Live enterprise demo walkthrough', 'System scalability benchmarks', 'Mission impact summary']
        },
        resources: [
          { title: 'Climate Tech VC (CTVC) Market Insights', type: 'Newsletter', url: 'https://ctvc.co', provider: 'CTVC', free: true }
        ],
        githubRepos: [
          { name: 'awesome-climate-tech', description: 'Curated list of climate tech startups and resources', stars: '2.5k' }
        ],
        interviewQuestions: [
          {
            question: 'Where do you see the biggest technology bottlenecks in enterprise decarbonization over the next 5 years?',
            hint: 'Scope 3 supply chain transparency, real-time grid data, verification.',
            answer: 'Scope 3 supply chain accounting accounts for >80% of emissions but relies on crude averages. Real-time API integrations with utility meters and cryptographic audit trails will unlock true transparency.'
          },
          {
            question: 'How do you balance shipping fast vs building scalable foundations at an early-stage startup?',
            hint: 'Pragmatic technical debt, modular boundaries, automated tests for core logic.',
            answer: 'Ship simple, modular code that solves immediate user pain. Avoid premature over-engineering, but maintain strict automated test coverage on critical calculation engines and maintain clean service boundaries.'
          },
          {
            question: 'How do you foster a culture of engineering excellence and psychological safety on your team?',
            hint: 'Blameless post-mortems, encouraging questions, constructive reviews.',
            answer: 'Conduct blameless post-mortems focused on systemic fixes, celebrate questions and junior onboarding, provide empathetic feedback in reviews, and lead by example.'
          },
          {
            question: 'What is your architectural philosophy when integrating third-party APIs that frequently change?',
            hint: 'Adapter pattern, anti-corruption layers, schema validation.',
            answer: 'Implement an Anti-Corruption Layer (ACL) using the Adapter pattern. Validate third-party payloads with Zod at the boundary and translate them to internal domain entities, insulating your codebase.'
          },
          {
            question: 'How do you communicate complex technical tradeoffs to non-technical stakeholders (founders, climate scientists)?',
            hint: 'Framing in terms of user experience, speed to market, cost, and reliability.',
            answer: 'Translate technical debt or refactoring needs into tangible business terms: impact on user latency, hosting cost, development velocity for upcoming quarters, and downtime risks.'
          },
          {
            question: 'What motivates you to work specifically in climate technology long-term?',
            hint: 'Purpose-driven engineering, combining high technical rigor with global urgency.',
            answer: 'Engineering skills applied to climate software have compounding leverage: building tools that accelerate enterprise decarbonization creates permanent planetary impact far beyond standard SaaS.'
          }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Received and evaluated formal Full Stack Developer offer letters' },
          { id: 'c2', text: 'Joined high-impact climate-tech startup engineering team' },
          { id: 'c3', text: 'Achieved complete career roadmap reverse-engineering' }
        ]
      }
    ],
    edges: [
      { id: 'e-html-js', source: 'node-html-css', target: 'node-js-fundamentals', animated: true },
      { id: 'e-js-react', source: 'node-js-fundamentals', target: 'node-react-fundamentals', animated: true },
      { id: 'e-git-react', source: 'node-git-github', target: 'node-react-fundamentals', animated: false },
      { id: 'e-react-ts', source: 'node-react-fundamentals', target: 'node-typescript', animated: true },
      { id: 'e-react-api', source: 'node-react-fundamentals', target: 'node-api-integration', animated: false },
      { id: 'e-ts-state', source: 'node-typescript', target: 'node-state-management', animated: true },
      { id: 'e-ts-backend', source: 'node-typescript', target: 'node-backend-node', animated: false },
      { id: 'e-react-testing', source: 'node-react-fundamentals', target: 'node-testing', animated: false },
      { id: 'e-state-portfolio', source: 'node-state-management', target: 'node-portfolio-project', animated: true },
      { id: 'e-testing-portfolio', source: 'node-testing', target: 'node-portfolio-project', animated: false },
      { id: 'e-backend-portfolio', source: 'node-backend-node', target: 'node-portfolio-project', animated: true },
      { id: 'e-backend-docker', source: 'node-backend-node', target: 'node-cloud-deploy', animated: false },
      { id: 'e-docker-cert', source: 'node-cloud-deploy', target: 'node-cert-cloud', animated: false },
      { id: 'e-portfolio-resume', source: 'node-portfolio-project', target: 'node-resume-portfolio', animated: true },
      { id: 'e-cert-resume', source: 'node-cert-cloud', target: 'node-resume-portfolio', animated: false },
      { id: 'e-resume-interview', source: 'node-resume-portfolio', target: 'node-interview-prep', animated: true },
      { id: 'e-interview-junior', source: 'node-interview-prep', target: 'node-junior-role', animated: true },
      { id: 'e-junior-target', source: 'node-junior-role', target: 'node-target-role', animated: true }
    ]
  },

  'aiml-google': {
    id: 'aiml-google',
    goal: 'AI/ML Engineer at Google',
    targetCompany: 'Google DeepMind / Google Cloud AI',
    industry: 'Artificial Intelligence & Large Models',
    level: 'Intermediate to Job-Ready',
    weeklyHours: 20,
    targetMonths: 8,
    totalHours: 420,
    tags: ['Python', 'PyTorch', 'Transformers', 'Distributed Training', 'TensorFlow', 'MLOps'],
    summary: 'Reverse-engineered pathway to master foundational mathematics, deep neural networks, LLM fine-tuning, distributed GPU training, and Google-caliber system design.',
    nodes: [
      {
        id: 'node-python-math',
        title: 'Python Mastery & Linear Algebra / Calculus',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 35,
        xp: 150,
        summary: 'Vector spaces, matrix decomposition (SVD, Eigenvalues), gradient descent, multivariable calculus, and advanced Python 3.12.',
        whyItMatters: 'Every neural network architecture at Google relies on matrix multiplications and vector calculus optimization.',
        prerequisites: [],
        stepByStepPlan: ['Vectors, matrices, dot products, and SVD decomposition', 'Partial derivatives and chain rule for backpropagation', 'Probability distributions, Bayes theorem, and expectation', 'Object-oriented Python, generators, and vectorization'],
        weekendProject: {
          title: 'NumPy Backpropagation Engine from Scratch',
          description: 'Build a multi-layer perceptron and autograd engine purely using NumPy without PyTorch.',
          features: ['Custom tensor class with backward() method', 'Vectorized matrix multiplication', 'Stochastic Gradient Descent optimizer']
        },
        resources: [
          { title: '3Blue1Brown: Essence of Linear Algebra', type: 'Video Series', url: 'https://youtube.com', provider: '3Blue1Brown', free: true },
          { title: 'Mathematics for Machine Learning', type: 'Book', url: 'https://mml-book.com', provider: 'Cambridge Univ. Press', free: true }
        ],
        githubRepos: [{ name: 'micrograd', description: 'A tiny scalar-valued autograd engine by Andrej Karpathy', stars: '38k' }],
        interviewQuestions: [
          { question: 'Derive the backpropagation gradient for matrix multiplication Y = X * W.', hint: 'Chain rule for matrix calculus.', answer: 'dY/dW = X^T * dL/dY, and dY/dX = dL/dY * W^T.' },
          { question: 'What is the difference between L1 (Lasso) and L2 (Ridge) regularization geometrically?', hint: 'Diamond constraint vs spherical constraint.', answer: 'L1 has diamond contours with sharp corners that intersect axes, producing sparse weights. L2 has circular contours that shrink weights smoothly without setting them strictly to zero.' },
          { question: 'Explain Eigenvalues and Eigenvectors and their relevance to PCA.', hint: 'Directions of maximum variance.', answer: 'Eigenvectors are vectors that only scale by scalar eigenvalue lambda when transformed. In PCA, eigenvectors of covariance matrix identify principal axes of maximum variance.' },
          { question: 'What causes vanishing and exploding gradients in deep neural networks?', hint: 'Repeated matrix multiplications in backpropagation chain rule.', answer: 'Multiplying many gradients < 1 shrinks gradients exponentially to zero; multiplying weights > 1 explodes gradients. Solved via residual connections, LayerNorm, and Xavier/He initialization.' },
          { question: 'What is the difference between generator and iterator in Python?', hint: 'yield keyword vs __iter__ and __next__.', answer: 'An iterator implements __iter__ and __next__. A generator is a function utilizing yield that automatically generates stateful iterator mechanics with lazy memory evaluation.' },
          { question: 'How does GIL (Global Interpreter Lock) in CPython affect multi-threaded CPU computations?', hint: 'Only one native thread executes Python bytecode at a time.', answer: 'The GIL allows only one thread to execute Python bytecode at once, limiting CPU-bound concurrency. High-performance ML libraries (PyTorch/NumPy) release the GIL during C/C++/CUDA operations.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Implemented autograd backpropagation engine passing numerical gradient checks' },
          { id: 'c2', text: 'Solved 20 vector calculus and probability problems' },
          { id: 'c3', text: 'Created vectorized NumPy operations without explicit Python for-loops' }
        ]
      },
      {
        id: 'node-ml-foundations',
        title: 'Classical Machine Learning & Scikit-Learn',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 30,
        xp: 180,
        summary: 'Supervised/unsupervised models, bias-variance tradeoff, cross-validation, feature engineering, and ROC-AUC metrics.',
        whyItMatters: 'Google ML interview rounds heavily test deep understanding of fundamental model evaluation and baseline comparisons.',
        prerequisites: ['node-python-math'],
        stepByStepPlan: ['Linear/Logistic regression, Decision Trees, and Random Forests', 'Gradient Boosting (XGBoost, LightGBM)', 'K-Means clustering and PCA dimensionality reduction', 'Stratified K-fold cross-validation and hyperparameter tuning'],
        weekendProject: {
          title: 'High-Throughput Fraud Detection Pipeline',
          description: 'A complete Scikit-Learn / XGBoost pipeline addressing class imbalance (SMOTE) with 0.98 ROC-AUC.',
          features: ['Custom feature transformers with Pipeline', 'Precision-recall curve trade-off analysis', 'Model interpretation with SHAP values']
        },
        resources: [
          { title: 'Hands-On Machine Learning with Scikit-Learn & PyTorch', type: 'Book', url: 'https://oreilly.com', provider: 'Aurélien Géron', free: false }
        ],
        githubRepos: [{ name: 'scikit-learn', description: 'Machine learning in Python', stars: '57k' }],
        interviewQuestions: [
          { question: 'Explain the Bias-Variance tradeoff and how ensemble methods affect each.', hint: 'Bagging reduces variance; Boosting reduces bias.', answer: 'High bias causes underfitting; high variance causes overfitting. Bagging (Random Forest) trains independent trees and averages predictions to reduce variance. Boosting (XGBoost) trains sequentially on residuals to reduce bias.' },
          { question: 'When would you prefer PR-AUC over ROC-AUC in classification?', hint: 'Heavily imbalanced datasets.', answer: 'ROC-AUC can be overly optimistic when the negative class is overwhelmingly dominant (e.g. fraud 99.9% non-fraud). PR-AUC focuses directly on true positives vs false positives, giving an accurate picture of minority class performance.' },
          { question: 'How does XGBoost handle missing values during tree splits?', hint: 'Default direction assignment.', answer: 'XGBoost automatically learns a default split direction for missing values by testing which branch yields greater gain during training.' },
          { question: 'What is data leakage and how do you prevent it in cross-validation?', hint: 'Fitting scalers on full dataset before splitting.', answer: 'Data leakage happens when test set information contaminates training. Prevent it by fitting scalers, encoders, and feature selectors strictly inside cross-validation training folds.' },
          { question: 'What is the mathematical difference between Ridge and Lasso loss functions?', hint: 'L2 squared norm vs L1 absolute value penalty.', answer: 'Ridge adds lambda * sum(w_i^2); Lasso adds lambda * sum(|w_i|).' },
          { question: 'How do SHAP (SHapley Additive exPlanations) values work?', hint: 'Game theory cooperative coalitions.', answer: 'SHAP computes the marginal contribution of each feature across all possible feature coalitions using cooperative game theory, ensuring fair and consistent feature attribution.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Built a robust Scikit-Learn pipeline with zero data leakage' },
          { id: 'c2', text: 'Achieved top 15% benchmark on Kaggle tabular competition dataset' },
          { id: 'c3', text: 'Analyzed model interpretability using SHAP force plots' }
        ]
      },
      {
        id: 'node-pytorch-deep-learning',
        title: 'Deep Learning & PyTorch Architecture',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 50,
        xp: 300,
        summary: 'PyTorch tensors, autograd, nn.Module, custom Dataset/DataLoader, CNNs, RNNs, and custom training loops on CUDA GPUs.',
        whyItMatters: 'PyTorch is the research lingua franca across modern AI labs. Writing clean idiomatic training loops is expected at Google.',
        prerequisites: ['node-ml-foundations'],
        stepByStepPlan: ['PyTorch tensor operations, broadcasting, and GPU memory management', 'Building modular models with torch.nn and parameter initialization', 'Custom Dataset and DataLoader with multi-worker prefetching', 'Mixed precision training (torch.cuda.amp) and gradient clipping'],
        weekendProject: {
          title: 'ResNet Vision Classifier with Mixed Precision',
          description: 'Train a deep residual neural network on CIFAR-100 with cosine annealing scheduler, CutMix augmentation, and AMP fp16.',
          features: ['Residual skip connection implementation', 'Automatic mixed precision (AMP) scaling', 'TensorBoard loss and gradient norm logging']
        },
        resources: [
          { title: 'PyTorch Official Deep Learning Tutorials', type: 'Docs', url: 'https://pytorch.org/tutorials', provider: 'PyTorch', free: true },
          { title: 'Fast.ai: Practical Deep Learning for Coders', type: 'Course', url: 'https://course.fast.ai', provider: 'Jeremy Howard', free: true }
        ],
        githubRepos: [{ name: 'pytorch', description: 'Tensors and Dynamic neural networks in Python', stars: '82k' }],
        interviewQuestions: [
          { question: 'What is the purpose of optimizer.zero_grad() and loss.backward() in PyTorch?', hint: 'Gradient accumulation mechanics.', answer: 'PyTorch accumulates gradients in tensor .grad by default (useful for large virtual batch sizes). optimizer.zero_grad() clears previous gradients, and loss.backward() computes gradients via backpropagation.' },
          { question: 'Why are skip/residual connections essential in deep networks like ResNet?', hint: 'Gradient highway bypassing nonlinearities.', answer: 'Skip connections allow gradients to flow directly back through identity shortcuts during backpropagation without passing through weight decay or vanishing activations, enabling 100+ layer architectures.' },
          { question: 'How does Batch Normalization differ from Layer Normalization?', hint: 'Normalizing across batch dimension vs feature/hidden dimension.', answer: 'BatchNorm normalizes across all samples in the mini-batch for each feature channel (batch-size dependent). LayerNorm normalizes across all features for a single sample (batch-size independent, ideal for NLP/Transformers).' },
          { question: 'What is Automatic Mixed Precision (AMP) and how does it save GPU VRAM?', hint: 'Float16 vs Float32 representation.', answer: 'AMP executes operations in 16-bit floating point (fp16/bf16) where safe, reducing VRAM usage by ~50% and doubling Tensor Core throughput, while maintaining master weights in fp32 with loss scaling to prevent underflow.' },
          { question: 'How do you diagnose and debug a GPU CUDA Out Of Memory (OOM) error?', hint: 'Batch size reduction, gradient checkpointing, memory leaks.', answer: 'Clear PyTorch cache with torch.cuda.empty_cache(), reduce batch size, detach tensors from autograd history when calculating metrics, use gradient accumulation, and enable gradient checkpointing.' },
          { question: 'What is Dropout and how does its behavior change between model.train() and model.eval()?', hint: 'Randomly zeroing activations during training vs scaling during inference.', answer: 'During training, Dropout randomly zeros neurons with probability p to prevent co-adaptation. During eval, all neurons remain active and are multiplied by (1-p) so expected activation magnitude remains constant.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Implemented ResNet residual blocks from scratch in PyTorch' },
          { id: 'c2', text: 'Trained model using torch.cuda.amp mixed precision on GPU' },
          { id: 'c3', text: 'Engineered custom Dataset and DataLoader with zero GPU starvation' }
        ]
      },
      {
        id: 'node-transformers-llms',
        title: 'Transformers, Attention & Modern LLMs',
        type: 'skill',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 60,
        xp: 350,
        summary: 'Self-attention, Multi-Head Attention, RoPE positional embeddings, KV Cache, FlashAttention, and Hugging Face Transformers.',
        whyItMatters: 'Google pioneered the Transformer ("Attention Is All You Need") and develops Gemini. Deep architectural fluency is non-negotiable.',
        prerequisites: ['node-pytorch-deep-learning'],
        stepByStepPlan: ['Self-attention math: Query, Key, Value matrix multiplications and softmax scaling', 'RoPE (Rotary Position Embeddings) and Multi-Query/Grouped-Query Attention (GQA)', 'Inference optimization: KV Cache mechanics and FlashAttention GPU tiling', 'Fine-tuning with LoRA (Low-Rank Adaptation) and QLoRA on open models'],
        weekendProject: {
          title: 'Mini-Gemini: Decoder-Only LLM from Scratch',
          description: 'Build a decoder-only GPT/Gemini-style Transformer from scratch in PyTorch with causal masking and generate sample text.',
          features: ['Causal Multi-Head Attention with KV caching', 'Rotary Positional Embeddings (RoPE)', 'Top-p (nucleus) and temperature sampling generation']
        },
        resources: [
          { title: 'The Illustrated Transformer by Jay Alammar', type: 'Visual Guide', url: 'https://jalammar.github.io', provider: 'Jay Alammar', free: true },
          { title: 'Andrej Karpathy: Let\'s build GPT from scratch', type: 'Video Masterclass', url: 'https://youtube.com', provider: 'Andrej Karpathy', free: true }
        ],
        githubRepos: [{ name: 'transformers', description: 'State-of-the-art Machine Learning for PyTorch, TF, and JAX', stars: '135k' }],
        interviewQuestions: [
          { question: 'Why is attention divided by the square root of d_k in Scaled Dot-Product Attention?', hint: 'Preventing large dot products from pushing softmax into saturation regions.', answer: 'For large key dimensions d_k, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients. Dividing by sqrt(d_k) keeps variance at 1, preserving healthy gradients.' },
          { question: 'What is the KV Cache in transformer inference and why is it essential?', hint: 'Avoiding redundant recalculation of past tokens in autoregressive generation.', answer: 'In autoregressive generation, past tokens do not change. Caching their Key and Value projection matrices avoids recomputing self-attention for all preceding tokens at every step, dropping inference complexity from O(N^2) to O(N).' },
          { question: 'Explain how LoRA (Low-Rank Adaptation) parameter-efficient fine-tuning works.', hint: 'Decomposing weight update delta W = B * A with low rank r.', answer: 'LoRA freezes original pre-trained weight matrix W_0 (d x k) and injects trainable rank-decomposition matrices A (r x k) and B (d x r) where r << min(d, k). This reduces trainable parameters by >99% while matching full fine-tuning performance.' },
          { question: 'What is Grouped-Query Attention (GQA) and why do modern LLMs use it over MHA?', hint: 'Sharing Key and Value heads across multiple Query heads.', answer: 'Multi-Head Attention maintains independent K and V heads per Query head, creating massive memory bandwidth bottlenecks in KV caching. GQA groups Query heads to share single K and V heads, drastically reducing KV cache VRAM footprint with minimal quality loss.' },
          { question: 'What is FlashAttention and how does it achieve 2-4x speedup without approximation?', hint: 'SRAM GPU tiling to minimize slow HBM memory read/writes.', answer: 'Traditional attention writes large intermediate N x N attention matrices to high-bandwidth GPU memory (HBM). FlashAttention tiles computation into fast on-chip SRAM blocks and computes online softmax, minimizing slow HBM memory transfers.' },
          { question: 'How does Rotary Position Embedding (RoPE) differ from sinusoidal embeddings?', hint: 'Rotating Query and Key vectors in complex space based on relative distance.', answer: 'RoPE applies an orthogonal rotation matrix to Query and Key vectors in 2D coordinate pairs. The dot product naturally preserves relative token distance (m - n), enabling superior length generalization compared to absolute additive embeddings.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Coded Scaled Dot-Product Attention and Multi-Head Attention without libraries' },
          { id: 'c2', text: 'Implemented KV caching in autoregressive text generation loop' },
          { id: 'c3', text: 'Fine-tuned an open LLM using LoRA / Hugging Face PEFT' }
        ]
      },
      {
        id: 'node-distributed-training',
        title: 'Distributed Training & MLOps Infrastructure',
        type: 'skill',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 45,
        xp: 300,
        summary: 'Data Parallelism (DDP), FSDP (Fully Sharded Data Parallel), DeepSpeed, Ray Train, Triton Inference Server, and Vertex AI.',
        whyItMatters: 'Google operates thousands of TPU/GPU clusters. Knowledge of distributed sharding and production deployment is core to the AI/ML Engineer role.',
        prerequisites: ['node-transformers-llms'],
        stepByStepPlan: ['PyTorch DistributedDataParallel (DDP) communication and AllReduce primitives', 'ZeRO / Fully Sharded Data Parallel (FSDP) parameter, gradient, and optimizer state sharding', 'Model serving with Triton Inference Server or vLLM with PagedAttention', 'MLOps pipelines: model registry, experiment tracking with Weights & Biases, and CI/CD'],
        weekendProject: {
          title: 'High-Throughput vLLM Model Serving Cluster',
          description: 'Deploy a high-concurrency LLM inference microservice using vLLM PagedAttention with latency benchmarking and streaming tokens.',
          features: ['vLLM continuous batching configuration', 'Prometheus and Grafana latency metrics', 'Streaming SSE token delivery API']
        },
        resources: [
          { title: 'PyTorch FSDP Tutorial', type: 'Docs', url: 'https://pytorch.org', provider: 'PyTorch Team', free: true },
          { title: 'DeepSpeed Documentation', type: 'Docs', url: 'https://deepspeed.ai', provider: 'Microsoft', free: true }
        ],
        githubRepos: [{ name: 'vllm', description: 'A high-throughput and memory-efficient LLM serving engine', stars: '35k' }],
        interviewQuestions: [
          { question: 'Explain the difference between DDP (Distributed Data Parallel) and FSDP (Fully Sharded Data Parallel).', hint: 'Replicating model weights vs sharding parameters, gradients, and optimizer states.', answer: 'DDP replicates the entire model across all GPUs and averages gradients via AllReduce, requiring the full model to fit on one GPU. FSDP shards model parameters, gradients, and optimizer states across GPUs (ZeRO-3), allowing models larger than single GPU VRAM to train.' },
          { question: 'What are the main distributed collective communication primitives (AllReduce, AllGather, ReduceScatter)?', hint: 'Summing across nodes vs assembling pieces from nodes.', answer: 'AllReduce sums tensors across all ranks and gives the result to everyone. ReduceScatter reduces and splits results so each rank holds a slice. AllGather gathers slices from all ranks into complete tensors on all ranks.' },
          { question: 'What is PagedAttention in vLLM and how does it eliminate memory waste?', hint: 'Virtual memory paging applied to KV cache.', answer: 'Standard KV caching pre-allocates contiguous memory blocks for worst-case sequence lengths, wasting 60-80% of VRAM due to internal/external fragmentation. PagedAttention divides KV cache into non-contiguous blocks managed via virtual page tables, enabling dynamic allocation and memory sharing.' },
          { question: 'What is Tensor Parallelism (TP) vs Pipeline Parallelism (PP)?', hint: 'Splitting individual matrix operations vs splitting layers across GPUs.', answer: 'Tensor Parallelism (Megatron-LM) splits individual linear layer matrices across GPUs within a node (fast NVLink). Pipeline Parallelism partitions layers sequentially across nodes, using micro-batching to reduce pipeline bubble idle time.' },
          { question: 'How do you prevent training divergence in large distributed LLM pre-training runs?', hint: 'Learning rate warmups, loss spikes, checkpointing frequency.', answer: 'Implement learning rate warmups, clip gradient norms (e.g. 1.0), log gradient norms across ranks, use AdamW with epsilon 1e-8, and configure frequent asynchronous distributed checkpoints to resume quickly after node failure.' },
          { question: 'How does continuous batching differ from static batching in LLM serving?', hint: 'Batching at token iteration level vs request arrival level.', answer: 'Static batching waits for all requests in a batch to finish generating before returning, idling fast requests. Continuous batching operates at the token iteration level, ejecting finished sequences immediately and inserting new requests on the fly.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Configured a multi-GPU PyTorch DDP / FSDP training script' },
          { id: 'c2', text: 'Benchmarked throughput of vLLM PagedAttention against naive PyTorch' },
          { id: 'c3', text: 'Instrumented experiment tracking with Weights & Biases' }
        ]
      },
      {
        id: 'node-ml-system-design',
        title: 'Machine Learning System Design & Google AI Interview',
        type: 'milestone',
        phase: 4,
        phaseName: 'Projects and Credentials',
        hours: 40,
        xp: 350,
        summary: 'Google-scale system design: YouTube Video Recommendations, Google Search Ranking, Gemini Multi-Modal RAG, and latency SLAs.',
        whyItMatters: 'System design is the decisive differentiator for L4/L5 AI/ML Engineer leveling at Google.',
        prerequisites: ['node-distributed-training'],
        stepByStepPlan: ['Two-stage recommendation systems: Candidate Generation (Retrieval) and Heavy Ranking', 'Vector search embeddings, approximate nearest neighbors (HNSW, ScaNN)', 'Online feature stores (Feast), real-time feature logging, and training-serving skew', 'Designing 99.9% availability low-latency ML serving pipelines'],
        weekendProject: {
          title: 'Semantic Multimodal Retrieval Engine with ScaNN',
          description: 'Build an end-to-end vector search retrieval pipeline serving 1M embeddings under 15ms latency with approximate nearest neighbors.',
          features: ['Google ScaNN vector indexing', 'FastAPI async inference endpoint', 'Real-time embedding generation with CLIP']
        },
        resources: [
          { title: 'Designing Machine Learning Systems by Chip Huyen', type: 'Book', url: 'https://chiphuyen.com', provider: 'O\'Reilly', free: false },
          { title: 'Google Research: Deep Neural Networks for YouTube Recommendations', type: 'Paper', url: 'https://research.google', provider: 'Google Research', free: true }
        ],
        githubRepos: [{ name: 'google-research/scann', description: 'Scalable Nearest Neighbors library by Google', stars: '3.6k' }],
        interviewQuestions: [
          { question: 'Design the recommendation system for YouTube Home Feed.', hint: 'Candidate generation (retrieve 1000 from billions) -> Ranking -> Diversity/Re-ranking.', answer: 'Two-stage architecture: Candidate generation uses dual-tower neural embeddings and ScaNN vector search to retrieve 1,000 candidates from billions in <20ms. The Ranking stage applies a deep neural network with cross features to predict watch time. Finally, re-ranking filters duplicates and enforces freshness.' },
          { question: 'What is training-serving skew and how do you prevent it in production ML?', hint: 'Features computed differently in batch training vs real-time inference.', answer: 'Skew occurs when feature transformations differ between training (offline SQL) and serving (online code), or from time-travel leakage. Prevent it by using a centralized Feature Store (like Feast) with identical transformation logic for both offline point-in-time joins and online low-latency lookups.' },
          { question: 'How does Approximate Nearest Neighbor (ANN) search using HNSW work?', hint: 'Hierarchical Navigable Small World graphs with skip-list layers.', answer: 'HNSW builds multi-layer graphs where top layers have sparse long-range connections (like a skip list) and bottom layers have dense local connections. Search rapidly traverses top layers to the approximate neighborhood, then zooms into fine-grained local neighbors in logarithmic time.' },
          { question: 'How do you monitor and handle model concept drift and data drift in production?', hint: 'KS-test, Population Stability Index (PSI), automated shadow deployment.', answer: 'Monitor input distributions against training baselines using Population Stability Index (PSI) or Kolmogorov-Smirnov tests. Track output prediction drift and ground truth latency metrics. Trigger automated retraining pipelines and roll out new models via shadow or canary traffic.' },
          { question: 'How would you design a multimodal RAG system for Google Gemini?', hint: 'Multimodal embeddings, document chunking, hybrid keyword+vector retrieval, reranker.', answer: 'Extract text, tables, and images from documents; embed using multimodal encoders (e.g. CLIP/Gemini); index in vector store with BM25 hybrid search; retrieve top-50; apply cross-encoder reranker for top-5; construct prompt with citations for Gemini generation.' },
          { question: 'How do you evaluate generative AI systems when ground truth is subjective?', hint: 'LLM-as-a-judge, human evals, automated benchmarks (MMLU, GSM8K).', answer: 'Use multi-faceted evaluation: benchmark suites for objective reasoning, LLM-as-a-Judge with rubric-based pairwise win-rate scoring, semantic similarity against golden reference sets, and regular blind human evaluation audits.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Designed full architectural blueprint for a recommendation engine' },
          { id: 'c2', text: 'Built and benchmarked ScaNN vector search index under 20ms p99' },
          { id: 'c3', text: 'Conducted 3 ML System Design mock interview sessions' }
        ]
      },
      {
        id: 'node-target-google',
        title: 'AI/ML Engineer at Google',
        type: 'target',
        phase: 5,
        phaseName: 'Target Dream Job',
        isTarget: true,
        hours: 0,
        xp: 1000,
        summary: 'Target Career Goal: Build and deploy state-of-the-art foundation models and scalable intelligence systems at Google.',
        whyItMatters: 'Reverse-engineering complete! You are equipped to build next-generation AI at the company that pioneered modern deep learning.',
        prerequisites: ['node-ml-system-design'],
        stepByStepPlan: ['Drive frontier model development and fine-tuning pipelines', 'Architect distributed TPU/GPU training clusters', 'Collaborate with researchers on novel architectures and multimodal reasoning', 'Deliver AI breakthroughs to billions of global Google users'],
        weekendProject: {
          title: 'Google AI Portfolio Showcase',
          description: 'A live interactive demonstration of custom fine-tuned models, open-source pull requests, and research implementations.',
          features: ['Interactive model playground', 'Published technical write-up on distributed training', 'Benchmarked reproduction of landmark AI paper']
        },
        resources: [
          { title: 'Google Research Publications', type: 'Research Portal', url: 'https://research.google', provider: 'Google', free: true }
        ],
        githubRepos: [{ name: 'google-research', description: 'Google Research repositories and codebases', stars: '36k' }],
        interviewQuestions: [
          { question: 'Why Google AI over other tech giants or research labs?', hint: 'Culture of open research, TPU hardware infrastructure, planetary scale impact.', answer: 'Highlight Google\'s historic leadership from Transformers and AlphaFold to Gemini, the unmatched TPU v5/v6 hardware infrastructure, and the opportunity to deploy intelligent systems that impact billions of lives daily.' },
          { question: 'What is your philosophy on AI safety, alignment, and responsible deployment?', hint: 'Constitutional AI, red teaming, mitigating hallucination and bias.', answer: 'AI safety must be integrated throughout the development lifecycle: curated diverse data, RLHF/DPO with constitutional constraints, rigorous automated red-teaming against jailbreaks, and transparent confidence thresholds in production.' },
          { question: 'How do you approach reproducing an unverified research paper when code is unavailable?', hint: 'Isolate key claims, build synthetic minimal tests, inspect hyperparameter sensitivity.', answer: 'Start by implementing the core mathematical equation in a minimal isolated test. Verify on small synthetic benchmarks before scaling up. Systematically test learning rates, initializations, and normalization layers that papers often omit.' },
          { question: 'How do you decide between building a custom architecture vs adapting an existing foundation model?', hint: 'Latency, data availability, training cost, task specificity.', answer: 'Start with foundation model prompting and fine-tuning (LoRA) as a fast baseline. Transition to custom lightweight models only if latency/cost SLAs demand it, proprietary edge deployment is required, or domain data is completely unique.' },
          { question: 'Describe a research or engineering project where you had to pivot after an initial hypothesis failed.', hint: 'Scientific method, data-driven diagnostic analysis, positive outcome.', answer: 'Describe the original hypothesis, the telemetry proving it ineffective, the diagnostic experiments that uncovered the true bottleneck, and the revised approach that delivered superior results.' },
          { question: 'What is the next major frontier in AI after Large Language Models?', hint: 'Embodied AI, reasoning agents, test-time compute scaling, multimodality.', answer: 'Test-time compute scaling (System 2 deliberate reasoning), persistent autonomous agents with tool use and self-correction, and grounded multimodal perception linking vision, sound, and real-world physical robotics.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Completed Google technical coding and ML system design loops' },
          { id: 'c2', text: 'Received Google L4/L5 AI/ML Engineer offer letter' },
          { id: 'c3', text: 'Celebrated career goal milestone achievement' }
        ]
      }
    ],
    edges: [
      { id: 'e-py-ml', source: 'node-python-math', target: 'node-ml-foundations', animated: true },
      { id: 'e-ml-dl', source: 'node-ml-foundations', target: 'node-pytorch-deep-learning', animated: true },
      { id: 'e-dl-trans', source: 'node-pytorch-deep-learning', target: 'node-transformers-llms', animated: true },
      { id: 'e-trans-dist', source: 'node-transformers-llms', target: 'node-distributed-training', animated: true },
      { id: 'e-dist-sys', source: 'node-distributed-training', target: 'node-ml-system-design', animated: true },
      { id: 'e-sys-google', source: 'node-ml-system-design', target: 'node-target-google', animated: true }
    ]
  },

  'data-scientist-fintech': {
    id: 'data-scientist-fintech',
    goal: 'Data Scientist in FinTech',
    targetCompany: 'Stripe / Robinhood / Brex',
    industry: 'Financial Technology & Quantitative Analytics',
    level: 'Beginner to Job-Ready',
    weeklyHours: 18,
    targetMonths: 6,
    totalHours: 350,
    tags: ['Python', 'SQL', 'Time-Series', 'Risk Modeling', 'Fraud Detection', 'A/B Testing'],
    summary: 'Master financial econometric modeling, transaction fraud detection algorithms, statistical hypothesis testing, and quantitative risk engines.',
    nodes: [
      {
        id: 'node-fin-sql',
        title: 'Advanced SQL & Financial Ledger Modeling',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 30,
        xp: 160,
        summary: 'Window functions (LAG/LEAD, NTILE), CTEs, double-entry bookkeeping schemas, and time-series aggregations.',
        whyItMatters: 'FinTech queries operate over immutable transaction ledgers where precision and auditability are non-negotiable.',
        prerequisites: [],
        stepByStepPlan: ['Window functions: rolling 30-day cumulative sums, moving averages', 'Double-entry accounting schemas with debit/credit constraints', 'Query optimization on billion-row transaction partitions', 'Recursive CTEs for transaction trace lineage'],
        weekendProject: {
          title: 'Stripe Ledger Fraud Query Suite',
          description: 'A suite of 20 high-performance SQL queries detecting velocity abuse, card testing attacks, and merchant chargeback anomalies.',
          features: ['Rolling 5-minute velocity window calculations', 'Recursive account linkage detection', 'Audited zero-sum ledger balance assertions']
        },
        resources: [
          { title: 'Mode Analytics SQL Tutorial', type: 'Interactive', url: 'https://mode.com/sql-tutorial', provider: 'Mode', free: true }
        ],
        githubRepos: [{ name: 'awesome-sql', description: 'Curated list of awesome SQL and database resources', stars: '7.8k' }],
        interviewQuestions: [
          { question: 'Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() in SQL.', hint: 'Handling tied scores and gap numbering.', answer: 'ROW_NUMBER() assigns strictly unique integers. RANK() assigns the same rank to ties but leaves gaps in subsequent rankings. DENSE_RANK() assigns the same rank to ties without skipping numbers.' },
          { question: 'How do you calculate a rolling 30-day customer spending average using SQL window functions?', hint: 'OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN).', answer: 'Use AVG(amount) OVER (PARTITION BY user_id ORDER BY transaction_date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW).' },
          { question: 'Why is double-entry bookkeeping used in financial software and how is it modeled in relational SQL?', hint: 'Every transaction has equal debits and credits.', answer: 'Double-entry guarantees that money cannot be created or destroyed accidentally. Every transaction entry inserts equal debit and credit rows across accounts, ensuring sum(debit) == sum(credit).' },
          { question: 'What is the difference between WHERE and HAVING in SQL aggregations?', hint: 'Filtering individual rows vs filtering grouped aggregations.', answer: 'WHERE filters rows before any grouping or aggregation takes place. HAVING filters groups after GROUP BY and aggregate functions (like SUM, COUNT) have been computed.' },
          { question: 'How do index types (B-tree, Hash, GiST) differ in PostgreSQL for financial data?', hint: 'Range queries vs exact equality lookups vs geometric/range types.', answer: 'B-tree handles equality and range queries (<, >) essential for dates and transaction amounts. Hash indexes only support exact equality. GiST/BRIN indexes optimize massive append-only sequential timestamps.' },
          { question: 'How do you detect concurrent race conditions when updating an account balance?', hint: 'SELECT FOR UPDATE, optimistic locking with version column.', answer: 'Use pessimistic row locking (SELECT * FROM accounts WHERE id = 1 FOR UPDATE) inside a transaction, or optimistic locking where updates verify an incrementing version number (WHERE version = 5).' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Authored complex window queries with rolling moving averages' },
          { id: 'c2', text: 'Designed an immutable double-entry ledger schema' },
          { id: 'c3', text: 'Passed advanced LeetCode SQL database challenges' }
        ]
      },
      {
        id: 'node-fin-timeseries',
        title: 'Time-Series Forecasting & Econometrics',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 45,
        xp: 260,
        summary: 'Stationarity, ARIMA/SARIMAX, Prophet, GARCH volatility modeling, and Backtesting trading signals.',
        whyItMatters: 'Predicting liquidity requirements and exchange rate fluctuations is central to treasury and risk management.',
        prerequisites: ['node-fin-sql'],
        stepByStepPlan: ['Stationarity testing: Augmented Dickey-Fuller (ADF) test and differencing', 'Autoregressive models: ARIMA, seasonal SARIMAX, and AutoARIMA', 'Volatility modeling with GARCH for market risk value-at-risk (VaR)', 'Walk-forward cross-validation to prevent time-travel bias'],
        weekendProject: {
          title: 'Liquidity Cash Flow Forecaster',
          description: 'A SARIMAX & Prophet pipeline forecasting 30-day merchant payout liquidity with 95% confidence intervals.',
          features: ['ADF stationarity transformation', 'Seasonal decomposition (trend, seasonality, noise)', 'Walk-forward validation evaluation']
        },
        resources: [
          { title: 'Forecasting: Principles and Practice by Rob J Hyndman', type: 'Book', url: 'https://otexts.com/fpp3', provider: 'OTexts', free: true }
        ],
        githubRepos: [{ name: 'statsmodels', description: 'Statistical modeling and econometrics in Python', stars: '9.5k' }],
        interviewQuestions: [
          { question: 'Why is standard K-fold cross-validation invalid for time-series forecasting?', hint: 'Future data leaking into the past.', answer: 'Standard K-fold randomly shuffles data, allowing future observations to train models predicting past events (lookahead bias). Time-series requires walk-forward (expanding or sliding window) validation respecting chronological order.' },
          { question: 'What does it mean for a time-series to be stationary and why does ARIMA require it?', hint: 'Constant mean, constant variance, and autocovariance independent of time.', answer: 'Stationary series have statistical properties (mean, variance, autocorrelation) that do not change over time. Non-stationary series cause spurious regressions. Differencing stabilizes mean trends.' },
          { question: 'What is Value at Risk (VaR) and how is it calculated?', hint: 'Maximum expected loss over a time horizon at a given confidence level.', answer: 'VaR estimates the maximum potential loss over a specific timeframe (e.g., 1 day) at a confidence level (e.g., 99%). Calculated via Historical simulation, Parametric (variance-covariance), or Monte Carlo simulations.' },
          { question: 'What is the purpose of GARCH models in quantitative finance?', hint: 'Volatility clustering (periods of high volatility followed by high volatility).', answer: 'GARCH models capture time-varying conditional variance (heteroskedasticity), reflecting market realities where calm periods and volatile shocks cluster together.' },
          { question: 'Explain the difference between ACF (Autocorrelation Function) and PACF (Partial Autocorrelation Function).', hint: 'Direct correlation vs correlation controlling for intermediate lags.', answer: 'ACF measures correlation between observations at lag k including intermediate effects. PACF measures the pure direct correlation between lag 0 and lag k, controlling for intervening lags, used to identify AR order p.' },
          { question: 'How do you evaluate forecast accuracy: RMSE vs MAE vs MAPE?', hint: 'Penalizing large outliers vs scale independence.', answer: 'RMSE squares errors, penalizing rare large outlier mistakes heavily (important in risk). MAE treats errors linearly. MAPE expresses error as a percentage, but divides by zero on zero-demand days.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Conducted stationarity tests and applied differencing' },
          { id: 'c2', text: 'Implemented walk-forward backtesting pipeline' },
          { id: 'c3', text: 'Modeled financial volatility using GARCH(1,1)' }
        ]
      },
      {
        id: 'node-fin-fraud',
        title: 'Machine Learning for Fraud & Risk Scoring',
        type: 'project',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 50,
        xp: 350,
        summary: 'Imbalanced classification, Isolation Forests, Graph Neural Networks for collusion, and real-time inference latency under 50ms.',
        whyItMatters: 'Fraud defense directly protects millions of dollars in transaction revenue across Stripe and Robinhood.',
        prerequisites: ['node-fin-timeseries'],
        stepByStepPlan: ['Feature engineering: IP geo-velocity, device fingerprinting, carding clusters', 'Anomaly detection with Isolation Forests and Autoencoders', 'Extreme gradient boosting with cost-sensitive loss functions', 'A/B testing simulation of approval rate vs fraud loss rate trade-off'],
        weekendProject: {
          title: 'ShieldPay: Real-Time Fraud Classification Engine',
          description: 'A production-grade fraud scoring API processing 10,000 tx/sec with cost-sensitive threshold optimization and SHAP explainability.',
          features: ['LightGBM model with focal loss for 0.05% fraud prevalence', 'Sub-30ms scoring API with FastAPI', 'SHAP feature reason codes returned in payload']
        },
        resources: [
          { title: 'Stripe Engineering Blog: How Radar Works', type: 'Engineering Case Study', url: 'https://stripe.com/blog', provider: 'Stripe', free: true }
        ],
        githubRepos: [{ name: 'fraud-detection-handbook', description: 'Reproducible machine learning for credit card fraud detection', stars: '3.2k' }],
        interviewQuestions: [
          { question: 'How do you handle severe class imbalance where only 0.05% of transactions are fraudulent?', hint: 'Resampling, cost-sensitive loss, precision-recall optimization.', answer: 'Avoid accuracy as a metric. Use PR-AUC and cost-weighted loss matrices (penalizing false negatives far higher than false positives). Leverage anomaly detection, focal loss, and tune the classification decision threshold.' },
          { question: 'How do you optimize the decision threshold between fraud loss and false decline friction?', hint: 'Cost of fraud vs lost lifetime value of a falsely declined legitimate customer.', answer: 'Calculate expected value for thresholds: Cost = (False Positives * Customer Churn Cost) + (False Negatives * Fraud Loss). Optimize the threshold where marginal fraud reduction equals marginal churn cost.' },
          { question: 'What is concept drift in financial fraud and why does it occur faster than in other domains?', hint: 'Adversarial adaptation: fraudsters intentionally change tactics when blocked.', answer: 'Fraud is an active adversarial game. Once fraudsters discover rules blocking specific BIN ranges or countries, they immediately mutate tactics, requiring continuous online learning and unsupervised anomaly detection.' },
          { question: 'How can Graph Neural Networks (GNNs) detect fraud rings and synthetic identities?', hint: 'Connecting shared device fingerprints, credit cards, and bank routing numbers.', answer: 'Fraudsters often share subtle identifiers (same device ID, phone prefix, IP subnet) across dozens of fake identities. GNNs propagate node embeddings across transaction graphs to detect dense fraud rings.' },
          { question: 'Why is model explainability (e.g. adverse action notices) a legal requirement in financial credit scoring?', hint: 'FCRA and ECOA regulatory compliance.', answer: 'Regulations like the Fair Credit Reporting Act (FCRA) and ECOA require lenders to provide specific "adverse action" reason codes explaining exactly why an applicant was denied, preventing discriminatory black-box decisions.' },
          { question: 'How do you build a real-time feature store that computes a user\'s 10-minute transaction count under 10ms?', hint: 'Redis sliding window sorted sets (ZSET).', answer: 'Use Redis sorted sets (ZSET) where timestamps are scores. On each transaction, prune items older than now - 10 minutes (ZREMRANGEBYSCORE), add the current timestamp (ZADD), and count remaining items (ZCARD) in O(log N).' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Trained model on imbalanced dataset achieving >0.90 PR-AUC' },
          { id: 'c2', text: 'Implemented cost-sensitive threshold optimization' },
          { id: 'c3', text: 'Extracted regulatory adverse action codes using SHAP' }
        ]
      },
      {
        id: 'node-fin-target',
        title: 'Data Scientist in FinTech',
        type: 'target',
        phase: 5,
        phaseName: 'Target Dream Job',
        isTarget: true,
        hours: 0,
        xp: 1000,
        summary: 'Target Career Goal: Build quantitative algorithms, real-time risk scoring, and data-driven payment intelligence at top FinTech leaders.',
        whyItMatters: 'Reverse-engineering complete! You possess the mathematical and algorithmic chops to safeguard global financial infrastructure.',
        prerequisites: ['node-fin-fraud'],
        stepByStepPlan: ['Lead quantitative modeling for credit risk, fraud, or payments intelligence', 'Design rigorous A/B experiments driving revenue and fraud reduction', 'Partner with regulatory, product, and engineering teams', 'Build financial models operating with zero error tolerance'],
        weekendProject: {
          title: 'FinTech Quant Portfolio Showcase',
          description: 'A portfolio presenting financial backtests, fraud detection ROC curves, and simulated A/B testing experiment plans.',
          features: ['Interactive fraud threshold optimizer', 'A/B test sample size and power calculator', 'Detailed risk model documentation']
        },
        resources: [
          { title: 'The Journal of Financial Data Science', type: 'Academic Journal', url: 'https://jfds.pm-research.com', provider: 'PM Research', free: false }
        ],
        githubRepos: [{ name: 'awesome-quant', description: 'Curated list of quantitative finance tools and libraries', stars: '18k' }],
        interviewQuestions: [
          { question: 'Design an A/B testing experiment to measure the revenue impact of an Instant Payout feature.', hint: 'Randomization unit, primary and guardrail metrics, network effects.', answer: 'Randomize at the merchant level. Primary metric: incremental payout transaction volume. Guardrail metrics: chargeback rate, customer support ticket volume, credit risk exposure. Account for merchant cannibalization.' },
          { question: 'What is statistical power in hypothesis testing and how do you calculate sample size?', hint: '1 - beta, probability of rejecting false null hypothesis.', answer: 'Statistical power (typically 80%) is the probability of correctly rejecting a false null hypothesis. Sample size depends on baseline conversion rate, Minimum Detectable Effect (MDE), significance level alpha (5%), and power.' },
          { question: 'How do you handle multiple hypothesis testing (peeking problem) in online experiments?', hint: 'Bonferroni correction, Benjamini-Hochberg FDR, sequential testing.', answer: 'Testing multiple variants or peeking at p-values inflates False Positive Rates. Counteract this using Bonferroni or Benjamini-Hochberg False Discovery Rate corrections, or adopt Sequential Testing (mSPRT).' },
          { question: 'How do you communicate risk model uncertainty to executive leadership during a market downturn?', hint: 'Scenario stress testing, confidence intervals, worst-case tail risks.', answer: 'Present scenario stress tests (e.g. 2008 liquidity crunch scenario) rather than single-point estimates. Clearly articulate 95% confidence intervals and maximum potential drawdown tail risks.' },
          { question: 'What is survivorship bias in historical financial data and how do you avoid it?', hint: 'Backtesting only on companies or assets that survived to the present day.', answer: 'Survivorship bias occurs when failed companies or liquidated funds are excluded from historical datasets, artificially inflating backtested strategy returns. Avoid it by using point-in-time datasets containing delisted entities.' },
          { question: 'Why do you want to be a Data Scientist in FinTech rather than big tech consumer apps?', hint: 'High stakes, direct economic leverage, quantitative mathematical depth.', answer: 'FinTech pairs algorithmic sophistication with immediate economic impact. Every basis point of fraud prevented or credit risk optimized directly expands economic opportunity for businesses globally.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Conducted end-to-end A/B test power analysis calculation' },
          { id: 'c2', text: 'Cleared technical screens and quantitative case studies' },
          { id: 'c3', text: 'Received FinTech Data Scientist offer letter' }
        ]
      }
    ],
    edges: [
      { id: 'e-sql-ts', source: 'node-fin-sql', target: 'node-fin-timeseries', animated: true },
      { id: 'e-ts-fraud', source: 'node-fin-timeseries', target: 'node-fin-fraud', animated: true },
      { id: 'e-fraud-target', source: 'node-fin-fraud', target: 'node-fin-target', animated: true }
    ]
  },

  'cybersecurity-analyst': {
    id: 'cybersecurity-analyst',
    goal: 'Cybersecurity Analyst',
    targetCompany: 'CrowdStrike / Mandiant / Palo Alto Networks',
    industry: 'Information Security & Threat Defense',
    level: 'Beginner to Job-Ready',
    weeklyHours: 15,
    targetMonths: 6,
    totalHours: 300,
    tags: ['Network Security', 'SIEM & SOC', 'Incident Response', 'Threat Hunting', 'Wireshark', 'Splunk'],
    summary: 'Master enterprise packet analysis, SIEM log correlation, threat hunting with MITRE ATT&CK, vulnerability scanning, and incident triage.',
    nodes: [
      {
        id: 'node-sec-network',
        title: 'Networking & Packet Inspection with Wireshark',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 30,
        xp: 150,
        summary: 'TCP/IP stack, DNS/DHCP protocols, TLS handshake, packet captures (pcap), and port scanning with Nmap.',
        whyItMatters: 'Every cyber attack traverses the network. Deep packet literacy is the cornerstone of threat detection.',
        prerequisites: [],
        stepByStepPlan: ['TCP 3-way handshake and TCP flag inspection (SYN, ACK, FIN, RST)', 'Analyzing DNS exfiltration and HTTP malware traffic in Wireshark', 'Port scanning and service enumeration with Nmap', 'Firewall rule configurations and subnet network security groups'],
        weekendProject: {
          title: 'Wireshark Pcap Malware Traffic Analysis',
          description: 'Analyze an infected enterprise network pcap to identify C2 beaconing, lateral movement, and data exfiltration.',
          features: ['Extracted suspicious C2 IP addresses and domains', 'Identified unencrypted credentials in plaintext traffic', 'Documented chronological timeline of compromise']
        },
        resources: [
          { title: 'Wireshark User Guide', type: 'Documentation', url: 'https://wireshark.org/docs', provider: 'Wireshark', free: true },
          { title: 'Professor Messer CompTIA Security+ Training', type: 'Course', url: 'https://professormesser.com', provider: 'Professor Messer', free: true }
        ],
        githubRepos: [{ name: 'wireshark', description: 'Universal packet analyzer', stars: '8k' }],
        interviewQuestions: [
          { question: 'Explain the TCP three-way handshake and what a SYN flood attack does.', hint: 'SYN, SYN-ACK, ACK and half-open connection queues.', answer: 'Client sends SYN, server responds with SYN-ACK, client sends ACK. In a SYN flood, attacker sends massive SYN packets with spoofed IPs, filling the server\'s backlog queue so legitimate connections are rejected.' },
          { question: 'What is the difference between a stateful and stateless firewall?', hint: 'Tracking connection state vs evaluating packets in isolation.', answer: 'A stateless firewall filters packets based on individual header criteria (IP, port) in isolation. A stateful firewall tracks active connection states (e.g. established TCP streams), only allowing returning packets that match authorized sessions.' },
          { question: 'How does DNS tunneling exfiltrate sensitive data from an enterprise network?', hint: 'Encoding stolen data inside DNS query subdomains to an attacker-controlled nameserver.', answer: 'Attacker malware encodes sensitive data into subdomains (e.g. dXNlcjpwYXNz.attacker.com) sent as DNS queries. Internal DNS resolvers forward queries to the attacker\'s nameserver, bypassing typical web proxies.' },
          { question: 'What is the difference between symmetric and asymmetric encryption?', hint: 'Shared secret key vs public/private key pairs.', answer: 'Symmetric (AES) uses one shared key for encryption and decryption (fast, used for bulk data). Asymmetric (RSA/ECC) uses public key to encrypt and private key to decrypt (secure key exchange).' },
          { question: 'What happens during a TLS 1.3 handshake?', hint: '1-RTT key exchange using ephemeral Diffie-Hellman.', answer: 'Client sends ClientHello with supported ciphers and key shares. Server responds with chosen cipher and server key share, establishing encrypted session keys in a single round-trip (1-RTT) with Perfect Forward Secrecy.' },
          { question: 'How do you detect an ARP spoofing (Man-in-the-Middle) attack on a local subnet?', hint: 'Multiple IP addresses mapped to the same MAC address in ARP cache.', answer: 'Inspect ARP cache: if two different IP addresses (like gateway and target) suddenly map to the same MAC address, an attacker is poisoning ARP tables. Mitigate using Dynamic ARP Inspection (DAI).' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Captured and dissected live TCP 3-way handshakes in Wireshark' },
          { id: 'c2', text: 'Conducted authorized Nmap scans discovering open ports and banners' },
          { id: 'c3', text: 'Detected rogue DNS beaconing patterns in traffic captures' }
        ]
      },
      {
        id: 'node-sec-siem',
        title: 'SIEM Operations, Splunk & SOC Threat Hunting',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 45,
        xp: 250,
        summary: 'Splunk Search Processing Language (SPL), Windows Event Logs (Sysmon), Linux auth.log, and correlation alerts.',
        whyItMatters: 'SOC Analysts live in SIEM dashboards, triaging thousands of enterprise security alerts daily.',
        prerequisites: ['node-sec-network'],
        stepByStepPlan: ['Master Windows Security Log IDs (4624, 4625, 4688) and Sysmon process creation', 'Author complex Splunk SPL queries for abnormal login spikes', 'Build automated correlation rules mapping alerts to MITRE ATT&CK techniques', 'Create SOC triage playbooks for phishing and brute force containment'],
        weekendProject: {
          title: 'Splunk Attack Detection & Dashboard Suite',
          description: 'Deploy a local Splunk instance ingesting BOTS (Boss of the SOC) datasets and build a real-time threat detection dashboard.',
          features: ['Splunk SPL alert for Pass-the-Hash credential dumping', 'Geo-IP visualization of unauthorized SSH logins', 'Automated severity triage rubric']
        },
        resources: [
          { title: 'Splunk Fundamentals Free Course', type: 'Course', url: 'https://splunk.com/training', provider: 'Splunk', free: true },
          { title: 'MITRE ATT&CK Matrix for Enterprise', type: 'Knowledge Base', url: 'https://attack.mitre.org', provider: 'MITRE', free: true }
        ],
        githubRepos: [{ name: 'SigmaHQ/sigma', description: 'Generic Signature Format for SIEM Systems', stars: '8.5k' }],
        interviewQuestions: [
          { question: 'What Windows Event ID represents a failed logon vs a successful logon?', hint: 'Event IDs 4625 and 4624.', answer: 'Event ID 4625 signifies a failed logon attempt (crucial for brute force detection). Event ID 4624 represents a successful logon, where Logon Type (Type 2 interactive, Type 3 network, Type 10 RDP) reveals origin.' },
          { question: 'Walk me through how you investigate a phishing alert reported by an employee.', hint: 'Header inspection, sender SPF/DKIM/DMARC, URL sandbox, email quarantine.', answer: '1) Verify email headers (SPF, DKIM, DMARC alignment). 2) Extract URLs/attachments and analyze in isolated sandbox. 3) Check SIEM for other recipients who received or clicked the link. 4) Quarantine message enterprise-wide and block malicious domains.' },
          { question: 'What is the MITRE ATT&CK framework and how is it used in a SOC?', hint: 'Taxonomy of adversary tactics, techniques, and procedures (TTPs).', answer: 'MITRE ATT&CK categorizes real-world cyber adversary behavior into tactics (goals like Initial Access, Persistence) and techniques (methods like Pass-the-Hash). SOCs use it to identify detection coverage gaps and map alerts.' },
          { question: 'What is the difference between a True Positive, False Positive, and False Negative in alerting?', hint: 'Alert accuracy and silent compromises.', answer: 'True Positive: alert fires on real attack. False Positive: alert fires on benign activity. False Negative: attack occurs but no alert fires (the most dangerous failure mode).' },
          { question: 'How do you differentiate between benign administrative PowerShell usage and malicious fileless execution?', hint: 'Encoded commands (-enc), download cradles (IEX, WebClient), execution policy bypass.', answer: 'Look for Base64 encoded commands (-enc), web download cradles (Invoke-WebRequest, IEX), execution policy bypass flags (-ep bypass), and execution from unusual directories like AppData or Temp.' },
          { question: 'What is the role of an EDR (Endpoint Detection and Response) agent compared to traditional antivirus?', hint: 'Continuous telemetry recording and behavioral analysis vs signature scanning.', answer: 'Antivirus relies on known file hash signatures and static heuristics. EDR continuously records kernel-level process creation, network connections, and registry modifications, detecting novel behavioral anomalies in real-time.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Authored 10 production Splunk SPL queries detecting attack techniques' },
          { id: 'c2', text: 'Correlated Windows Event IDs 4625 with Sysmon process lineage' },
          { id: 'c3', text: 'Mapped detection rules to MITRE ATT&CK technique IDs' }
        ]
      },
      {
        id: 'node-sec-cert',
        title: 'CompTIA Security+ or CySA+ Certification',
        type: 'cert',
        phase: 4,
        phaseName: 'Projects and Credentials',
        hours: 35,
        xp: 300,
        summary: 'Industry-standard baseline verification covering enterprise risk management, cryptographic concepts, identity management, and threat vectors.',
        whyItMatters: 'Security+ is DoD 8570 compliant and standard requirement for junior SOC analyst positions.',
        prerequisites: ['node-sec-siem'],
        stepByStepPlan: ['Review 5 domains: Threats/Attacks, Architecture, Implementation, Operations, Governance', 'Simulate PBQs (Performance-Based Questions) configuring ACLs and firewalls', 'Complete 5 timed full-length practice exams scoring >85%', 'Schedule and pass the official CompTIA exam'],
        weekendProject: {
          title: 'CompTIA Security+ Exam Simulation Lab',
          description: 'A comprehensive timed exam simulation testing PBQs, subnetting, attack identification, and regulatory compliance.',
          features: ['50 interactive practice questions', 'PBQ firewall rule configuration simulator', 'Detailed answer breakdown']
        },
        resources: [
          { title: 'CompTIA Security+ SY0-701 Objectives', type: 'Exam Guide', url: 'https://comptia.org', provider: 'CompTIA', free: true }
        ],
        githubRepos: [{ name: 'awesome-cybersecurity', description: 'Curated list of cybersecurity resources', stars: '16k' }],
        interviewQuestions: [
          { question: 'What are the three pillars of the CIA Triad?', hint: 'Confidentiality, Integrity, Availability.', answer: 'Confidentiality: unauthorized access is prevented (encryption, access controls). Integrity: data cannot be modified undetected (hashing, digital signatures). Availability: systems remain accessible to authorized users (redundancy, DDoS defense).' },
          { question: 'Explain how Zero Trust architecture fundamentally differs from traditional perimeter security.', hint: '"Never trust, always verify" vs castle-and-moat.', answer: 'Perimeter security assumes anyone inside the corporate network is trustworthy. Zero Trust assumes the internal network is already compromised, continuously verifying identity, device health, and context for every request.' },
          { question: 'What is the difference between Vulnerability Scanning and Penetration Testing?', hint: 'Automated identification vs manual exploitation and business impact proof.', answer: 'Vulnerability scanning is an automated scan identifying potential unpatched CVEs and misconfigurations. Penetration testing is active, authorized human simulation exploiting weaknesses to prove real compromise depth.' },
          { question: 'What is the purpose of a Honeypot in enterprise defense?', hint: 'Decoy system with no legitimate business purpose.', answer: 'A honeypot is an intentionally vulnerable decoy asset. Because legitimate users have no reason to access it, any connection attempt immediately signals unauthorized scanning or active intrusion.' },
          { question: 'Explain the difference between RTO (Recovery Time Objective) and RPO (Recovery Point Objective).', hint: 'Maximum acceptable downtime vs maximum acceptable data loss.', answer: 'RTO is the maximum acceptable duration of system downtime after an outage before recovery. RPO is the maximum acceptable age of data files that must be recovered (data loss threshold).' },
          { question: 'What is the difference between RADIUS and TACACS+ in network access control?', hint: 'UDP vs TCP, encrypting password only vs full payload encryption.', answer: 'RADIUS uses UDP and only encrypts the password. TACACS+ uses TCP and encrypts the entire communication payload while separating authentication, authorization, and accounting (AAA) commands.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Achieved 85%+ on three timed CompTIA Security+ mock exams' },
          { id: 'c2', text: 'Mastered Performance-Based Questions (PBQs) for firewall rules' },
          { id: 'c3', text: 'Obtained official CompTIA Security+ credential' }
        ]
      },
      {
        id: 'node-sec-target',
        title: 'Cybersecurity Analyst at Top Defense Firm',
        type: 'target',
        phase: 5,
        phaseName: 'Target Dream Job',
        isTarget: true,
        hours: 0,
        xp: 1000,
        summary: 'Target Career Goal: Defend enterprise digital infrastructure, investigate advanced persistent threats (APTs), and safeguard critical systems.',
        whyItMatters: 'Reverse-engineering complete! You are ready to protect mission-critical operations on the cybersecurity front line.',
        prerequisites: ['node-sec-cert'],
        stepByStepPlan: ['Lead Tier 1/2 SOC incident response triage and containment', 'Perform deep forensic artifact analysis on compromised endpoints', 'Author threat intelligence briefs on emerging ransomware campaigns', 'Maintain enterprise cyber defense readiness'],
        weekendProject: {
          title: 'SOC Incident Report & Forensic Case File',
          description: 'A complete professional Incident Response post-mortem report documenting a simulated ransomware intrusion from patient zero to containment.',
          features: ['Executive summary and technical timeline', 'Root cause vulnerability and remediation steps', 'IoCs (Indicators of Compromise) listed with SHA256 hashes']
        },
        resources: [
          { title: 'SANS Reading Room', type: 'Research Papers', url: 'https://sans.org/white-papers', provider: 'SANS Institute', free: true }
        ],
        githubRepos: [{ name: 'The-DFIR-Report', description: 'Real-world intrusion case studies and forensic walkthroughs', stars: '5.2k' }],
        interviewQuestions: [
          { question: 'Walk me through the 6 phases of the PICERL Incident Response Lifecycle.', hint: 'Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.', answer: '1) Preparation (tools and policies). 2) Identification (detecting and confirming the breach). 3) Containment (isolating affected systems). 4) Eradication (removing malware/backdoors). 5) Recovery (restoring from clean backups). 6) Lessons Learned (post-incident report and hardening).' },
          { question: 'If you discover an active ransomware infection on an enterprise workstation, what is your immediate first step?', hint: 'Isolate the machine from the network immediately.', answer: 'Immediately isolate the endpoint from the network (unplug ethernet or disconnect Wi-Fi, or trigger EDR network isolation) to prevent lateral spread to network shares, while keeping power on to preserve volatile RAM memory for forensics.' },
          { question: 'What is the difference between IoCs (Indicators of Compromise) and IoAs (Indicators of Attack)?', hint: 'Forensic evidence left behind (hashes, IPs) vs active behavioral intent in progress.', answer: 'IoCs are evidence of past intrusions (known file hashes, C2 IP addresses). IoAs focus on real-time intent and behaviors (e.g. process injection, credential access) regardless of whether the specific malware hash has ever been seen before.' },
          { question: 'How do you handle alert fatigue in a high-volume Security Operations Center?', hint: 'Tuning false positives, SOAR automation, deduplicating alerts.', answer: 'Tune detection rules to filter recurring benign noise, implement SOAR (Security Orchestration, Automation, and Response) playbooks for automated low-risk triage, and prioritize alerts by asset criticality.' },
          { question: 'What is Golden Ticket vs Silver Ticket attack in Active Directory Kerberos?', hint: 'Forging TGT using KRBTGT hash vs forging TGS for a specific service.', answer: 'Golden Ticket forges a Ticket Granting Ticket (TGT) using the KRBTGT account hash, giving unrestricted domain-wide admin access. Silver Ticket forges a Ticket Granting Service (TGS) ticket using a specific service machine account hash.' },
          { question: 'Why are you passionate about working as a Cybersecurity Analyst?', hint: 'Asymmetric puzzle-solving, protecting vulnerable people and institutions.', answer: 'Cybersecurity is a dynamic, intellectually demanding discipline with real-world stakes: defending systems against sophisticated adversaries protects hospitals, financial systems, and personal privacy from devastating disruption.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Completed SOC analyst technical screen and triage scenario' },
          { id: 'c2', text: 'Delivered an incident response forensic report case study' },
          { id: 'c3', text: 'Received formal Cybersecurity Analyst employment offer' }
        ]
      }
    ],
    edges: [
      { id: 'e-net-siem', source: 'node-sec-network', target: 'node-sec-siem', animated: true },
      { id: 'e-siem-cert', source: 'node-sec-siem', target: 'node-sec-cert', animated: true },
      { id: 'e-cert-target', source: 'node-sec-cert', target: 'node-sec-target', animated: true }
    ]
  },

  'cloud-engineer-msft': {
    id: 'cloud-engineer-msft',
    goal: 'Cloud Engineer at Microsoft',
    targetCompany: 'Microsoft Azure Core / Cloud + AI',
    industry: 'Enterprise Cloud Infrastructure',
    level: 'Beginner to Job-Ready',
    weeklyHours: 16,
    targetMonths: 6,
    totalHours: 320,
    tags: ['Azure', 'Terraform', 'Kubernetes (AKS)', 'Bicep', 'CI/CD', 'PowerShell'],
    summary: 'Reverse-engineer the path to designing, provisioning, and securing hyper-scale enterprise infrastructure on Microsoft Azure with Terraform and Kubernetes.',
    nodes: [
      {
        id: 'node-azure-foundations',
        title: 'Azure Fundamentals & Core Architecture',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 25,
        xp: 140,
        summary: 'Azure Resource Manager (ARM), Subscriptions, Resource Groups, Azure Virtual Networks (VNet), and Azure Entra ID (Azure AD).',
        whyItMatters: 'Microsoft Azure manages enterprise compute across 60+ global regions. Mastering core resource hierarchies is foundational.',
        prerequisites: [],
        stepByStepPlan: ['Azure tenant, management groups, subscriptions, and resource group hierarchy', 'Azure Virtual Networks: subnets, NSGs, peering, and Azure Bastion', 'Azure Compute: VM sizing, scale sets, and Azure App Service', 'Identity management with Microsoft Entra ID (formerly Azure AD) and RBAC'],
        weekendProject: {
          title: 'Multi-Tier Secure Azure Virtual Network Architecture',
          description: 'Deploy a segmented Azure VNet with public web subnet, private application subnet, and secured database subnet with NSG rules.',
          features: ['Segmented Azure subnets with custom Route Tables', 'Network Security Groups with least privilege rules', 'Azure Bastion secure host access']
        },
        resources: [
          { title: 'Microsoft Learn: Azure Fundamentals (AZ-900)', type: 'Course', url: 'https://learn.microsoft.com', provider: 'Microsoft', free: true }
        ],
        githubRepos: [{ name: 'azure-quickstart-templates', description: 'Azure Resource Manager templates', stars: '13k' }],
        interviewQuestions: [
          { question: 'What is Azure Resource Manager (ARM) and what are its key benefits?', hint: 'Declarative deployment, consistent management layer across portal, CLI, SDK.', answer: 'ARM is the management layer for Azure. It enables deploying, managing, and monitoring resources as a group declaratively, enforcing tags, role-based access control (RBAC), and dependency orchestration.' },
          { question: 'Explain the difference between an Azure Availability Set, Availability Zone, and Region.', hint: 'Single datacenter fault domains vs separate physical datacenters with independent power/cooling.', answer: 'Availability Sets protect against hardware failures inside a single datacenter using Fault/Update domains. Availability Zones are physically separate datacenters within a region with independent power and cooling. A Region is a geographical area.' },
          { question: 'How does VNet Peering work in Azure and does it traverse the public internet?', hint: 'Private Microsoft global backbone network.', answer: 'VNet Peering connects two Azure Virtual Networks with high bandwidth and low latency. Traffic travels entirely across Microsoft\'s private global backbone network, never traversing the public internet.' },
          { question: 'What is Microsoft Entra ID (Azure AD) and how does it differ from on-premises Active Directory?', hint: 'Cloud identity provider using REST/OAuth/SAML vs Kerberos/LDAP domain controllers.', answer: 'On-prem AD uses Kerberos, NTLM, and LDAP for domain-joined machine administration. Entra ID is a cloud-based identity and access management service utilizing modern web protocols (OAuth 2.0, OpenID Connect, SAML) for cloud and SaaS applications.' },
          { question: 'What is Azure RBAC and how does permission inheritance flow?', hint: 'Management Group -> Subscription -> Resource Group -> Resource.', answer: 'Role-Based Access Control assigns permissions (Owner, Contributor, Reader, or Custom) to security principals. Permissions inherit downward: Management Group down to Subscriptions, Resource Groups, and individual Resources.' },
          { question: 'What is Azure Blob Storage and what are the three storage access tiers?', hint: 'Hot, Cool, and Archive tiers.', answer: 'Blob storage is scalable object storage. Hot tier: frequently accessed data (lower access cost, higher storage cost). Cool tier: infrequently accessed (lower storage, higher access cost). Archive tier: long-term cold backup (lowest storage, hours retrieval).' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Created Azure Resource Groups with tags and budget alerts' },
          { id: 'c2', text: 'Configured secure VNet with Network Security Group rules' },
          { id: 'c3', text: 'Assigned RBAC roles following least-privilege principles' }
        ]
      },
      {
        id: 'node-azure-iac',
        title: 'Infrastructure as Code: Terraform & Azure Bicep',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 45,
        xp: 260,
        summary: 'Terraform HCL, state management, remote backends in Azure Blob, modules, and Azure Bicep domain-specific language.',
        whyItMatters: 'Manual provisioning in cloud consoles is strictly forbidden at enterprise scale. All infrastructure must be declarative code.',
        prerequisites: ['node-azure-foundations'],
        stepByStepPlan: ['Terraform workflow: init, plan, apply, destroy, and state file locking', 'Configuring remote state storage in Azure Blob with Azure Key Vault secrets', 'Building reusable, versioned Terraform modules for enterprise landing zones', 'Writing native Azure Bicep templates with parameter files'],
        weekendProject: {
          title: 'Automated Enterprise Azure Landing Zone with Terraform',
          description: 'A modular Terraform repository provisioning a complete enterprise environment (VNet, App Service, Azure SQL, Key Vault) with zero manual clicks.',
          features: ['Remote state locking with Azure Blob and Key Vault', 'Modularized compute, network, and database resources', 'Automated terraform plan output in GitHub Actions PR']
        },
        resources: [
          { title: 'HashiCorp Terraform Associate Tutorials', type: 'Course', url: 'https://developer.hashicorp.com', provider: 'HashiCorp', free: true },
          { title: 'Azure Bicep Documentation', type: 'Docs', url: 'https://learn.microsoft.com', provider: 'Microsoft', free: true }
        ],
        githubRepos: [{ name: 'terraform-provider-azurerm', description: 'Terraform provider for Azure Resource Manager', stars: '4.8k' }],
        interviewQuestions: [
          { question: 'What is the purpose of the Terraform state file and why must it be secured remotely?', hint: 'Mapping declared resources to real cloud IDs; sensitive plaintext secrets in state.', answer: 'The state file maps declared HCL configuration to real cloud resource IDs and attributes. It must be stored remotely (Azure Blob with state locking) so teams don\'t collide, and encrypted because it may store plaintext secrets.' },
          { question: 'What is the difference between terraform plan and terraform apply?', hint: 'Dry-run execution preview vs executing real cloud API mutations.', answer: 'terraform plan performs a read-only dry run comparing local configuration to current cloud state, calculating the exact diff (to add, change, destroy). terraform apply executes those mutations against cloud provider APIs.' },
          { question: 'How do you handle state drift in Terraform?', hint: 'Manual changes made in the Azure portal outside of Terraform.', answer: 'Run terraform plan or terraform refresh to detect differences between actual cloud infrastructure and the state file. Update the HCL code to match, or run terraform apply to overwrite manual console modifications back to code standards.' },
          { question: 'What are Terraform Modules and why are they vital in enterprise infrastructure?', hint: 'Encapsulating reusable, standardized infrastructure patterns.', answer: 'Modules are self-contained packages of Terraform configurations. They enforce organization-wide security baselines (like approved naming, mandated encryption, monitoring tags) across hundreds of development teams.' },
          { question: 'How does Azure Bicep compare to Terraform?', hint: 'Native first-party DSL for Azure with immediate day-zero resource support vs multi-cloud provider ecosystem.', answer: 'Bicep is Microsoft\'s native DSL transpiling directly to ARM JSON. It provides immediate day-zero support for new Azure features without waiting for provider releases. Terraform is multi-cloud and manages state explicitly.' },
          { question: 'How do you prevent accidental deletion of critical cloud production databases in Terraform?', hint: 'lifecycle { prevent_destroy = true } and resource locks.', answer: 'Add lifecycle { prevent_destroy = true } inside the resource block in HCL, and configure Azure Resource Locks (CanNotDelete) at the resource group level.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Configured Terraform remote state backend on Azure Blob' },
          { id: 'c2', text: 'Built reusable Terraform module for Azure App Services' },
          { id: 'c3', text: 'Provisioned multi-resource environment through GitHub Actions CI' }
        ]
      },
      {
        id: 'node-azure-aks',
        title: 'Kubernetes on Azure (AKS) & Cloud Microservices',
        type: 'project',
        phase: 3,
        phaseName: 'Advanced Skills',
        hours: 50,
        xp: 320,
        summary: 'Azure Kubernetes Service (AKS), pods, deployments, services, ingress controllers, Helm charts, and Azure Container Registry (ACR).',
        whyItMatters: 'Microsoft Azure Core engineering builds and operates massive container orchestration services running world-scale workloads.',
        prerequisites: ['node-azure-iac'],
        stepByStepPlan: ['Provision AKS clusters with Terraform and Azure CNI networking', 'Deploy containerized apps using Kubernetes manifests (Deployment, Service, ConfigMap)', 'Configure Azure Ingress Controller, cert-manager SSL, and horizontal pod autoscalers (HPA)', 'Package and deploy microservices with Helm 3 charts'],
        weekendProject: {
          title: 'Resilient Microservice Cluster on Azure AKS',
          description: 'Deploy a multi-node Azure Kubernetes Service cluster with auto-scaling, Azure Key Vault Secrets Store CSI driver, and Prometheus monitoring.',
          features: ['Horizontal Pod Autoscaler (HPA) responding to traffic load', 'Azure Key Vault integration with CSI driver', 'Ingress-NGINX with automated Let\'s Encrypt TLS certificates']
        },
        resources: [
          { title: 'Kubernetes Official Documentation', type: 'Docs', url: 'https://kubernetes.io/docs', provider: 'CNCF', free: true }
        ],
        githubRepos: [{ name: 'kubernetes/kubernetes', description: 'Production-Grade Container Scheduling and Management', stars: '110k' }],
        interviewQuestions: [
          { question: 'Explain the difference between a Kubernetes Pod, Deployment, and Service.', hint: 'Smallest deployable unit vs declarative replica manager vs persistent network endpoint.', answer: 'A Pod is the smallest execution unit running one or more containers. A Deployment declaratively manages replica sets, rolling updates, and self-healing. A Service provides a stable IP and DNS endpoint to load balance traffic across pods.' },
          { question: 'How does Horizontal Pod Autoscaler (HPA) determine when to scale replicas in Kubernetes?', hint: 'Metrics-server querying target CPU/Memory thresholds or custom metrics.', answer: 'HPA queries metrics-server periodically (e.g. every 15s). If average CPU or memory utilization exceeds the target threshold (e.g. 75%), it calculates desired replicas = ceil(currentReplicas * (currentMetric / targetMetric)) and updates the Deployment.' },
          { question: 'What is the difference between Azure CNI and Kubenet networking in AKS?', hint: 'Every pod gets a real VNet IP address vs NAT overlay network.', answer: 'With Kubenet, pods receive IP addresses from a private NAT internal address space (conserves VNet IPs). With Azure CNI, every pod receives a native IP address directly from the Azure VNet subnet, enabling direct VNet communication.' },
          { question: 'How do you safely expose secrets from Azure Key Vault to pods running in AKS?', hint: 'Azure Key Vault Secrets Store CSI Driver with Workload Identity.', answer: 'Use the Secrets Store CSI Driver paired with Azure Workload Identity. It mounts secrets as files into the pod directly from Key Vault in memory without storing secrets as unencrypted Kubernetes base64 objects.' },
          { question: 'What is a Kubernetes Rolling Update vs Blue/Green deployment?', hint: 'Gradual incremental pod replacement vs deploying an entire duplicate parallel environment.', answer: 'Rolling update incrementally replaces old pods with new pods with zero downtime, but runs both versions simultaneously. Blue/Green runs new version (Green) alongside old version (Blue) and switches ingress traffic atomically.' },
          { question: 'How does readinessProbe differ from livenessProbe in Kubernetes?', hint: 'Ready to receive network traffic vs healthy and should not be restarted.', answer: 'livenessProbe checks if the container is alive; if it fails, kubelet kills and restarts the container. readinessProbe checks if the container is ready to accept user traffic; if it fails, the pod is temporarily removed from Service load balancers without restarting.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Provisioned production-grade AKS cluster with Terraform' },
          { id: 'c2', text: 'Deployed multi-container app with Helm chart' },
          { id: 'c3', text: 'Demonstrated horizontal pod autoscaling under load test' }
        ]
      },
      {
        id: 'node-azure-target',
        title: 'Cloud Engineer at Microsoft',
        type: 'target',
        phase: 5,
        phaseName: 'Target Dream Job',
        isTarget: true,
        hours: 0,
        xp: 1000,
        summary: 'Target Career Goal: Architect enterprise cloud infrastructure, drive Azure Kubernetes adoption, and empower millions of global Microsoft customers.',
        whyItMatters: 'Reverse-engineering complete! You are prepared to join Microsoft Azure Core engineering.',
        prerequisites: ['node-azure-aks'],
        stepByStepPlan: ['Design high-availability multi-region enterprise cloud architectures', 'Champion Infrastructure as Code, automation, and DevSecOps pipelines', 'Collaborate with Azure product groups on platform reliability and scalability', 'Deliver world-class cloud engineering solutions'],
        weekendProject: {
          title: 'Microsoft Azure Architecture Design Masterclass',
          description: 'A comprehensive Well-Architected Framework review of a global multi-region Azure deployment with disaster recovery RTO < 15 min.',
          features: ['Azure Front Door global load balancing', 'Active-active multi-region failover diagram', 'FinOps cost optimization audit plan']
        },
        resources: [
          { title: 'Microsoft Azure Well-Architected Framework', type: 'Architecture Guide', url: 'https://learn.microsoft.com', provider: 'Microsoft', free: true }
        ],
        githubRepos: [{ name: 'mspnp/architecture-center', description: 'Microsoft Azure Architecture Center guidance and reference architectures', stars: '4.5k' }],
        interviewQuestions: [
          { question: 'Walk me through the five pillars of the Microsoft Azure Well-Architected Framework.', hint: 'Reliability, Security, Cost Optimization, Operational Excellence, Performance Efficiency.', answer: '1) Reliability (self-healing, multi-zone/region redundancy). 2) Security (Zero Trust, least privilege, encryption at rest/transit). 3) Cost Optimization (right-sizing, reserved instances). 4) Operational Excellence (IaC, observability). 5) Performance Efficiency (autoscaling, caching).' },
          { question: 'Design a globally distributed, highly available web service in Azure that tolerates an entire region outage.', hint: 'Azure Front Door, paired regions, geo-replicated databases, Cosmos DB.', answer: 'Deploy identical AKS or App Service clusters in paired regions (e.g. East US 2 and Central US). Place Azure Front Door at the edge for global traffic routing with instant health-probe failover. Use Azure Cosmos DB with multi-region write or Azure SQL with active geo-replication.' },
          { question: 'What is FinOps and how would you optimize cloud spend for an over-budget Azure subscription?', hint: 'Tagging audit, identifying orphaned disks, reserved instances, auto-shutdown.', answer: 'Enforce mandatory cost-center tagging with Azure Policy. Audit and terminate unattached disks and unused Public IPs. Right-size underutilized VMs using Azure Advisor metrics, and purchase 1-3 year Reserved Instances or Savings Plans for predictable workloads.' },
          { question: 'How do you implement GitOps for Kubernetes cluster configuration using tools like ArgoCD or Flux?', hint: 'Git as single source of truth, automated continuous reconciliation.', answer: 'Git acts as the single source of truth for all Kubernetes manifests. An agent inside the cluster (ArgoCD) continuously monitors the Git repository and automatically reconciles real cluster state to match Git commits, eliminating manual kubectl access.' },
          { question: 'What was a difficult technical challenge you solved when designing cloud infrastructure?', hint: 'Root cause analysis, balancing security vs developer velocity, measurable metrics.', answer: 'Describe an authentic scenario: a complex networking issue (e.g. overlapping IP subnets), how you solved it with private endpoints or transit VNets, and how you codified it into reusable Terraform modules.' },
          { question: 'Why Microsoft Azure over AWS or Google Cloud?', hint: 'Enterprise hybrid cloud footprint, developer ecosystem (GitHub, VS Code), enterprise AI leadership.', answer: 'Microsoft provides the premier hybrid enterprise platform, seamlessly integrating Windows/Linux workloads, GitHub, and pioneering generative AI infrastructure with OpenAI on Azure.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Completed Microsoft Technical Architecture review loop' },
          { id: 'c2', text: 'Evaluated system against all 5 Well-Architected pillars' },
          { id: 'c3', text: 'Received Cloud Engineer offer letter at Microsoft' }
        ]
      }
    ],
    edges: [
      { id: 'e-az-iac', source: 'node-azure-foundations', target: 'node-azure-iac', animated: true },
      { id: 'e-iac-aks', source: 'node-azure-iac', target: 'node-azure-aks', animated: true },
      { id: 'e-aks-target', source: 'node-azure-aks', target: 'node-azure-target', animated: true }
    ]
  },

  'uiux-product': {
    id: 'uiux-product',
    goal: 'UI/UX Designer at a Product-Based Company',
    targetCompany: 'Figma / Linear / Notion / Airbnb',
    industry: 'Product Design & Creative Systems',
    level: 'Beginner to Job-Ready',
    weeklyHours: 14,
    targetMonths: 6,
    totalHours: 280,
    tags: ['Figma', 'Design Systems', 'Micro-Interactions', 'User Research', 'Prototyping', 'Accessibility'],
    summary: 'Master crafting world-class digital experiences, scalable design systems, typography hierarchy, high-fidelity interactive Figma prototypes, and user research frameworks.',
    nodes: [
      {
        id: 'node-design-foundations',
        title: 'Design Fundamentals & Figma Mastery',
        type: 'skill',
        phase: 1,
        phaseName: 'Foundations',
        hours: 30,
        xp: 150,
        summary: 'Visual hierarchy, typography scales, 8pt grid systems, color theory, Auto Layout 5.0, and component variants in Figma.',
        whyItMatters: 'Top product companies like Linear and Figma expect pixel-perfect craft and fluent design tool mechanics.',
        prerequisites: [],
        stepByStepPlan: ['Typography scales: line height, letter spacing, font pairings', 'Color systems: HSL lightness tokens, contrast ratios (WCAG AAA)', 'Master Figma Auto Layout: min/max widths, hugging, filling, absolute positioning', 'Component properties, boolean toggles, and nested variant state management'],
        weekendProject: {
          title: 'Design System Foundation Kit in Figma',
          description: 'A comprehensive starter kit with typography tokens, semantic color palette (light/dark mode), and a 20-component responsive button and input library.',
          features: ['Figma variables for color, spacing, and corner radius', 'Auto Layout components with interactive hover/active states', 'WCAG 2.1 AA accessible contrast documentation']
        },
        resources: [
          { title: 'Refactoring UI by Adam Wathan & Steve Schoger', type: 'Book', url: 'https://refactoringui.com', provider: 'Tailwind Team', free: false },
          { title: 'Figma Community Design System Files', type: 'Templates', url: 'https://figma.com/@community', provider: 'Figma', free: true }
        ],
        githubRepos: [{ name: 'feather', description: 'Simply beautiful open source icons', stars: '23k' }],
        interviewQuestions: [
          { question: 'What is the 8pt grid system and why is it standard in modern UI design?', hint: 'Scalability across screen densities and clean integer division.', answer: 'The 8pt grid uses multiples of 8 (8, 16, 24, 32, 48...) for spacing, padding, and layout dimensions. Most display screen resolutions divide cleanly by 8 (and half-grid 4), ensuring crisp pixel alignment without sub-pixel blurring.' },
          { question: 'How do you design a color palette that supports seamless dark and light modes?', hint: 'Semantic color tokens (surface, text-primary, accent) rather than hardcoded hex values.', answer: 'Use semantic design tokens (e.g. background-surface-primary, text-primary, border-subtle) mapped to different raw hex values in light and dark modes. Ensure dark mode uses dark navy/slate (#0d1322) rather than pure black (#000) for reduced eye strain.' },
          { question: 'What is visual hierarchy and what are the primary levers used to establish it?', hint: 'Size, weight, contrast, color, whitespace, and position.', answer: 'Visual hierarchy guides the viewer\'s eye to information in order of importance. Designers use scale (large headlines), weight (bold vs light), color/contrast (high-contrast black vs muted gray), and whitespace separation.' },
          { question: 'What is the difference between leading (line-height) and tracking (letter-spacing)?', hint: 'Vertical distance between lines vs horizontal space between characters.', answer: 'Leading is vertical spacing between baseline rows of text (typically 130-150% for body copy). Tracking adjusts uniform horizontal spacing between characters across a block of text (tightened for large headlines, expanded for all-caps labels).' },
          { question: 'How do Figma Variables differ from traditional Figma Component Variants?', hint: 'Dynamic values (color, spacing, mode switching) vs physical visual component permutations.', answer: 'Variants manage visual component states (Button: primary, secondary, disabled). Variables store dynamic data tokens (color, spacing, strings, numbers) that can instantly switch an entire page from light to dark or English to German.' },
          { question: 'What are micro-interactions and why are they critical in product UX?', hint: 'Subtle functional animations providing feedback for user actions.', answer: 'Micro-interactions (button press scaling, toggle switch glide, pull-to-refresh bounce) acknowledge user input, confirm system status, and infuse delightful emotional polish that makes software feel responsive and alive.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Built a multi-mode Figma token system with variables' },
          { id: 'c2', text: 'Created responsive Auto Layout components with state variants' },
          { id: 'c3', text: 'Verified color contrast ratios comply with WCAG 2.1 AA' }
        ]
      },
      {
        id: 'node-ux-research',
        title: 'User Research, Wireframing & Usability Testing',
        type: 'skill',
        phase: 2,
        phaseName: 'Core Development',
        hours: 40,
        xp: 220,
        summary: 'User interviews, jobs-to-be-done (JTBD), empathy maps, information architecture, low-fi wireframing, and unmoderated usability tests.',
        whyItMatters: 'Beautiful visual design without deep user research results in products that fail to solve real problems.',
        prerequisites: ['node-design-foundations'],
        stepByStepPlan: ['Conduct 5 semi-structured user interviews exploring user workflows and pain points', 'Synthesize research into Jobs-to-be-Done (JTBD) and journey maps', 'Architect intuitive Information Architecture with card sorting', 'Create low-fidelity wireframes and run usability tests on Maze / UserTesting'],
        weekendProject: {
          title: 'SaaS Onboarding Flow Redesign & Usability Report',
          description: 'Identify UX friction in a complex B2B SaaS onboarding flow, design an improved low-fi flow, and validate with 5 real user tests.',
          features: ['JTBD customer journey map', 'Low-fidelity wireframe clickable prototype', 'Quantitative usability task completion metrics report']
        },
        resources: [
          { title: 'The Design of Everyday Things by Don Norman', type: 'Book', url: 'https://jnd.org', provider: 'Don Norman', free: false },
          { title: 'Nielsen Norman Group UX Articles', type: 'Resource Portal', url: 'https://nngroup.com', provider: 'NN/g', free: true }
        ],
        githubRepos: [{ name: 'lawsofux', description: 'Collection of best practices that designers consider when building UIs', stars: '10k' }],
        interviewQuestions: [
          { question: 'What is Hick\'s Law and how does it influence checkout and navigation design?', hint: 'Decision time increases logarithmically with number and complexity of choices.', answer: 'Hick\'s Law states that decision time increases with the number of options. Designers simplify complex workflows (like checkout) by breaking them into multi-step wizards or highlighting one recommended default choice.' },
          { question: 'What is the Jobs-To-Be-Done (JTBD) framework and how does it improve on traditional personas?', hint: 'Focusing on the underlying progress a user is trying to achieve rather than demographic traits.', answer: 'Traditional personas focus on superficial demographics (e.g. "Sarah, 32, dog owner"). JTBD focuses on functional, emotional, and social outcomes: "When I [situation], I want to [motivation], so I can [expected outcome]."' },
          { question: 'How do you conduct an effective, unbiased user interview?', hint: 'Open-ended questions, asking about past behavior rather than hypothetical future preferences.', answer: 'Ask open-ended questions about concrete past experiences ("Tell me about the last time you tried to export a report") rather than hypothetical opinions ("Would you use this feature?"). Listen actively and embrace silence.' },
          { question: 'What is Jakob\'s Law of Internet User Experience?', hint: 'Users spend most of their time on other websites, so they expect your site to work the same way.', answer: 'Users bring familiar mental models from other software they use every day. Deviating from standard conventions (like cart icons, search bars, navbars) increases cognitive friction.' },
          { question: 'What is the difference between qualitative and quantitative UX research?', hint: 'Understanding the "why" vs measuring the "what" and "how many".', answer: 'Qualitative research (interviews, usability observations) reveals why users struggle and exposes mental models. Quantitative research (analytics, A/B test conversion, survey ratings) measures how many users take action.' },
          { question: 'How do you resolve a design impasse when a Product Manager or Engineer disagrees with your UX proposal?', hint: 'Align on user goals, build quick prototypes to test with users, review business trade-offs.', answer: 'Avoid subjective debates. Return to the core user objective and business constraints. Propose running a quick 3-user usability test or launching an A/B test to let real user behavior decide.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Conducted user interviews and synthesized a Journey Map' },
          { id: 'c2', text: 'Executed an unmoderated usability study with recorded task success rates' },
          { id: 'c3', text: 'Documented UX recommendations backed by qualitative quotes' }
        ]
      },
      {
        id: 'node-design-portfolio',
        title: 'High-Fidelity Product Design Case Study',
        type: 'project',
        phase: 4,
        phaseName: 'Projects and Credentials',
        hours: 50,
        xp: 400,
        summary: 'Author an in-depth case study for an innovative B2B productivity app featuring custom design systems, interactive prototypes, and usability testing.',
        whyItMatters: 'Product design hiring committees hire solely based on the depth, craft, and rationale demonstrated in portfolio case studies.',
        prerequisites: ['node-ux-research'],
        stepByStepPlan: ['Select an ambitious product problem (e.g. AI-driven collaborative research canvas)', 'Document the messy middle: early sketches, failed experiments, and pivot rationale', 'Design high-fidelity desktop and mobile screens with micro-interactions', 'Build interactive Figma prototype with Smart Animate and video walkthrough'],
        weekendProject: {
          title: 'Chronos: High-Fidelity B2B Workflow Case Study',
          description: 'A comprehensive, interactive case study documenting the end-to-end design of an AI-assisted project management workspace.',
          features: ['Interactive Figma Smart Animate prototype', 'Deep dive on design token system and component library', 'Business metrics and usability validation data']
        },
        resources: [
          { title: 'Best Product Design Portfolios Showcase', type: 'Inspiration', url: 'https://cofolios.com', provider: 'Cofolios', free: true }
        ],
        githubRepos: [{ name: 'framer-motion', description: 'Production-ready animation library for React', stars: '24k' }],
        interviewQuestions: [
          { question: 'Walk me through a case study where you had to compromise on your ideal design due to engineering constraints.', hint: 'Pragmatic collaboration, phase 1 vs phase 2 rollout, maintaining core UX integrity.', answer: 'Describe the original vision, the technical performance or timeline limitation raised by engineers, how you collaboratively ideated an alternative V1 solution that preserved core usability, and the plan for V2.' },
          { question: 'How do you design for accessibility (a11y) from day one rather than retrofitting it at the end?', hint: 'Color contrast tokens, keyboard navigation order, screen reader states, touch targets.', answer: 'Embed accessibility into token definitions: all text tokens meet 4.5:1 contrast, interactive elements have minimum 44x44px touch targets, specify focus outline states, and design explicit empty/error states.' },
          { question: 'What is Fitts\'s Law and how do you apply it to mobile and desktop interfaces?', hint: 'Target acquisition time is a function of distance to target and size of target.', answer: 'Larger and closer targets are easier to hit. On mobile, place primary actions in the thumb-friendly bottom zone; on desktop, pin actions to screen edges where the cursor naturally stops.' },
          { question: 'How do you organize design files and handoff specs so engineers love working with you?', hint: 'Figma Dev Mode, explicit component variants, spacing tokens, responsive constraints.', answer: 'Use Figma Dev Mode, document edge cases (loading, empty, error, character overflow), use semantic variables matching CSS tokens, and hold synchronous handoff walkthroughs before development.' },
          { question: 'What makes the design of tools like Linear or Notion feel exceptionally premium and fast?', hint: 'Information density, keyboard shortcuts, subtle 1px borders, snappiness, muted palettes.', answer: 'Disciplined restraint: high information density without clutter, keyboard-first navigation, subtle 1px translucent borders, snappy 150-200ms ease-out transitions, and prioritizing content over decorative fluff.' },
          { question: 'How do you handle negative feedback during a company-wide design critique?', hint: 'Detach ego from the work, understand underlying concerns, ask clarifying questions.', answer: 'Feedback targets the solution, not the designer. Listen without defensiveness, probe for the underlying concern ("What risk do you foresee with this button placement?"), and synthesize takeaways collaboratively.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Live interactive case study with problem, process, and solution' },
          { id: 'c2', text: 'Clickable high-fidelity Figma prototype using Smart Animate' },
          { id: 'c3', text: 'Detailed documentation of design system component library' }
        ]
      },
      {
        id: 'node-uiux-target',
        title: 'UI/UX Designer at Product Company',
        type: 'target',
        phase: 5,
        phaseName: 'Target Dream Job',
        isTarget: true,
        hours: 0,
        xp: 1000,
        summary: 'Target Career Goal: Lead visual product design, establish design systems, and craft intuitive software experiences for world-class products.',
        whyItMatters: 'Reverse-engineering complete! You are ready to shape the future of modern digital product experiences.',
        prerequisites: ['node-design-portfolio'],
        stepByStepPlan: ['Lead end-to-end product design across complex features', 'Partner closely with Product Management and Engineering leadership', 'Conduct generative user research and prototype frontier interfaces', 'Champion design craft and visual excellence across the entire company'],
        weekendProject: {
          title: 'Product Design Interview Presentation Deck',
          description: 'A 45-minute interactive presentation deck showcasing your design philosophy, case study walkthrough, and vision for the target company.',
          features: ['Case study walkthrough with interactive prototype video', 'Past design failures and learnings retrospective', 'First 90 days product design roadmap']
        },
        resources: [
          { title: 'Figma Config Keynotes', type: 'Conference Talks', url: 'https://config.figma.com', provider: 'Figma', free: true }
        ],
        githubRepos: [{ name: 'design-systems-repo', description: 'Collection of design systems and pattern libraries', stars: '6.5k' }],
        interviewQuestions: [
          { question: 'Why do you want to join our design team specifically?', hint: 'Connect your personal design values with their product aesthetic, craft standards, and customer culture.', answer: 'Articulate admiration for their specific product craft (e.g. attention to detail, keyboard accessibility, clean information hierarchy) and how your skills can elevate their product vision.' },
          { question: 'How do you measure the success of a design after it has been shipped to production?', hint: 'Quantitative product metrics (activation, retention, drop-off) and qualitative user feedback.', answer: 'Track primary funnel metrics (task completion rate, time-to-value, conversion), monitor support ticket trends for confusion, and conduct post-launch qualitative check-ins with real users.' },
          { question: 'What is your perspective on AI\'s role in UI/UX design over the coming decade?', hint: 'Automating repetitive production tasks, enabling generative user interfaces that adapt to user context.', answer: 'AI will automate mechanical tasks (generating variants, writing placeholder copy, color token audits), freeing designers to focus on deep problem definition, systems thinking, and adaptive interfaces that morph dynamically to user needs.' },
          { question: 'How do you maintain design consistency across multiple platforms (iOS, Android, Web)?', hint: 'Platform-agnostic design tokens paired with platform-native interaction patterns.', answer: 'Maintain unified design tokens (color, typography scale, brand identity) across all platforms, but respect native conventions (iOS navigation bars vs Android back button and material gestures).' },
          { question: 'Describe your favorite piece of digital software and critique what you would improve.', hint: 'Balanced admiration for product strengths with thoughtful, constructive UX critique.', answer: 'Praise a product you genuinely use daily for its core strength (e.g. speed, minimalism), then thoughtfully analyze one friction point and propose a concrete, realistic UX enhancement.' },
          { question: 'What does "design craft" mean to you personally?', hint: 'Obsession with subtle details, intentionality behind every pixel, empathy for the human user.', answer: 'Craft is the invisible harmony where every pixel, transition, and micro-copy phrase has intentional purpose. It is the refusal to accept mediocre friction because you respect the user\'s time and attention.' }
        ],
        doneWhenChecklist: [
          { id: 'c1', text: 'Presented portfolio case study to design leadership panel' },
          { id: 'c2', text: 'Completed whiteboard design challenge simulation' },
          { id: 'c3', text: 'Received formal UI/UX Product Designer offer letter' }
        ]
      }
    ],
    edges: [
      { id: 'e-figma-ux', source: 'node-design-foundations', target: 'node-ux-research', animated: true },
      { id: 'e-ux-case', source: 'node-ux-research', target: 'node-design-portfolio', animated: true },
      { id: 'e-case-target', source: 'node-design-portfolio', target: 'node-uiux-target', animated: true }
    ]
  }
};
