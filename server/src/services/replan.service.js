import { env } from '../config/env.js';
import { cacheService } from './cache.service.js';

export const replanService = {
  /**
   * Recalibrates a career roadmap against updated weekly hours and timeline constraints
   */
  async replan(params) {
    const {
      goal,
      hoursPerWeek,
      monthsAvailable,
      nodes,
      completedNodeIds = [],
      knownNodeIds = [],
    } = params;

    const cacheKey = cacheService.generateKey('replan', {
      goal,
      hoursPerWeek,
      monthsAvailable,
      completedCount: completedNodeIds.length,
      knownCount: knownNodeIds.length,
      nodeCount: nodes.length,
    });

    if (cacheService.has(cacheKey)) {
      return {
        plan: cacheService.get(cacheKey),
        isMock: env.MOCK_AI,
        fromCache: true,
      };
    }

    // 1. Calculate time budget: hoursPerWeek * monthsAvailable * 4.3
    const availableHours = Math.round(hoursPerWeek * monthsAvailable * 4.3 * 10) / 10;

    // 2. Separate completed & known nodes
    const doneSet = new Set([...completedNodeIds, ...knownNodeIds]);

    // 3. Identify pending nodes and calculate required hours
    const pendingNodes = nodes.filter((n) => !doneSet.has(n.id));
    const requiredHours = pendingNodes.reduce((sum, n) => sum + (n.hours || 0), 0);

    const fits = availableHours >= requiredHours;

    // 4. Identify stretch nodes if schedule is tight
    const stretchNodeIds = [];
    const adjustedHours = {};
    let explanation = '';

    if (fits) {
      explanation = `Your timeline of ${monthsAvailable} months at ${hoursPerWeek} hrs/week provides ${availableHours} hours, which comfortably covers the ${requiredHours} hours of remaining curriculum. All milestones remain on track.`;
    } else {
      // Find critical path of prerequisites needed by essential milestones & target node
      const targetNode = nodes.find((n) => n.isTarget) || nodes[nodes.length - 1];
      
      // Determine critical prerequisites that CANNOT be deferred
      const criticalPrereqs = new Set();
      function markCriticalPath(nodeId) {
        criticalPrereqs.add(nodeId);
        const node = nodes.find((n) => n.id === nodeId);
        if (node && Array.isArray(node.deps)) {
          node.deps.forEach((depId) => {
            if (!criticalPrereqs.has(depId)) {
              markCriticalPath(depId);
            }
          });
        }
      }

      if (targetNode) {
        markCriticalPath(targetNode.id);
      }

      // Candidates for stretch: certs, optional polish milestones, or non-critical nodes
      // Rule: Never mark target node as stretch; never defer prerequisite of an essential task
      const stretchCandidates = pendingNodes.filter((n) => {
        if (n.isTarget) return false;
        // Certifications are prime candidates for stretch goals
        if (n.kind === 'cert') return true;
        // Non-target nodes in Phase 4 or 5 that are not strict blockers
        if ((n.phase === 'Projects and Credentials' || n.phase === 'Career Entry') && n.kind !== 'role') {
          // If no other pending node depends on this node, it can safely be a stretch task
          const isPrerequisiteForPending = pendingNodes.some(
            (other) => other.id !== n.id && other.deps?.includes(n.id)
          );
          return !isPrerequisiteForPending;
        }
        return false;
      });

      let savedHours = 0;
      const deficit = requiredHours - availableHours;

      for (const candidate of stretchCandidates) {
        if (savedHours < deficit * 1.2) {
          stretchNodeIds.push(candidate.id);
          savedHours += candidate.hours || 0;
        }
      }

      const deficitRounded = Math.round(deficit * 10) / 10;
      explanation = `The requested timeline (${availableHours} hrs available) is shorter than the estimated curriculum effort (${requiredHours} hrs required, deficit of ~${deficitRounded} hrs). To keep your target role viable without burnout, we have marked non-blocking certifications and secondary milestones (${stretchNodeIds.length} items) as optional stretch goals. Focus on core technical skills and one substantial portfolio project first.`;
    }

    const plan = {
      fits,
      availableHours,
      requiredHours,
      stretchNodeIds,
      adjustedHours,
      explanation,
    };

    cacheService.set(cacheKey, plan);

    return {
      plan,
      isMock: env.MOCK_AI,
      fromCache: false,
    };
  },
};
