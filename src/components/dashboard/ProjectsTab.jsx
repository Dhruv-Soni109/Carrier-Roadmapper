import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Award, FolderGit2 } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

export const ProjectsTab = () => {
  const { currentRoadmap, setActiveNodeId, setActiveTab } = useRoadmap();

  const allProjects = (currentRoadmap?.nodes || [])
    .filter((node) => node.weekendProject)
    .map((node) => ({
      ...node.weekendProject,
      nodeId: node.id,
      nodeTitle: node.title,
      phase: node.phase,
      xp: node.xp || 100,
      hours: node.hours
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production-Ready Portfolio</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          AI Project Generator & Capstone Blueprints
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-2xl">
          Build realistic domain projects that replace generic tutorial clones and prove verified production engineering capability.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map((proj, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Phase {proj.phase} Project
                </span>
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{proj.xp} XP</span>
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {proj.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {proj.description}
              </p>

              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Key Specifications:
                </span>
                {proj.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Mapped to: <strong className="text-slate-200">{proj.nodeTitle}</strong>
              </span>

              <button
                onClick={() => {
                  setActiveNodeId(proj.nodeId);
                  setActiveTab('roadmap');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
              >
                <span>View Node</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
