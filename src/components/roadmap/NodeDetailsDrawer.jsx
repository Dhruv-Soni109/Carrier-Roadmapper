import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Zap,
  Clock,
  Sparkles,
  BookOpen,
  FolderGit2,
  HelpCircle,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  Layers,
  ArrowRight,
  Flame
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { TypeBadge, getNodeTypeConfig } from '../common/Badge';

export const NodeDetailsDrawer = () => {
  const {
    activeNode,
    setActiveNodeId,
    completedNodes,
    knownNodes,
    markNodeComplete,
    markNodeKnown,
    checklistStates,
    toggleChecklistItem,
    currentRoadmap
  } = useRoadmap();

  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'project' | 'interview' | 'checklist'

  if (!activeNode) return null;

  const isCompleted = completedNodes.has(activeNode.id);
  const isKnown = knownNodes.has(activeNode.id);
  const config = getNodeTypeConfig(activeNode.type);

  const nodeChecklist = checklistStates[activeNode.id] || {};
  const checkedCount = (activeNode.doneWhenChecklist || []).filter(
    (item) => nodeChecklist[item.id]
  ).length;
  const totalChecklist = (activeNode.doneWhenChecklist || []).length;

  // Resolve prerequisite titles
  const prerequisiteNodes = (activeNode.prerequisites || []).map((pid) => {
    return currentRoadmap?.nodes.find((n) => n.id === pid) || { id: pid, title: pid };
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        {/* Backdrop for click-outside */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveNodeId(null)}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
        />

        {/* Drawer slide-in from right */}
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-2xl bg-slate-950/95 dark:bg-[#0c1220] border-l border-slate-800/80 shadow-2xl pointer-events-auto flex flex-col h-full overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800/80 bg-slate-900/40 relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TypeBadge type={activeNode.type} size="md" />
                    <span className="text-xs font-semibold text-slate-400">
                      Phase {activeNode.phase} • {activeNode.phaseName || 'Core Curriculum'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                    {activeNode.title}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveNodeId(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Metrics Bar */}
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-800/60 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{activeNode.hours} hours estimated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>+{activeNode.xp || 100} XP reward</span>
                </div>
                {totalChecklist > 0 && (
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                    <span>Checklist: {checkedCount}/{totalChecklist}</span>
                  </div>
                )}
              </div>

              {/* Sub-tabs within Drawer */}
              <div className="flex items-center gap-2 mt-4">
                {[
                  { id: 'overview', label: 'Overview & Plan' },
                  { id: 'project', label: 'Weekend Project' },
                  { id: 'interview', label: '6 Interview Qs' },
                  { id: 'checklist', label: 'Done When' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: OVERVIEW & PLAN */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Skill Description
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                      {activeNode.summary}
                    </p>
                  </div>

                  {/* Why it Matters for Target Role */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Why this matters for your target career
                      </h3>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-100/90 leading-relaxed">
                      {activeNode.whyItMatters}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {prerequisiteNodes.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Prerequisite Foundations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {prerequisiteNodes.map((prereq) => {
                          const isPrereqDone = completedNodes.has(prereq.id) || knownNodes.has(prereq.id);
                          return (
                            <div
                              key={prereq.id}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                                isPrereqDone
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              {isPrereqDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Layers className="w-3.5 h-3.5 text-slate-500" />
                              )}
                              <span>{prereq.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Learning Plan */}
                  {activeNode.stepByStepPlan && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Step-by-Step Mastery Path
                      </h3>
                      <div className="space-y-2.5">
                        {activeNode.stepByStepPlan.map((step, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                          >
                            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-xs border border-cyan-500/30">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Learning Resources */}
                  {activeNode.resources && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Curated Learning Resources
                      </h3>
                      <div className="space-y-2">
                        {activeNode.resources.map((res, idx) => (
                          <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <BookOpen className="w-4 h-4 text-cyan-400" />
                              <div>
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                  {res.title}
                                </span>
                                <div className="text-[11px] text-slate-400">
                                  {res.provider} • {res.type}
                                </div>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended GitHub Repos */}
                  {activeNode.githubRepos && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Reference GitHub Repositories
                      </h3>
                      <div className="space-y-2">
                        {activeNode.githubRepos.map((repo, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800"
                          >
                            <div className="flex items-center gap-2.5">
                              <FolderGit2 className="w-4 h-4 text-violet-400" />
                              <div>
                                <span className="text-xs font-semibold text-slate-200">
                                  {repo.name}
                                </span>
                                <p className="text-[11px] text-slate-400">{repo.description}</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              ★ {repo.stars}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WEEKEND PROJECT */}
              {activeTab === 'project' && activeNode.weekendProject && (
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Suggested Weekend Project</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {activeNode.weekendProject.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {activeNode.weekendProject.description}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                      Core Implementation Requirements:
                    </h4>
                    <div className="space-y-2">
                      {activeNode.weekendProject.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <h4 className="font-semibold text-white mb-1">Portfolio Impact Tip:</h4>
                    Deploy this weekend project live and link the repository in your resume. Interviewers value runnable, interactive proof of competence far above self-reported skill ratings.
                  </div>
                </div>
              )}

              {/* TAB 3: SIX INTERVIEW QUESTIONS */}
              {activeTab === 'interview' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 leading-relaxed flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>
                      These 6 questions reflect actual technical screen and system design prompts asked at tier-1 companies for this skill.
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(activeNode.interviewQuestions || []).map((q, idx) => {
                      const isExpanded = expandedQuestionIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
                        >
                          <button
                            onClick={() =>
                              setExpandedQuestionIndex(isExpanded ? null : idx)
                            }
                            className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-slate-800/40 transition-colors"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                                {idx + 1}
                              </span>
                              <h4 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                                {q.question}
                              </h4>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3">
                              {q.hint && (
                                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                                  <span className="font-bold">Interview Hint: </span>
                                  {q.hint}
                                </div>
                              )}
                              {q.answer && (
                                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
                                  <span className="font-bold text-emerald-400 block mb-1 font-sans">
                                    Model Answer Rationale:
                                  </span>
                                  {q.answer}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: DONE WHEN CHECKLIST */}
              {activeTab === 'checklist' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div>
                      <h4 className="text-sm font-bold text-white">Measurable Readiness Checklist</h4>
                      <p className="text-xs text-slate-400">Complete all criteria to confidently verify this skill.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-cyan-400">
                        {checkedCount}/{totalChecklist}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {(activeNode.doneWhenChecklist || []).map((item) => {
                      const checked = !!nodeChecklist[item.id];
                      return (
                        <label
                          key={item.id}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            checked
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100'
                              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleChecklistItem(activeNode.id, item.id)}
                            className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4 bg-slate-800"
                          />
                          <span className="text-xs sm:text-sm leading-relaxed">{item.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-800/80 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => markNodeKnown(activeNode.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isKnown
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isKnown ? 'Marked as Known' : 'I Already Know This'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => markNodeComplete(activeNode.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
