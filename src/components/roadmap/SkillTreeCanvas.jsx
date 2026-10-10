import React, { useMemo, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
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
import { Maximize2, Filter, Sparkles, CheckCircle2, Lock, Eye } from 'lucide-react';

const nodeTypes = {
  custom: CustomNode,
};

export const SkillTreeCanvas = () => {
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

  const [filterPhase, setFilterPhase] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showMinimap, setShowMinimap] = useState(true);

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
          animated: edge.animated || isTargetAvailable,
          style: {
            stroke: strokeColor,
            strokeWidth: isHighlighted ? 3 : 2,
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
    return getLayoutedElements(rawNodes, rawEdges, 'LR');
  }, [rawNodes, rawEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((_, node) => {
    setActiveNodeId(node.id);
  }, [setActiveNodeId]);

  return (
    <div className="relative w-full h-[700px] lg:h-[780px] rounded-2xl overflow-hidden border border-slate-800/80 bg-[#080c16]/90 shadow-2xl">
      {/* Top Filter & Legend Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Phase Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 pointer-events-auto shadow-lg">
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

        {/* Legend Pills */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 pointer-events-auto text-[11px] shadow-lg">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
            <span>Skills</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            <span>Projects</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
            <span>Certs</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></span>
            <span>Roles</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
            <span>Milestones</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="font-semibold text-yellow-300">Target Role</span>
          </div>
        </div>
      </div>

      {/* Main React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.2}
        maxZoom={1.5}
        className="touch-none"
      >
        <Background
          color={theme === 'dark' ? '#1e293b' : '#cbd5e1'}
          gap={24}
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
            maskColor="rgba(8, 12, 22, 0.75)"
            className="!bottom-4 !right-4 !w-36 !h-28"
          />
        )}
      </ReactFlow>

      {/* Floating Instructions Helper */}
      <div className="absolute bottom-4 left-20 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 pointer-events-none">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>Click any node to view curriculum, projects & 6 interview questions</span>
      </div>
    </div>
  );
};
