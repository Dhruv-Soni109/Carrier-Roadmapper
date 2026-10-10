import React, { useState } from 'react';
import { BookOpen, ExternalLink, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

export const ResourcesTab = () => {
  const { currentRoadmap, setActiveNodeId, setActiveTab } = useRoadmap();
  const [filterType, setFilterType] = useState('all');

  // Collect all resources from current roadmap nodes
  const allResources = (currentRoadmap?.nodes || []).flatMap((node) => {
    return (node.resources || []).map((res) => ({
      ...res,
      nodeId: node.id,
      nodeTitle: node.title,
      phase: node.phase
    }));
  });

  const filtered = allResources.filter((r) => {
    if (filterType === 'all') return true;
    if (filterType === 'free') return r.free;
    return r.type.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curated Curriculum</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Learning Resources & Documentation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Hand-picked official documentation, interactive tutorials, and books mapped to your roadmap.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {['all', 'Documentation', 'Course', 'free'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterType === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t === 'free' ? 'Free Only' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                  {item.type}
                </span>
                {item.free && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    100% Free
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Provider: {item.provider}
              </p>

              <button
                onClick={() => {
                  setActiveNodeId(item.nodeId);
                  setActiveTab('roadmap');
                }}
                className="text-[11px] text-slate-400 hover:text-cyan-300 font-medium block truncate"
              >
                Mapped to: <span className="underline">{item.nodeTitle}</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>Visit Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
