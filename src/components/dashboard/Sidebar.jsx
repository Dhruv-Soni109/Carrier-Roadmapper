import React from 'react';
import {
  LayoutDashboard,
  GitFork,
  BookOpen,
  Sparkles,
  HelpCircle,
  Compass,
  GitCompare,
  Calendar,
  Settings,
  Flame,
  Award
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'roadmap', label: 'My Roadmap', icon: GitFork, badge: 'Interactive' },
  { id: 'planner', label: 'Smart Planner', icon: Calendar },
  { id: 'resources', label: 'Learning Resources', icon: BookOpen },
  { id: 'projects', label: 'AI Projects', icon: Sparkles },
  { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
  { id: 'explorer', label: 'Career Archetypes', icon: Compass },
  { id: 'compare', label: 'Compare Careers', icon: GitCompare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab, calculateGamification } = useRoadmap();
  const gamification = calculateGamification();

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col justify-between border-r border-slate-800/80 bg-[#080c16]/95 backdrop-blur-xl p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* User Level Mini Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0e1628] border border-cyan-500/20 shadow-md">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Level {gamification.currentRank.level}</span>
            </span>
            <span className="font-mono text-cyan-400 font-bold text-[11px]">
              {gamification.totalXp} XP
            </span>
          </div>
          <p className="text-[11px] font-semibold text-slate-300 mb-2 truncate">
            {gamification.currentRank.title}
          </p>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${gamification.progressInLevel}%` }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
            Navigation
          </span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Hint */}
      <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
          <Flame className="w-3.5 h-3.5" />
          <span>Demo Engine Active</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Full persistence enabled via LocalStorage. State remains across page reloads.
        </p>
      </div>
    </aside>
  );
};
