import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_ROADMAPS } from '../data/demoRoadmaps';
import { storage } from '../utils/storage';
import { decodeRoadmapState } from '../utils/shareUrl';
import { triggerCelebration, triggerPhaseConfetti } from '../utils/confetti';

const RoadmapContext = createContext(null);

export const RoadmapProvider = ({ children }) => {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return storage.get('theme', 'dark');
  });

  // Current active roadmap
  const [currentRoadmap, setCurrentRoadmap] = useState(() => {
    // Check URL parameters first
    const params = new URLSearchParams(window.location.search);
    const sharedCode = params.get('roadmap');
    if (sharedCode) {
      const sharedData = decodeRoadmapState(sharedCode);
      if (sharedData && DEMO_ROADMAPS[sharedData.id]) {
        return {
          ...DEMO_ROADMAPS[sharedData.id],
          ...sharedData
        };
      }
    }
    // Check saved roadmap
    const saved = storage.get('active_roadmap', null);
    return saved || DEMO_ROADMAPS['fullstack-climate'];
  });

  // Completed node IDs
  const [completedNodes, setCompletedNodes] = useState(() => {
    return new Set(storage.get(`completed_${currentRoadmap?.id || 'default'}`, []));
  });

  // "Already Know This" node IDs
  const [knownNodes, setKnownNodes] = useState(() => {
    return new Set(storage.get(`known_${currentRoadmap?.id || 'default'}`, []));
  });

  // Checklist states: { [nodeId]: { [checkId]: boolean } }
  const [checklistStates, setChecklistStates] = useState(() => {
    return storage.get(`checklist_${currentRoadmap?.id || 'default'}`, {});
  });

  // Active selected node ID for slide-in details panel
  const [activeNodeId, setActiveNodeId] = useState(null);

  // App Navigation: 'landing' | 'dashboard'
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('roadmap') || params.get('dashboard') === 'true') {
      return 'dashboard';
    }
    return storage.get('view_mode', 'landing');
  });

  // Dashboard active tab: 'overview' | 'roadmap' | 'resources' | 'projects' | 'interview' | 'explorer' | 'compare' | 'planner' | 'settings'
  const [activeTab, setActiveTab] = useState('roadmap');

  // Generator modal open state
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // Export modal open state
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Toasts notification system
  const [toasts, setToasts] = useState([]);

  // Toast dispatcher
  const addToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme to HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    storage.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync roadmap change to storage
  useEffect(() => {
    if (currentRoadmap) {
      storage.set('active_roadmap', currentRoadmap);
      // Reload completed and known nodes for this specific roadmap
      const savedCompleted = storage.get(`completed_${currentRoadmap.id}`, []);
      const savedKnown = storage.get(`known_${currentRoadmap.id}`, []);
      const savedChecklist = storage.get(`checklist_${currentRoadmap.id}`, {});
      setCompletedNodes(new Set(savedCompleted));
      setKnownNodes(new Set(savedKnown));
      setChecklistStates(savedChecklist);
    }
  }, [currentRoadmap?.id]);

  // Persist completed nodes
  useEffect(() => {
    if (currentRoadmap?.id) {
      storage.set(`completed_${currentRoadmap.id}`, Array.from(completedNodes));
    }
  }, [completedNodes, currentRoadmap?.id]);

  // Persist known nodes
  useEffect(() => {
    if (currentRoadmap?.id) {
      storage.set(`known_${currentRoadmap.id}`, Array.from(knownNodes));
    }
  }, [knownNodes, currentRoadmap?.id]);

  // Persist checklist state
  useEffect(() => {
    if (currentRoadmap?.id) {
      storage.set(`checklist_${currentRoadmap.id}`, checklistStates);
    }
  }, [checklistStates, currentRoadmap?.id]);

  // Persist viewMode
  useEffect(() => {
    storage.set('view_mode', viewMode);
  }, [viewMode]);

  // Calculate XP & Level
  const calculateGamification = () => {
    let totalXp = 0;
    const nodes = currentRoadmap?.nodes || [];

    nodes.forEach((node) => {
      if (completedNodes.has(node.id)) {
        totalXp += node.xp || 100;
      } else if (knownNodes.has(node.id)) {
        totalXp += Math.round((node.xp || 100) * 0.5);
      }
    });

    // Determine level
    // Level 1: 0 - 250 XP
    // Level 2: 250 - 600 XP
    // Level 3: 600 - 1200 XP
    // Level 4: 1200 - 2000 XP
    // Level 5: 2000 - 3000 XP
    // Level 6: 3000+ XP
    const levels = [
      { level: 1, title: 'Novice Explorer', minXp: 0, maxXp: 300 },
      { level: 2, title: 'Code Apprentice', minXp: 300, maxXp: 750 },
      { level: 3, title: 'Full-Stack Craftsman', minXp: 750, maxXp: 1400 },
      { level: 4, title: 'System Architect', minXp: 1400, maxXp: 2200 },
      { level: 5, title: 'Staff Pioneer', minXp: 2200, maxXp: 3200 },
      { level: 6, title: 'Principal Visionary', minXp: 3200, maxXp: 5000 },
    ];

    let currentRank = levels[0];
    for (const l of levels) {
      if (totalXp >= l.minXp) {
        currentRank = l;
      }
    }

    const nextLevel = levels.find((l) => l.level === currentRank.level + 1) || currentRank;
    const progressInLevel = Math.min(
      100,
      Math.max(
        0,
        Math.round(((totalXp - currentRank.minXp) / (nextLevel.minXp - currentRank.minXp || 1)) * 100)
      )
    );

    return {
      totalXp,
      currentRank,
      progressInLevel,
      nextLevelTitle: nextLevel.title
    };
  };

  // Node action handlers
  const markNodeComplete = (nodeId) => {
    const node = currentRoadmap?.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setCompletedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
        addToast('Progress Updated', `Unmarked "${node.title}" as complete.`, 'info');
      } else {
        next.add(nodeId);
        addToast('Milestone Completed! 🎉', `+${node.xp || 100} XP earned for "${node.title}".`, 'success');

        // Check if phase is completed or target role reached
        if (node.isTarget) {
          triggerCelebration();
          addToast('🏆 DREAM ROLE REACHED!', 'Congratulations! You have conquered your entire career roadmap!', 'success');
        } else {
          // Check phase completion
          const samePhaseNodes = currentRoadmap.nodes.filter((n) => n.phase === node.phase);
          const allPhaseDone = samePhaseNodes.every((n) => n.id === nodeId || next.has(n.id) || knownNodes.has(n.id));
          if (allPhaseDone) {
            triggerPhaseConfetti();
            addToast(`Phase ${node.phase} Mastered! 🌟`, `You completed all milestones in ${node.phaseName || 'this phase'}!`, 'success');
          }
        }
      }
      return next;
    });

    // Remove from known if present
    setKnownNodes((prev) => {
      if (prev.has(nodeId)) {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      }
      return prev;
    });
  };

  const markNodeKnown = (nodeId) => {
    const node = currentRoadmap?.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    setKnownNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
        addToast('Status Updated', `Unmarked "${node.title}".`, 'info');
      } else {
        next.add(nodeId);
        addToast('Skill Verified! ⚡', `Marked "${node.title}" as already known. Hours saved: ${node.hours}h`, 'info');
      }
      return next;
    });

    // Remove from completed if present
    setCompletedNodes((prev) => {
      if (prev.has(nodeId)) {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      }
      return prev;
    });
  };

  const toggleChecklistItem = (nodeId, checkId) => {
    setChecklistStates((prev) => {
      const nodeChecklist = prev[nodeId] || {};
      const newStatus = !nodeChecklist[checkId];
      return {
        ...prev,
        [nodeId]: {
          ...nodeChecklist,
          [checkId]: newStatus
        }
      };
    });
  };

  // Node state helper for graph styling
  const getNodeStatus = (node) => {
    if (completedNodes.has(node.id)) return 'completed';
    if (knownNodes.has(node.id)) return 'known';

    // Check prerequisites
    const prereqs = node.prerequisites || [];
    if (prereqs.length === 0) return 'available';

    const allPrereqsMet = prereqs.every(
      (pid) => completedNodes.has(pid) || knownNodes.has(pid)
    );

    return allPrereqsMet ? 'available' : 'locked';
  };

  // Calculation of progress and remaining hours
  const calculateProgressMetrics = () => {
    const nodes = currentRoadmap?.nodes || [];
    const totalNodes = nodes.length;
    let completedCount = 0;
    let knownCount = 0;
    let completedHours = 0;
    let knownHours = 0;
    let totalEstimatedHours = 0;

    nodes.forEach((node) => {
      const hours = node.hours || 0;
      totalEstimatedHours += hours;
      if (completedNodes.has(node.id)) {
        completedCount++;
        completedHours += hours;
      } else if (knownNodes.has(node.id)) {
        knownCount++;
        knownHours += hours;
      }
    });

    const remainingHours = Math.max(0, totalEstimatedHours - completedHours - knownHours);
    const overallProgressPercent = totalNodes > 0
      ? Math.round(((completedCount + knownCount * 0.7) / totalNodes) * 100)
      : 0;

    const weeklyHours = currentRoadmap?.weeklyHours || 15;
    const remainingWeeks = weeklyHours > 0 ? (remainingHours / weeklyHours).toFixed(1) : 0;
    const remainingMonths = (remainingWeeks / 4.33).toFixed(1);

    return {
      totalNodes,
      completedCount,
      knownCount,
      completedHours,
      knownHours,
      remainingHours,
      totalEstimatedHours,
      overallProgressPercent,
      remainingWeeks,
      remainingMonths,
      weeklyHours
    };
  };

  const loadRoadmap = (newRoadmap) => {
    setCurrentRoadmap(newRoadmap);
    setViewMode('dashboard');
    setActiveTab('roadmap');
    setActiveNodeId(null);
    addToast('Roadmap Loaded', `Displaying career roadmap for "${newRoadmap.goal}"`, 'success');
  };

  const activeNode = currentRoadmap?.nodes.find((n) => n.id === activeNodeId) || null;

  const value = {
    theme,
    toggleTheme,
    currentRoadmap,
    setCurrentRoadmap,
    loadRoadmap,
    completedNodes,
    knownNodes,
    activeNodeId,
    setActiveNodeId,
    activeNode,
    checklistStates,
    toggleChecklistItem,
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    isGeneratorOpen,
    setIsGeneratorOpen,
    isExportOpen,
    setIsExportOpen,
    markNodeComplete,
    markNodeKnown,
    getNodeStatus,
    calculateProgressMetrics,
    calculateGamification,
    toasts,
    addToast,
    removeToast,
  };

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};
