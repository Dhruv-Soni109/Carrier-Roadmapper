import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  GitFork,
  Calendar,
  Sparkles,
  HelpCircle,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

const FEATURES = [
  {
    icon: Compass,
    title: 'AI-Powered Career Roadmaps',
    description: 'Reverse-engineered from specific companies and roles. Transform ambiguous goals into unambiguous 5-phase engineering pathways.',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    badge: 'Core Engine'
  },
  {
    icon: GitFork,
    title: 'Interactive DAG Skill Tree',
    description: 'Central React Flow canvas with automatic Dagre layout, zoom/pan controls, minimap, prerequisite cascade unlocks, and animated edges.',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    badge: 'React Flow'
  },
  {
    icon: Calendar,
    title: 'Personalized Learning Timeline',
    description: 'Dynamic time-budget calculator factoring your actual weekly study hours, target completion months, and pacing warnings.',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
    badge: 'Smart Planner'
  },
  {
    icon: Sparkles,
    title: 'AI Project Generator',
    description: 'Every milestone pairs with a domain-specific weekend project specification designed to showcase genuine production value on your GitHub.',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    badge: 'Portfolio Ready'
  },
  {
    icon: HelpCircle,
    title: 'Interview Preparation',
    description: 'Six targeted technical screening questions with architectural hints and model answers attached to every skill node.',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    badge: '6 Questions / Node'
  },
  {
    icon: Trophy,
    title: 'Smart Progress & Gamification',
    description: 'Earn XP for every completed skill or verified knowledge node. Unlock achievement badges, level up, and trigger celebrations upon reaching your dream role.',
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    border: 'border-pink-500/30',
    iconColor: 'text-pink-400',
    badge: 'Gamified'
  }
];

export const FeatureGrid = () => {
  const { setViewMode, setActiveTab } = useRoadmap();

  return (
    <section id="features" className="py-20 lg:py-28 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive SaaS Feature Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Engineered for High-Velocity Career Acceleration
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every feature is purposefully designed to eliminate ambiguity, enforce high-standards craft, and guide you directly into hireable competence.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className={`p-7 rounded-3xl bg-slate-900/60 border ${feat.border} hover:border-cyan-400/50 shadow-xl backdrop-blur-xl relative overflow-hidden group flex flex-col justify-between`}
              >
                {/* Gradient background accent */}
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${feat.gradient} blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 group-hover:border-cyan-500/40 shadow-md">
                      <Icon className={`w-6 h-6 ${feat.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                  <span>Explore Feature</span>
                  <button
                    onClick={() => {
                      setViewMode('dashboard');
                      if (feat.title.includes('Timeline')) setActiveTab('planner');
                      else if (feat.title.includes('Interview')) setActiveTab('interview');
                      else if (feat.title.includes('Project')) setActiveTab('projects');
                      else setActiveTab('roadmap');
                    }}
                    className="flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>View in Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
