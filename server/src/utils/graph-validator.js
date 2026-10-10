import { GraphValidationError } from './errors.js';

const ALLOWED_KINDS = new Set(['skill', 'project', 'cert', 'role', 'milestone']);

/**
 * Normalizes a key into a kebab-case identifier
 */
export const normalizeKey = (str) => {
  if (!str) return 'node';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Validates and safely repairs an AI-generated career roadmap graph.
 * Returns the sanitized graph or throws GraphValidationError if irreparable.
 *
 * @param {Object} rawRoadmap
 * @returns {Object} validated and repaired roadmap
 */
export const validateAndRepairGraph = (rawRoadmap) => {
  if (!rawRoadmap || typeof rawRoadmap !== 'object') {
    throw new GraphValidationError('Roadmap data must be a valid JSON object.');
  }

  let nodes = rawRoadmap.nodes;
  if (!Array.isArray(nodes) || nodes.length === 0) {
    throw new GraphValidationError('Roadmap must contain a non-empty array of nodes.');
  }

  // 1. Ensure node IDs are unique and normalize keys/kinds
  const seenIds = new Set();
  const idRemap = new Map();

  nodes = nodes.map((node, index) => {
    let id = String(node.id || `n${index + 1}`).trim();

    if (seenIds.has(id)) {
      // Duplicate ID detected - assign unique deterministic ID
      const newId = `n${index + 1}_${Date.now().toString(36).slice(-4)}`;
      idRemap.set(id, newId);
      id = newId;
    }
    seenIds.add(id);

    // Validate kind
    let kind = String(node.kind || node.type || 'skill').toLowerCase();
    if (!ALLOWED_KINDS.has(kind)) {
      kind = 'skill';
    }

    // Validate hours (non-negative integer)
    let hours = parseInt(node.hours, 10);
    if (isNaN(hours) || hours < 0) {
      hours = 15;
    }

    const key = node.key ? normalizeKey(node.key) : normalizeKey(node.title || id);

    return {
      ...node,
      id,
      key,
      title: node.title || 'Milestone Task',
      kind,
      phase: node.phase || 'Foundations',
      hours,
      summary: node.summary || `Competency focus for ${node.title || 'this role'}.`,
      why: node.why || node.whyItMatters || 'Essential for the target career path.',
      deps: Array.isArray(node.deps) ? node.deps.map(String) : [],
      isTarget: Boolean(node.isTarget)
    };
  });

  const validIdSet = new Set(nodes.map((n) => n.id));

  // 2. Normalize and prune invalid/self dependencies
  nodes = nodes.map((node) => {
    let deps = node.deps
      // map remapped IDs if any
      .map((d) => (idRemap.has(d) ? idRemap.get(d) : d))
      // remove self-dependencies
      .filter((d) => d !== node.id)
      // remove dependencies referencing nonexistent nodes
      .filter((d) => validIdSet.has(d));

    // Deduplicate deps
    deps = Array.from(new Set(deps));

    return { ...node, deps };
  });

  // 3. Ensure exactly one final target node
  let targetNodes = nodes.filter((n) => n.isTarget);

  if (targetNodes.length === 0) {
    // Pick the last node or a role node in the highest phase
    const candidateTarget = nodes.find((n) => n.kind === 'role') || nodes[nodes.length - 1];
    candidateTarget.isTarget = true;
    candidateTarget.kind = 'role';
    targetNodes = [candidateTarget];
  } else if (targetNodes.length > 1) {
    // Keep only the final target node, revert others
    const chosenTarget = targetNodes[targetNodes.length - 1];
    nodes.forEach((n) => {
      if (n.id !== chosenTarget.id) {
        n.isTarget = false;
      }
    });
    targetNodes = [chosenTarget];
  }

  const targetNode = targetNodes[0];

  // 4. Cycle Detection & Repair in Directed Acyclic Graph (DAG)
  // Dependency graph: d -> node means d is a prerequisite of node
  const hasCycle = detectCycle(nodes);
  if (hasCycle) {
    // Attempt safe repair: break the back-edges causing cycles
    const repaired = breakCycles(nodes);
    if (detectCycle(repaired)) {
      throw new GraphValidationError('Roadmap dependency graph contains unresolvable circular dependencies.');
    }
    nodes = repaired;
  }

  // 5. Ensure every roadmap branch reaches the target role
  // Nodes with no outgoing dependents (out-degree 0) that are not the target should connect to the target node
  const dependentsCount = new Map();
  nodes.forEach((n) => dependentsCount.set(n.id, 0));

  nodes.forEach((n) => {
    n.deps.forEach((depId) => {
      dependentsCount.set(depId, (dependentsCount.get(depId) || 0) + 1);
    });
  });

  // Collect leaf nodes that have no dependents and are NOT the target node
  const unlinkedLeafNodes = nodes.filter(
    (n) => n.id !== targetNode.id && dependentsCount.get(n.id) === 0
  );

  // Link dangling leaf nodes into the target node's dependencies
  if (unlinkedLeafNodes.length > 0) {
    const existingTargetDeps = new Set(targetNode.deps);
    unlinkedLeafNodes.forEach((leaf) => {
      if (!existingTargetDeps.has(leaf.id)) {
        targetNode.deps.push(leaf.id);
      }
    });
  }

  // 6. Validate & sanitize career path archetypes references
  let archetypes = Array.isArray(rawRoadmap.careerPaths || rawRoadmap.archetypes)
    ? (rawRoadmap.careerPaths || rawRoadmap.archetypes)
    : [];

  archetypes = archetypes.map((arch, aIdx) => {
    const steps = Array.isArray(arch.steps) ? arch.steps : [];
    const sanitizedSteps = steps.map((step) => {
      let linkedNodeId = step.linkedNodeId;
      if (linkedNodeId && !validIdSet.has(linkedNodeId)) {
        linkedNodeId = null;
      }
      return {
        ...step,
        linkedNodeId
      };
    });

    return {
      id: arch.id || `archetype-${aIdx + 1}`,
      title: arch.title || `Career Archetype ${aIdx + 1}`,
      persona: arch.persona || 'Learner',
      totalDuration: arch.totalDuration || '12-18 Months',
      startingPoint: arch.startingPoint || 'Beginner',
      disclaimer: arch.disclaimer || 'Illustrative archetype based on composite career paths.',
      steps: sanitizedSteps
    };
  });

  // 7. Phase mapping for UI compatibility
  const phaseList = Array.isArray(rawRoadmap.phases) && rawRoadmap.phases.length >= 4
    ? rawRoadmap.phases
    : ['Foundations', 'Core Development', 'Advanced Skills', 'Projects and Credentials', 'Career Entry'];

  const phaseMap = {};
  phaseList.forEach((pName, idx) => {
    phaseMap[pName.toLowerCase()] = idx + 1;
  });

  const enrichedNodes = nodes.map((node) => {
    let numericPhase = 1;
    let stringPhaseName = 'Foundations';

    if (typeof node.phase === 'number') {
      numericPhase = Math.max(1, Math.min(phaseList.length, node.phase));
      stringPhaseName = phaseList[numericPhase - 1] || 'Foundations';
    } else if (typeof node.phase === 'string') {
      stringPhaseName = node.phase;
      numericPhase = phaseMap[node.phase.toLowerCase()] || 1;
    }

    return {
      ...node,
      phase: numericPhase,
      phaseName: stringPhaseName,
      type: node.kind,
      prerequisites: node.deps,
      whyItMatters: node.why,
      xp: (node.hours || 10) * 5,
    };
  });

  // 8. Generate React Flow compatible edges
  const edges = [];
  enrichedNodes.forEach((node) => {
    if (Array.isArray(node.deps)) {
      node.deps.forEach((depId) => {
        edges.push({
          id: `e-${depId}-${node.id}`,
          source: depId,
          target: node.id,
          type: 'smoothstep',
          animated: false,
        });
      });
    }
  });

  // Calculate total hours
  const totalHours = enrichedNodes.reduce((sum, n) => sum + (n.hours || 0), 0);

  return {
    ...rawRoadmap,
    phases: phaseList,
    nodes: enrichedNodes,
    edges,
    totalHours,
    targetNodeId: targetNode.id,
    careerPaths: archetypes
  };
};

/**
 * Detects if a directed graph contains a cycle using DFS (white/gray/black coloring)
 */
function detectCycle(nodes) {
  const adj = new Map();
  nodes.forEach((n) => adj.set(n.id, []));

  // Edge direction: dep -> node (prerequisite unlocks dependent)
  nodes.forEach((n) => {
    n.deps.forEach((depId) => {
      if (adj.has(depId)) {
        adj.get(depId).push(n.id);
      }
    });
  });

  const state = new Map(); // 0 = unvisited, 1 = visiting, 2 = visited

  function dfs(nodeId) {
    state.set(nodeId, 1);

    const neighbors = adj.get(nodeId) || [];
    for (const neighbor of neighbors) {
      const neighborState = state.get(neighbor) || 0;
      if (neighborState === 1) {
        return true; // Cycle detected
      }
      if (neighborState === 0) {
        if (dfs(neighbor)) return true;
      }
    }

    state.set(nodeId, 2);
    return false;
  }

  for (const node of nodes) {
    if ((state.get(node.id) || 0) === 0) {
      if (dfs(node.id)) return true;
    }
  }

  return false;
}

/**
 * Attempts to break cycles by pruning back-edges (edges pointing to nodes in higher or equal topological levels)
 */
function breakCycles(nodes) {
  const nodeIndexMap = new Map();
  nodes.forEach((n, idx) => nodeIndexMap.set(n.id, idx));

  // Prune any dependency where dep appears AFTER or at the same position as the node
  return nodes.map((node) => {
    const nodeIdx = nodeIndexMap.get(node.id);
    const safeDeps = node.deps.filter((depId) => {
      const depIdx = nodeIndexMap.get(depId);
      return depIdx !== undefined && depIdx < nodeIdx;
    });
    return { ...node, deps: safeDeps };
  });
}
