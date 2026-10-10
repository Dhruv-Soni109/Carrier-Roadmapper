import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Laptop, ShieldCheck, Zap, Star } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { HeroGraphPreview } from './HeroGraphPreview';

export const HeroSection = () => {
  const { setIsGeneratorOpen, setViewMode } = useRoadmap();

  return (
    <section id="hero" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/20 to-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen AI Career Roadmap Generator</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Your Dream Career.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Reverse-Engineered.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Stop guessing what to learn. Let AI build your personalized roadmap from where you are to where you want to be.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
              >
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>Forge My Roadmap</span>
                <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setViewMode('dashboard')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>Explore Demo</span>
              </button>
            </div>

            {/* Social Proof Metric Chips */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Prerequisites Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Dynamic Dagre Graph</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Gamified XP & Badges</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graph Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <HeroGraphPreview onExplore={() => setViewMode('dashboard')} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
