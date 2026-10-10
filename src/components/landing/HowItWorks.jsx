import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Cpu, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

const STEPS = [
  {
    step: '01',
    icon: Target,
    title: 'Enter Your Dream Role',
    desc: 'Specify your target company, role, or sector (e.g., Full Stack Dev at Climate Tech, Google AI/ML).',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30'
  },
  {
    step: '02',
    icon: Clock,
    title: 'Calibrate Your Schedule',
    desc: 'Set your realistic weekly available learning hours (5h to 40h) and target milestone period in months.',
    color: 'text-blue-400',
    border: 'border-blue-500/30'
  },
  {
    step: '03',
    icon: Cpu,
    title: 'Forge Your Skill Tree',
    desc: 'Our intelligent engine reverse-engineers a 5-phase DAG roadmap with strict prerequisite ordering.',
    color: 'text-violet-400',
    border: 'border-violet-500/30'
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Ship Projects & Master Qs',
    desc: 'Complete curated weekend projects, check off readiness criteria, and rehearse 6 real interview prompts.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  {
    step: '05',
    icon: Trophy,
    title: 'Reach Your Target Job',
    desc: 'Earn XP, unlock level badges, monitor remaining study hours, and trigger final celebration upon landing your offer.',
    color: 'text-amber-400',
    border: 'border-amber-500/30'
  }
];

export const HowItWorks = () => {
  const { setIsGeneratorOpen } = useRoadmap();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-[#080c16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>5-Step Execution Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How PathForge Navigates You to Victory
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From Day 1 ambiguity to final offer letter: follow an algorithmic, step-by-step career acceleration process.
          </p>
        </div>

        {/* 5-step horizontal timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 backdrop-blur-xl flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      STEP {item.step}
                    </span>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <span>Phase {idx + 1} of 5</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Begin Step 1: Forge Your Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
