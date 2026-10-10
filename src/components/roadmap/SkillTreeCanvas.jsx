import React, { useMemo, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import { CustomNode } from './CustomNode';
import { getLayoutedElements } from '../../utils/graphLayout';
import { useRoadmap } from '../../context/RoadmapContext';
import {
  Filter,
  Sparkles,
  Maximize2,
  Compass,
  ArrowRight,
  ArrowDown,
  ZoomIn,
  ZoomOut,
  MapPin,
  Map,
  RotateCcw
} from 'lucide-react';

const nodeTypes = {
  custom: CustomNode,
};

const SkillTreeInner = () => {
  const {
    currentRoadmap,
    completedNodes,
    knownNodes,
    activeNodeId,
    setActiveNodeId,
    markNodeComplete,
    getNodeStatus,
    theme
  } = useRoadmap();

  const { setCenter, fitView, zoomIn, zoomOut, getNodes } = useReactFlow();

  const [filterPhase, setFilterPhase] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [direction, setDirection] = useState('LR'); // 'LR' or 'TB'
  const [showMinimap, setShowMinimap] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(88);

  // Build raw nodes
  const rawNodes = useMemo(() => {
    if (!currentRoadmap?.nodes) return [];

    return currentRoadmap.nodes
      .filter((n) => {
        if (filterPhase !== 'all' && n.phase !== Number(filterPhase)) return false;
        if (filterType !== 'all' && n.type !== filterType) return false;
        return true;
      })
      .map((n) => {
        const status = getNodeStatus(n);
        return {
          id: n.id,
          type: 'custom',
          data: {
            ...n,
            status,
            onToggleComplete: markNodeComplete,
            onSelectDetails: setActiveNodeId,
          },
          position: { x: 0, y: 0 },
        };
      });
  }, [currentRoadmap?.nodes, filterPhase, filterType, completedNodes, knownNodes, setActiveNodeId, markNodeComplete, getNodeStatus]);

  // Build edges with dynamic coloring and animation based on dependency satisfaction
  const rawEdges = useMemo(() => {
    if (!currentRoadmap?.edges) return [];
    const visibleNodeIds = new Set(rawNodes.map((n) => n.id));

    return currentRoadmap.edges
      .filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      .map((edge) => {
        const sourceCompleted = completedNodes.has(edge.source) || knownNodes.has(edge.source);
        const targetNode = currentRoadmap.nodes.find((n) => n.id === edge.target);
        const isTargetAvailable = targetNode ? getNodeStatus(targetNode) !== 'locked' : false;

        const isHighlighted = activeNodeId === edge.source || activeNodeId === edge.target;

        let strokeColor = '#334155'; // default dark slate
        if (sourceCompleted) {
          strokeColor = '#10b981'; // emerald
        } else if (isTargetAvailable) {
          strokeColor = '#06b6d4'; // cyan
        }

        if (isHighlighted) {
          strokeColor = '#38bdf8'; // electric cyan
        }

        return {
          ...edge,
          type: 'smoothstep',
          animated: edge.animated || isTargetAvailable,
          style: {
            stroke: strokeColor,
            strokeWidth: isHighlighted ? 3.5 : 2,
            opacity: sourceCompleted || isTargetAvailable || isHighlighted ? 1 : 0.45,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: strokeColor,
            width: 14,
            height: 14,
          },
        };
      });
  }, [currentRoadmap?.edges, rawNodes, completedNodes, knownNodes, activeNodeId, getNodeStatus]);

  // Apply Dagre auto-layout
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    if (rawNodes.length === 0) return { nodes: [], edges: [] };
    return getLayoutedElements(rawNodes, rawEdges, direction);
  }, [rawNodes, rawEdges, direction]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Focus helper to center the camera on a specific list of nodes at comfortable readable zoom (0.88x)
  const focusNodes = useCallback((targetNodeList, zoomLevel = 0.88) => {
    if (!targetNodeList || targetNodeList.length === 0) return;
    const avgX = targetNodeList.reduce((acc, n) => acc + (n.position?.x || 0) + 140, 0) / targetNodeList.length;
    const avgY = targetNodeList.reduce((acc, n) => acc + (n.position?.y || 0) + 68, 0) / targetNodeList.length;
    setCenter(avgX, avgY, { zoom: zoomLevel, duration: 500 });
  }, [setCenter]);

  // When layouted nodes update, position camera at readable zoom focusing on initial nodes
  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    if (layoutedNodes.length > 0) {
      const timer = setTimeout(() => {
        let targetList = [];
        if (filterPhase === 'all') {
          // In All Phases view, focus directly on Phase 1 nodes so they are immediately large & readable
          const p1 = layoutedNodes.filter(n => n.data?.phase === 1);
          targetList = p1.length > 0 ? p1 : [layoutedNodes[0]];
        } else {
          targetList = layoutedNodes.filter(n => n.data?.phase === Number(filterPhase));
        }

        if (!targetList.length) targetList = layoutedNodes;
        focusNodes(targetList, 0.88);
      }, 70);

      return () => clearTimeout(timer);
    }
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges, filterPhase, focusNodes]);

  const onNodeClick = useCallback((_, node) => {
    setActiveNodeId(node.id);
    setCenter(node.position.x + 140, node.position.y + 68, { zoom: 0.95, duration: 400 });
  }, [setActiveNodeId, setCenter]);

  // Action: Focus on readable start
  const handleFocusStart = () => {
    const currentNodes = getNodes();
    const p1 = currentNodes.filter(n => n.data?.phase === 1);
    focusNodes(p1.length > 0 ? p1 : currentNodes, 0.88);
  };

  // Action: Fit all overview
  const handleFitAll = () => {
    fitView({ padding: 0.15, duration: 600 });
  };

  return (
    <div className="relative w-full h-[720px] lg:h-[800px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#080c16]/95 shadow-2xl">
      {/* Top Filter & Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Side: Phase Filter & Direction Toggle */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Phase Filter Buttons */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-lg">
            <span className="hidden sm:inline-flex items-center gap-1 pl-2 pr-1 text-[11px] font-semibold text-slate-400">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Phase:</span>
            </span>
            {['all', '1', '2', '3', '4', '5'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPhase(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterPhase === p
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {p === 'all' ? 'All Phases' : `P${p}`}
              </button>
            ))}
          </div>

          {/* Layout Direction Toggle (LR vs TB) */}
          <button
            onClick={() => setDirection(d => d === 'LR' ? 'TB' : 'LR')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 shadow-lg transition-all"
            title="Toggle layout direction between Horizontal and Vertical"
          >
            {direction === 'LR' ? (
              <>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Horizontal</span>
              </>
            ) : (
              <>
                <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Vertical</span>
              </>
            )}
          </button>
        </div>

        {/* Right Side: Camera Presets & Zoom Helpers */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Focus Start Button */}
          <button
            onClick={handleFocusStart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 shadow-lg transition-all"
            title="Focus camera on Phase 1 at 100% readable zoom"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Focus (Readable)</span>
          </button>

          {/* Overview (Fit All) Button */}
          <button
            onClick={handleFitAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 shadow-lg transition-all"
            title="Zoom out to see the entire career roadmap overview"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Fit All</span>
          </button>

          {/* Minimap Toggle */}
          <button
            onClick={() => setShowMinimap(!showMinimap)}
            className={`p-1.5 rounded-xl backdrop-blur-xl border shadow-lg transition-all ${
              showMinimap
                ? 'bg-slate-800 text-cyan-400 border-slate-700'
                : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title={showMinimap ? 'Hide Minimap' : 'Show Minimap'}
          >
            <Map className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onMove={(_, viewport) => setCurrentZoom(Math.round(viewport.zoom * 100))}
        nodeTypes={nodeTypes}
        minZoom={0.25}
        maxZoom={1.6}
        defaultViewport={{ x: 80, y: 160, zoom: 0.88 }}
        className="touch-none"
      >
        <Background
          color={theme === 'dark' ? '#1e293b' : '#cbd5e1'}
          gap={28}
          size={1.5}
        />

        <Controls
          showInteractive={false}
          className="!bottom-4 !left-4"
        />

        {showMinimap && (
          <MiniMap
            nodeColor={(n) => {
              if (n.data?.isTarget) return '#f59e0b';
              if (completedNodes.has(n.id)) return '#10b981';
              if (knownNodes.has(n.id)) return '#06b6d4';
              switch (n.data?.type) {
                case 'project': return '#10b981';
                case 'cert': return '#f59e0b';
                case 'role': return '#ec4899';
                case 'milestone': return '#8b5cf6';
                default: return '#3b82f6';
              }
            }}
            nodeStrokeWidth={3}
            maskColor="rgba(8, 12, 22, 0.8)"
            className="!bottom-4 !right-4 !w-40 !h-32 rounded-xl border border-slate-800"
          />
        )}
      </ReactFlow>

      {/* Floating Bottom Bar: Quick Zoom & Hint */}
      <div className="absolute bottom-4 left-24 z-10 flex items-center gap-3 pointer-events-none">
        {/* Zoom Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] font-bold text-slate-300 shadow-lg pointer-events-auto">
          <span className="text-cyan-400">Zoom:</span>
          <span>{currentZoom}%</span>
        </div>

        {/* Floating Instruction */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 shadow-lg pointer-events-none">
          <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>Click any node to explore curriculum, projects & 6 interview questions</span>
        </div>
      </div>
    </div>
  );
};

export const SkillTreeCanvas = () => {
  return (
    <ReactFlowProvider>
      <SkillTreeInner />
    </ReactFlowProvider>
  );
};

