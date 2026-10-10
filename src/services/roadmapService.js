import { apiClient } from './api';
import { DEMO_ROADMAPS } from '../data/demoRoadmaps';

/**
 * Roadmap Service
 * Connects to PathForge Express AI Backend:
 * - POST /api/roadmap
 * - POST /api/node
 * - POST /api/replan
 * With automatic graceful fallback to the built-in intelligent engine when offline.
 */
export const roadmapService = {
  /**
   * Generate a personalized career roadmap
   * @param {Object} params { goal, targetCompany, industry, currentLevel, existingSkills, weeklyHours, targetMonths, education }
   */
  generateRoadmap: async (params) => {
    // 1. Try backend API if server is active
    try {
      const backendPayload = {
        goal: params.goal,
        companyType: params.targetCompany || params.companyType || 'Any',
        industry: params.industry || 'Technology',
        currentLevel: params.currentLevel || params.level || 'Beginner',
        knownSkills: Array.isArray(params.existingSkills)
          ? params.existingSkills
          : (params.existingSkills ? params.existingSkills.split(',').map((s) => s.trim()).filter(Boolean) : []),
        hoursPerWeek: Number(params.weeklyHours || params.hours || 15),
        monthsAvailable: Number(params.targetMonths || params.months || 6),
        background: params.education || params.background || 'Independent Learner',
      };

      const backendResult = await apiClient.post('/api/roadmap', backendPayload);
      const roadmapData = backendResult?.data || backendResult?.roadmap;

      if (roadmapData && Array.isArray(roadmapData.nodes)) {
        // Ensure UI tags and properties exist for rich display
        const enrichedRoadmap = {
          ...roadmapData,
          tags: roadmapData.tags || roadmapData.nodes.slice(0, 6).map((n) => n.title),
          weeklyHours: roadmapData.hoursPerWeek || backendPayload.hoursPerWeek,
          targetMonths: roadmapData.monthsAvailable || backendPayload.monthsAvailable,
          targetCompany: roadmapData.companyType || backendPayload.companyType,
        };

        return {
          roadmap: enrichedRoadmap,
          isLiveBackend: true,
          source: backendResult?.meta?.isMock
            ? 'PathForge AI Engine (Mock Mode)'
            : 'PathForge AI Engine (Live Gemini/Claude)',
        };
      }
    } catch (error) {
      console.warn('[PathForge] Backend generation request failed, falling back to local simulation:', error.message);
    }

    // 2. Intelligent local synthesis fallback engine
    const normalizedGoal = (params.goal || '').toLowerCase();

    let baseRoadmapKey = 'fullstack-climate';
    if (normalizedGoal.includes('google') || normalizedGoal.includes('ai') || normalizedGoal.includes('ml') || normalizedGoal.includes('machine learning')) {
      baseRoadmapKey = 'aiml-google';
    } else if (normalizedGoal.includes('data') || normalizedGoal.includes('fintech') || normalizedGoal.includes('finance')) {
      baseRoadmapKey = 'data-scientist-fintech';
    } else if (normalizedGoal.includes('cyber') || normalizedGoal.includes('security') || normalizedGoal.includes('soc')) {
      baseRoadmapKey = 'cybersecurity-analyst';
    } else if (normalizedGoal.includes('cloud') || normalizedGoal.includes('microsoft') || normalizedGoal.includes('azure') || normalizedGoal.includes('devops')) {
      baseRoadmapKey = 'cloud-engineer-msft';
    } else if (normalizedGoal.includes('ui') || normalizedGoal.includes('ux') || normalizedGoal.includes('design') || normalizedGoal.includes('product')) {
      baseRoadmapKey = 'uiux-product';
    }

    const template = DEMO_ROADMAPS[baseRoadmapKey];

    const customizedRoadmap = {
      ...template,
      id: `roadmap-${Date.now()}`,
      goal: params.goal || template.goal,
      targetCompany: params.targetCompany || template.targetCompany,
      industry: params.industry || template.industry,
      weeklyHours: Number(params.weeklyHours) || template.weeklyHours,
      targetMonths: Number(params.targetMonths) || template.targetMonths,
      userLevel: params.currentLevel || 'Beginner',
      userEducation: params.education || 'Not specified',
      userExistingSkills: Array.isArray(params.existingSkills)
        ? params.existingSkills
        : (params.existingSkills ? params.existingSkills.split(',').map((s) => s.trim()) : []),
      createdAt: new Date().toISOString(),
    };

    const totalHours = customizedRoadmap.nodes.reduce((acc, node) => acc + (node.hours || 0), 0);
    customizedRoadmap.totalHours = totalHours;

    return {
      roadmap: customizedRoadmap,
      isLiveBackend: false,
      source: 'Local Intelligent Engine (Offline Mode)',
    };
  },

  /**
   * Request deep-dive advice and 6 interview questions for a specific node
   * @param {string} nodeId
   * @param {Object} context { goal, node }
   */
  getNodeAdvice: async (nodeId, context = {}) => {
    try {
      const nodeObj = context.node || { id: nodeId, title: context.title || nodeId };
      const backendPayload = {
        goal: context.goal || 'Software Engineer',
        node: {
          id: nodeObj.id || nodeId,
          title: nodeObj.title || 'Technical Skill',
          kind: nodeObj.kind || nodeObj.type || 'skill',
          phase: nodeObj.phaseName || String(nodeObj.phase || 'Foundations'),
          hours: Number(nodeObj.hours || 20),
          summary: nodeObj.summary || '',
          why: nodeObj.why || nodeObj.whyItMatters || '',
          deps: nodeObj.deps || nodeObj.prerequisites || [],
          isTarget: Boolean(nodeObj.isTarget),
        },
      };

      const backendResult = await apiClient.post('/api/node', backendPayload);
      const guidance = backendResult?.data;

      if (guidance) {
        return {
          guidance,
          advice: guidance,
          isLiveBackend: true,
        };
      }
    } catch (e) {
      console.warn('[PathForge] Backend node guidance query failed, using local fallback:', e.message);
    }

    return {
      guidance: null,
      advice: {
        tips: [
          'Focus on understanding mental models rather than memorizing syntaxes.',
          'Build small prototypes for every abstract concept before advancing.',
          'Review the provided interview questions and rehearse out-loud explanations.',
        ],
        estimatedPacing: '2-3 modules per week',
        recommendedFocus: 'Core architecture and hands-on code',
      },
      isLiveBackend: false,
    };
  },

  /**
   * Re-plan roadmap based on adjusted weekly hours or target months
   * @param {Object} currentRoadmap
   * @param {number} newWeeklyHours
   * @param {number} newTargetMonths
   * @param {Array} completedNodeIds
   * @param {Array} knownNodeIds
   */
  replanRoadmap: async (currentRoadmap, newWeeklyHours, newTargetMonths, completedNodeIds = [], knownNodeIds = []) => {
    try {
      const backendPayload = {
        goal: currentRoadmap.goal || 'Career Target',
        hoursPerWeek: Number(newWeeklyHours),
        monthsAvailable: Number(newTargetMonths),
        nodes: (currentRoadmap.nodes || []).map((n) => ({
          id: n.id,
          key: n.key,
          title: n.title,
          kind: n.kind || n.type || 'skill',
          phase: n.phaseName || (typeof n.phase === 'string' ? n.phase : 'Foundations'),
          hours: Number(n.hours || 15),
          summary: n.summary || '',
          why: n.why || n.whyItMatters || '',
          deps: Array.isArray(n.deps) ? n.deps : (n.prerequisites || []),
          isTarget: Boolean(n.isTarget),
        })),
        completedNodeIds: Array.from(completedNodeIds || []),
        knownNodeIds: Array.from(knownNodeIds || []),
      };

      const backendResult = await apiClient.post('/api/replan', backendPayload);
      const plan = backendResult?.data;

      if (plan) {
        return {
          roadmap: {
            ...currentRoadmap,
            weeklyHours: newWeeklyHours,
            targetMonths: newTargetMonths,
            stretchNodeIds: plan.stretchNodeIds || [],
          },
          plan,
          availableHoursTotal: plan.availableHours,
          requiredHoursTotal: plan.requiredHours,
          isTightSchedule: !plan.fits,
          pacingRatio: (plan.availableHours / (plan.requiredHours || 1)).toFixed(2),
          explanation: plan.explanation,
          isLiveBackend: true,
        };
      }
    } catch (e) {
      console.warn('[PathForge] Backend replan failed, using local planner calculations:', e.message);
    }

    const availableHoursTotal = newWeeklyHours * (newTargetMonths * 4.33);
    const requiredHoursTotal = currentRoadmap.totalHours;

    return {
      roadmap: {
        ...currentRoadmap,
        weeklyHours: newWeeklyHours,
        targetMonths: newTargetMonths,
      },
      availableHoursTotal: Math.round(availableHoursTotal),
      requiredHoursTotal,
      isTightSchedule: availableHoursTotal < requiredHoursTotal,
      pacingRatio: (availableHoursTotal / (requiredHoursTotal || 1)).toFixed(2),
      isLiveBackend: false,
    };
  },
};
