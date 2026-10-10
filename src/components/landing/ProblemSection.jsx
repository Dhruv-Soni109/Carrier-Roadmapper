import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Compass, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

const PAIN_POINTS = [
  {
    icon: XCircle,
    color: 'text-rose-400',
    title: 'Generic, One-Size-Fits-All Curriculums',
    desc: 'Traditional platforms give the exact same generic roadmap to everyone, ignoring company archetypes, industry domains, and prior skills.'
  },
  {
    icon: XCircle,
    color: 'text-amber-400',
    title: 'Obscure & Missing Prerequisites',
    desc: 'Tutorials encourage jumping straight into heavy frameworks without foundation, leading to cognitive overload and chronic tutorial hell.'
  },
  {
    icon: XCircle,
    color: 'text-orange-400',
    title: 'Zero Time-Budget Calibration',
    desc: 'Arbitrary completion claims that fail to adapt whether you have 5 hours or 30 hours per week, leaving learners burnt out with no realistic pace.'
  },
  {
    icon: XCircle,
    color: 'text-red-400',
    title: 'Irrelevant Tutorial Clones for Portfolios',
    desc: 'Students spend months building basic Todo apps and weather widgets that tech recruiters and engineering leads filter out on sight.'
  }
];

const PATHFORGE_ADVANTAGES = [
  {
    title: 'Reverse-Engineered From Target Job Postings',
    desc: 'We start at the exact company offer (e.g. Climate Tech, Google AI) and trace backward only the critical competencies demanded.'
  },
  {
    title: 'Strict Directed Acyclic Graph (DAG) Dependencies',
    desc: 'Clear visual skill trees where every node illuminates its direct upstream prerequisites and unlocks downstream opportunities.'
  },
  {
    title: 'Algorithmic Time-Budgeting & Re-Planning',
    desc: 'Dynamic pacing formulas calculating precise weekly hours, target months, and warning flags if your schedule is overextended.'
  },
  {
    title: 'Domain-Grade Capstone & Interview Scenarios',
    desc: 'Every milestone pairs with a production weekend project and 6 real company interview questions with technical hints.'
  }
];

export const ProblemSection = () => {
  const { setIsGeneratorOpen } = useRoadmap();

  return (
    <section id="problem" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Broken Reality of Career Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Why 80% of Self-Learners Get Stuck in Tutorial Hell
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The tech industry is flooded with unstructured tutorials and outdated advice. You don't need more content — you need navigation intelligence.
          </p>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Traditional Guidance (The Problem) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/40 border border-rose-500/20 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Traditional Career Guidance</h3>
                <span className="text-xs text-rose-400 font-medium">Guesswork, Disjointed & Inefficient</span>
              </div>
            </div>

            <div className="space-y-4">
              {PAIN_POINTS.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <Icon className={`w-5 h-5 ${pt.color} shrink-0 mt-0.5`} />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{pt.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: PathForge Reverse-Engineered Navigation (The Solution) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/30 via-slate-900/80 to-blue-950/40 border border-cyan-500/40 shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)] backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The PathForge Navigation Engine</h3>
                <span className="text-xs text-cyan-400 font-medium">Precision AI Reverse-Engineering</span>
              </div>
            </div>

            <div className="space-y-4">
              {PATHFORGE_ADVANTAGES.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{adv.title}</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-cyan-500/20 flex items-center justify-between">
              <span className="text-xs text-cyan-300 font-medium">Ready to map your exact trajectory?</span>
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Forge Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
