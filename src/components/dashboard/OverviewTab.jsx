import React from 'react';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  Zap,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Flame
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useRoadmap } from '../../context/RoadmapContext';

export const OverviewTab = () => {
  const {
    currentRoadmap,
    completedNodes,
    knownNodes,
    calculateProgressMetrics,
    calculateGamification,
    setActiveTab,
    setActiveNodeId,
    setIsGeneratorOpen
  } = useRoadmap();

  const metrics = calculateProgressMetrics();
  const gamification = calculateGamification();

  // Phase breakdown data for Recharts
  const phaseData = [1, 2, 3, 4, 5].map((phaseNum) => {
    const phaseNodes = (currentRoadmap?.nodes || []).filter((n) => n.phase === phaseNum);
    const completedCount = phaseNodes.filter((n) => completedNodes.has(n.id) || knownNodes.has(n.id)).length;
    const totalCount = phaseNodes.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const names = {
      1: 'P1: Foundations',
      2: 'P2: Core Tech',
      3: 'P3: Advanced',
      4: 'P4: Projects',
      5: 'P5: Career Entry'
    };

    return {
      phase: names[phaseNum] || `P${phaseNum}`,
      total: totalCount,
      completed: completedCount,
      percent
    };
  });

  // Hours distribution by type for PieChart
  const typeHoursData = [
    { name: 'Skills', hours: 0, color: '#3b82f6' },
    { name: 'Projects', hours: 0, color: '#10b981' },
    { name: 'Certifications', hours: 0, color: '#f59e0b' },
    { name: 'Milestones & Prep', hours: 0, color: '#8b5cf6' }
  ];

  (currentRoadmap?.nodes || []).forEach((node) => {
    const h = node.hours || 0;
    if (node.type === 'skill') typeHoursData[0].hours += h;
    else if (node.type === 'project') typeHoursData[1].hours += h;
    else if (node.type === 'cert') typeHoursData[2].hours += h;
    else typeHoursData[3].hours += h;
  });

  // Sample badges
  const BADGES = [
    { title: 'First Step', desc: 'Completed first roadmap node', unlocked: metrics.completedCount >= 1 },
    { title: 'Foundation Master', desc: 'Completed Phase 1 Foundations', unlocked: phaseData[0]?.percent === 100 },
    { title: 'Project Titan', desc: 'Shipped a capstone portfolio project', unlocked: (currentRoadmap?.nodes || []).some(n => n.type === 'project' && completedNodes.has(n.id)) },
    { title: 'Speed Learner', desc: 'Verified 2+ known skills', unlocked: metrics.knownCount >= 2 },
    { title: 'Dream Role Ready', desc: 'Conquered target dream job', unlocked: (currentRoadmap?.nodes || []).some(n => n.isTarget && completedNodes.has(n.id)) }
  ];

  return (
    <div className="space-y-8">
      {/* Banner / Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0d162a] to-slate-900/90 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Active Roadmap
            </span>
            <span className="text-xs text-slate-400">
              {currentRoadmap?.industry || 'Technology'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {currentRoadmap?.goal || 'Career Roadmap'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {currentRoadmap?.summary || 'Your customized career reverse-engineering roadmap.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
          >
            <span>Open Skill Tree</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Overall Progress */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {metrics.overallProgressPercent}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Skills Completed */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Milestones</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {metrics.completedCount}
            <span className="text-xs text-slate-400 font-normal"> / {metrics.totalNodes}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            +{metrics.knownCount} verified known
          </p>
        </div>

        {/* Card 3: Total Learning Hours */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Hours</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {metrics.totalEstimatedHours}h
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {metrics.completedHours}h completed
          </p>
        </div>

        {/* Card 4: Remaining Time */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Time Remaining</span>
            <Calendar className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {metrics.remainingMonths}m
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            ~{metrics.remainingWeeks} weeks pace
          </p>
        </div>

        {/* Card 5: Current Level */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Current Level</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            Lvl {gamification.currentRank.level}
          </div>
          <p className="text-[11px] text-amber-300 font-medium mt-2 truncate">
            {gamification.currentRank.title}
          </p>
        </div>

        {/* Card 6: Weekly Target */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Weekly Target</span>
            <Target className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">
            {metrics.weeklyHours}h
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            per 7-day sprint
          </p>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Phase Completion Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Curriculum Phase Progress</h3>
              <p className="text-xs text-slate-400">Completion rate across all 5 career milestones</p>
            </div>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              5-Phase Pipeline
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phaseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="phase" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-xl text-xs text-slate-200">
                          <p className="font-bold text-white">{data.phase}</p>
                          <p className="text-cyan-400">{data.percent}% completed</p>
                          <p className="text-slate-400">{data.completed} of {data.total} tasks done</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                  {phaseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.percent === 100 ? '#10b981' : entry.percent > 0 ? '#06b6d4' : '#334155'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Hours Allocation Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Hour Allocation by Focus</h3>
              <p className="text-xs text-slate-400">Time distribution across skill types</p>
            </div>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeHoursData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="hours"
                >
                  {typeHoursData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200">
                          <span className="font-bold">{data.name}: </span>
                          <span className="font-mono text-cyan-400">{data.hours} hours</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80 text-xs">
            {typeHoursData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name} ({item.hours}h)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification & Badges Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Achievement Badges</h3>
              <p className="text-xs text-slate-400">Unlock credentials as you conquer milestones</p>
            </div>
          </div>

          <div className="text-xs font-mono text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {BADGES.filter(b => b.unlocked).length} / {BADGES.length} Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BADGES.map((badge, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-100 shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Award className={`w-5 h-5 ${badge.unlocked ? 'text-amber-400' : 'text-slate-600'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {badge.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-1">{badge.title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
