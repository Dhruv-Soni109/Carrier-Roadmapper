import React, { useState } from 'react';
import { GitCompare, Sparkles, Check, Clock, Trophy, Layers, ArrowRight } from 'lucide-react';
import { DEMO_ROADMAPS } from '../../data/demoRoadmaps';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const CareerComparison = () => {
  const [careerAKey, setCareerAKey] = useState('fullstack-climate');
  const [careerBKey, setCareerBKey] = useState('uiux-product');

  const roadmapA = DEMO_ROADMAPS[careerAKey];
  const roadmapB = DEMO_ROADMAPS[careerBKey];

  const titlesA = (roadmapA?.nodes || []).map((n) => n.title.toLowerCase());
  const titlesB = (roadmapB?.nodes || []).map((n) => n.title.toLowerCase());

  // Shared skills heuristic (matching titles or common foundation tags)
  // To provide an intuitive comparison, let's extract semantic skills
  const skillsListA = (roadmapA?.nodes || []).map((n) => ({
    title: n.title,
    hours: n.hours,
    type: n.type,
    phase: n.phase
  }));

  const skillsListB = (roadmapB?.nodes || []).map((n) => ({
    title: n.title,
    hours: n.hours,
    type: n.type,
    phase: n.phase
  }));

  // Identify shared and unique
  // Shared skills like Git, HTML/CSS, Systems Design, Testing, Problem Solving
  const sharedKeywords = ['html', 'css', 'git', 'system', 'research', 'design', 'test', 'clean'];
  
  const isShared = (title) => {
    const t = title.toLowerCase();
    return sharedKeywords.some((k) => t.includes(k));
  };

  const sharedA = skillsListA.filter((s) => isShared(s.title));
  const uniqueA = skillsListA.filter((s) => !isShared(s.title));

  const sharedB = skillsListB.filter((s) => isShared(s.title));
  const uniqueB = skillsListB.filter((s) => !isShared(s.title));

  // Chart data comparing hours by Phase 1 through 5
  const phaseComparisonData = [1, 2, 3, 4, 5].map((phaseNum) => {
    const hoursA = (roadmapA?.nodes || [])
      .filter((n) => n.phase === phaseNum)
      .reduce((sum, n) => sum + (n.hours || 0), 0);
    const hoursB = (roadmapB?.nodes || [])
      .filter((n) => n.phase === phaseNum)
      .reduce((sum, n) => sum + (n.hours || 0), 0);

    const labels = {
      1: 'Phase 1: Foundations',
      2: 'Phase 2: Core Tech',
      3: 'Phase 3: Advanced',
      4: 'Phase 4: Capstone',
      5: 'Phase 5: Career Entry'
    };

    return {
      name: labels[phaseNum],
      [roadmapA.goal.split(' at ')[0]]: hoursA,
      [roadmapB.goal.split(' at ')[0]]: hoursB
    };
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Cross-Role Analytics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Career Trajectory Comparison
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Compare skill overlaps, divergence points, and estimated preparation hours between two target career paths.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
            Career Goal A (Cyan Accent)
          </label>
          <select
            value={careerAKey}
            onChange={(e) => setCareerAKey(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {Object.entries(DEMO_ROADMAPS).map(([k, r]) => (
              <option key={k} value={k} disabled={k === careerBKey}>
                {r.goal}
              </option>
            ))}
          </select>
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
            <span>Total Hours: {roadmapA.totalHours}h</span>
            <span>•</span>
            <span>Timeline: {roadmapA.targetMonths} months</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <label className="text-xs font-bold uppercase tracking-wider text-pink-400 block mb-2">
            Career Goal B (Pink Accent)
          </label>
          <select
            value={careerBKey}
            onChange={(e) => setCareerBKey(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {Object.entries(DEMO_ROADMAPS).map(([k, r]) => (
              <option key={k} value={k} disabled={k === careerAKey}>
                {r.goal}
              </option>
            ))}
          </select>
          <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
            <span>Total Hours: {roadmapB.totalHours}h</span>
            <span>•</span>
            <span>Timeline: {roadmapB.targetMonths} months</span>
          </div>
        </div>
      </div>

      {/* Visual Hours Comparison Graph */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <h3 className="text-base font-bold text-white mb-1">Preparation Hours by Phase</h3>
        <p className="text-xs text-slate-400 mb-6">Side-by-side time expenditure required per milestone phase</p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={phaseComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} unit="h" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-white">{payload[0].payload.name}</p>
                        {payload.map((p, idx) => (
                          <p key={idx} style={{ color: p.color }}>
                            {p.name}: {p.value} hours
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey={roadmapA.goal.split(' at ')[0]} fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey={roadmapB.goal.split(' at ')[0]} fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Matrix: Shared (Highlighted in Gold) vs Unique */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Unique to Role A */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h4 className="text-sm font-bold text-white">Unique to {roadmapA.goal.split(' at ')[0]}</h4>
          </div>
          <div className="space-y-2">
            {uniqueA.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-center justify-between"
              >
                <span>{item.title}</span>
                <span className="text-cyan-400 font-mono font-semibold">{item.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Shared Skills (Highlighted in Gold as per prompt) */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-400/50 shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-amber-300">Shared Transferable Skills (Gold)</h4>
          </div>
          <p className="text-[11px] text-amber-200/80 mb-3 leading-relaxed">
            These competencies directly transfer between both paths, compounding your versatility.
          </p>
          <div className="space-y-2">
            {sharedA.concat(sharedB.filter(b => !sharedA.some(a => a.title === b.title))).map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/80 border border-amber-400/40 text-xs text-amber-100 flex items-center justify-between"
              >
                <span className="font-semibold">{item.title}</span>
                <span className="text-amber-400 font-mono font-bold">Transferable</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Unique to Role B */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-pink-500/30 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
            <h4 className="text-sm font-bold text-white">Unique to {roadmapB.goal.split(' at ')[0]}</h4>
          </div>
          <div className="space-y-2">
            {uniqueB.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-center justify-between"
              >
                <span>{item.title}</span>
                <span className="text-pink-400 font-mono font-semibold">{item.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
