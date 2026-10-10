import React from 'react';
import { Compass, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060913] py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5">
            <div className="w-full h-full bg-[#080c16] rounded-[6px] flex items-center justify-center">
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold text-slate-200">PathForge</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">AI-Powered Career Roadmap Generator</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-slate-400">Built with React 18, React Flow, Dagre & Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <span>SaaS Hackathon Demo</span>
          <span>•</span>
          <span>Local Intelligent Engine Enabled</span>
        </div>
      </div>
    </footer>
  );
};
