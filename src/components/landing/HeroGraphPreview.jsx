import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Sparkles, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const PREVIEW_NODES = [
  { id: '1', title: 'HTML & CSS', type: 'skill', color: 'border-blue-500/60 bg-blue-950/40 text-blue-300', status: 'Done', x: 20, y: 30 },
  { id: '2', title: 'JavaScript Core', type: 'skill', color: 'border-blue-500/60 bg-blue-950/40 text-blue-300', status: 'Done', x: 170, y: 30 },
  { id: '3', title: 'React 18 & Hooks', type: 'skill', color: 'border-cyan-500/70 bg-cyan-950/50 text-cyan-300', status: 'In Progress', x: 320, y: 30 },
  { id: '4', title: 'Node.js & Postgres', type: 'skill', color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300', status: 'Next', x: 170, y: 150 },
  { id: '5', title: 'Carbon Tracker Capstone', type: 'project', color: 'border-emerald-500/70 bg-emerald-950/50 text-emerald-300', status: 'Next', x: 320, y: 150 },
  { id: '6', title: 'Full Stack Climate Dev', type: 'target', color: 'border-amber-400 bg-amber-950/70 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.4)]', status: 'Dream Job', x: 480, y: 90 },
];

export const HeroGraphPreview = ({ onExplore }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl p-6 bg-gradient-to-br from-slate-900/90 via-[#0a0f1d] to-[#12192c] border border-cyan-500/30 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)] backdrop-blur-2xl overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

      {/* Header bar of preview */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">Live Skill Graph Preview</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Target: Climate-Tech
        </span>
      </div>

      {/* Visual node canvas simulation */}
      <div className="relative h-64 sm:h-72 w-full">
        {/* SVG Bezier Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Node 1 to Node 2 */}
          <path d="M 120 48 C 140 48, 150 48, 170 48" stroke="#10b981" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
          {/* Node 2 to Node 3 */}
          <path d="M 270 48 C 295 48, 295 48, 320 48" stroke="url(#lineGrad1)" strokeWidth="2.5" fill="none" />
          {/* Node 2 to Node 4 */}
          <path d="M 220 70 C 220 110, 220 120, 220 150" stroke="#38bdf8" strokeWidth="2" fill="none" />
          {/* Node 4 to Node 5 */}
          <path d="M 270 170 C 295 170, 295 170, 320 170" stroke="#10b981" strokeWidth="2.5" fill="none" />
          {/* Node 3 to Target */}
          <path d="M 420 55 C 450 65, 450 90, 480 105" stroke="url(#lineGrad2)" strokeWidth="2.5" fill="none" />
          {/* Node 5 to Target */}
          <path d="M 420 165 C 450 145, 450 120, 480 115" stroke="#10b981" strokeWidth="2.5" fill="none" />
        </svg>

        {/* Nodes */}
        {/* Node 1: HTML/CSS */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1 top-4 p-2.5 rounded-xl border border-blue-500/50 bg-slate-900/90 shadow-md text-left w-32"
        >
          <div className="flex items-center justify-between text-[10px] text-blue-400 font-semibold mb-1">
            <span>Skill</span>
            <span className="text-emerald-400 flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> Done
            </span>
          </div>
          <p className="text-xs font-bold text-white">HTML & CSS</p>
        </motion.div>

        {/* Node 2: JavaScript */}
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute left-36 top-4 p-2.5 rounded-xl border border-blue-500/50 bg-slate-900/90 shadow-md text-left w-32"
        >
          <div className="flex items-center justify-between text-[10px] text-blue-400 font-semibold mb-1">
            <span>Skill</span>
            <span className="text-emerald-400 flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> Done
            </span>
          </div>
          <p className="text-xs font-bold text-white">JavaScript Core</p>
        </motion.div>

        {/* Node 3: React 18 */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute left-72 top-4 p-2.5 rounded-xl border-2 border-cyan-400 bg-cyan-950/60 shadow-[0_0_15px_rgba(6,182,212,0.4)] text-left w-32"
        >
          <div className="flex items-center justify-between text-[10px] text-cyan-300 font-semibold mb-1">
            <span>Active</span>
            <span className="animate-pulse text-cyan-200">● Learning</span>
          </div>
          <p className="text-xs font-bold text-white">React 18 & TS</p>
        </motion.div>

        {/* Node 4: Backend Node/Postgres */}
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute left-36 bottom-6 p-2.5 rounded-xl border border-indigo-500/50 bg-slate-900/90 shadow-md text-left w-32"
        >
          <div className="flex items-center justify-between text-[10px] text-indigo-400 font-semibold mb-1">
            <span>Skill</span>
            <span className="text-slate-400">45h est.</span>
          </div>
          <p className="text-xs font-bold text-white">Node & Postgres</p>
        </motion.div>

        {/* Node 5: Project Capstone */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute left-72 bottom-6 p-2.5 rounded-xl border border-emerald-500/70 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] text-left w-32"
        >
          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Project
            </span>
            <span className="text-amber-400">+400 XP</span>
          </div>
          <p className="text-xs font-bold text-white leading-tight">EcoPulse SaaS</p>
        </motion.div>

        {/* Node 6: Target Role Trophy Node */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-2 top-20 p-3 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-950/90 to-slate-900 text-left w-36 shadow-[0_0_30px_rgba(245,158,11,0.4)] cursor-pointer"
          onClick={onExplore}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-amber-300 mb-1">
            <Trophy className="w-3.5 h-3.5 fill-amber-400" />
            <span>Target Role</span>
          </div>
          <p className="text-xs font-bold text-white leading-snug">
            Full Stack Climate Dev
          </p>
          <span className="text-[10px] text-amber-300 font-mono mt-1 block">
            Watershed / Patch
          </span>
        </motion.div>
      </div>

      {/* Footer Banner */}
      <div className="mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>5 Connected Phases • 12 Milestones</span>
        <button
          onClick={onExplore}
          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
        >
          <span>Open Full Interactive Tree</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
