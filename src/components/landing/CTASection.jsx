import React from 'react';
import { Sparkles, ArrowRight, Laptop } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

export const CTASection = () => {
  const { setIsGeneratorOpen, setViewMode } = useRoadmap();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-950">
      {/* Glow aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/15 to-violet-600/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#080c16] border border-cyan-500/30 shadow-[0_0_60px_-10px_rgba(6,182,212,0.25)] backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Demonstration Edition</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Stop Guessing Your Next Move.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent block sm:inline">
              Build Your Competitive Edge.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10">
            Generate an interactive visual skill tree, track your hours, build production-grade projects, and ace company interview loops.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Forge My Roadmap Now</span>
              <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Launch Live Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
