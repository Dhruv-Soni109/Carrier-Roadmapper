import React, { useState } from 'react';
import { Compass, GraduationCap, Code2, RefreshCw, ArrowRight, Award, AlertCircle, Sparkles } from 'lucide-react';
import { CAREER_ARCHETYPES } from '../../data/careerArchetypes';
import { useRoadmap } from '../../context/RoadmapContext';

export const CareerExplorer = () => {
  const { setActiveNodeId, setActiveTab } = useRoadmap();
  const [selectedArchetypeIndex, setSelectedArchetypeIndex] = useState(0);

  const currentArchetype = CAREER_ARCHETYPES[selectedArchetypeIndex];

  const handleStepClick = (step) => {
    if (step.linkedNodeId) {
      setActiveNodeId(step.linkedNodeId);
      setActiveTab('roadmap');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Proven Trajectories</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Career Path Archetype Explorer
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Examine realistic trajectories of successful candidates from different starting points: CS students, self-taught developers, and career switchers.
        </p>

        {/* Clear Mandatory Disclaimer */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Illustrative Archetypes:</strong> These trajectories represent composite synthesized archetypes rather than individual verified stories. Actual durations depend on prior familiarity and weekly hours.
          </span>
        </div>
      </div>

      {/* Archetype Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAREER_ARCHETYPES.map((arch, idx) => {
          const isSelected = selectedArchetypeIndex === idx;
          const icons = [GraduationCap, Code2, RefreshCw];
          const Icon = icons[idx];

          return (
            <button
              key={arch.id}
              onClick={() => setSelectedArchetypeIndex(idx)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/30 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  {arch.totalDuration}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{arch.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {arch.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Archetype Deep Dive */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Archetype Profile
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {currentArchetype.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Starting Point: {currentArchetype.startingPoint} • Target: {currentArchetype.targetRole}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              Duration: {currentArchetype.totalDuration}
            </span>
          </div>
        </div>

        {/* Chronological Steps Timeline */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-800/80 before:hidden sm:before:block">
          {currentArchetype.steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => handleStepClick(step)}
              className="relative sm:pl-10 group cursor-pointer"
            >
              {/* Timeline marker */}
              <div className="hidden sm:flex absolute left-2 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 group-hover:border-cyan-500/40 transition-colors space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {step.year}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {step.role}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    Badge: {step.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Key Milestones Shipped:
                  </span>
                  <div className="space-y-1">
                    {step.keyMilestones.map((milestone, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {step.linkedNodeId && (
                  <div className="pt-2 flex items-center justify-end text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
                    <span>Inspect Linked Roadmap Node →</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
