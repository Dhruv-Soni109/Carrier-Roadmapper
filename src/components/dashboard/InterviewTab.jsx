import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

export const InterviewTab = () => {
  const { currentRoadmap } = useRoadmap();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Flatten all interview questions from nodes
  const allQuestions = (currentRoadmap?.nodes || []).flatMap((node) => {
    return (node.interviewQuestions || []).map((q, idx) => ({
      ...q,
      nodeTitle: node.title,
      phase: node.phase,
      id: `${node.id}-q-${idx}`
    }));
  });

  const filteredQuestions = allQuestions.filter((q) => {
    const qText = `${q.question} ${q.nodeTitle} ${q.hint || ''}`.toLowerCase();
    return qText.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interview Readiness Vault</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Technical & Behavioral Interview Prompts
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            {allQuestions.length} curated questions derived from actual screening loops at target firms.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search interview prompts..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filteredQuestions.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5 border border-blue-500/30">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                      {item.question}
                    </h4>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Skill: <strong className="text-slate-300">{item.nodeTitle}</strong> • Phase {item.phase}
                    </span>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                  {item.hint && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                      <strong className="block mb-0.5">Technical Screen Hint:</strong>
                      {item.hint}
                    </div>
                  )}

                  {item.answer && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                      <strong className="block mb-1 text-emerald-400 font-sans">
                        Architectural Rationale & Sample Answer:
                      </strong>
                      {item.answer}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
