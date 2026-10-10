import React from 'react';
import { useRoadmap } from '../../context/RoadmapContext';
import { Sidebar } from './Sidebar';
import { OverviewTab } from './OverviewTab';
import { SkillTreeCanvas } from '../roadmap/SkillTreeCanvas';
import { SmartPlanner } from '../planner/SmartPlanner';
import { ResourcesTab } from './ResourcesTab';
import { ProjectsTab } from './ProjectsTab';
import { InterviewTab } from './InterviewTab';
import { CareerExplorer } from '../explorer/CareerExplorer';
import { CareerComparison } from '../comparison/CareerComparison';
import { SettingsTab } from './SettingsTab';
import { NodeDetailsDrawer } from '../roadmap/NodeDetailsDrawer';
import {
  LayoutDashboard,
  GitFork,
  BookOpen,
  Sparkles,
  HelpCircle,
  Compass,
  GitCompare,
  Calendar,
  Settings
} from 'lucide-react';

const MOBILE_NAV = [
  { id: 'roadmap', label: 'Tree', icon: GitFork },
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'planner', label: 'Planner', icon: Calendar },
  { id: 'projects', label: 'Projects', icon: Sparkles },
  { id: 'interview', label: 'Interview', icon: HelpCircle },
  { id: 'explorer', label: 'Paths', icon: Compass },
  { id: 'compare', label: 'Compare', icon: GitCompare },
  { id: 'settings', label: 'Config', icon: Settings },
];

export const DashboardLayout = () => {
  const { activeTab, setActiveTab } = useRoadmap();

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-[#080c16]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main id="dashboard-content" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl 2xl:max-w-[1600px] mx-auto w-full pb-20 md:pb-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Interactive Career Skill Tree
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Hierarchical DAG graph layout. Click any node to explore curriculum, resources & 6 interview questions.
                </p>
              </div>

              {/* Legend Badges */}
              <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                  <span>Skills</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                  <span>Certs</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></span>
                  <span>Roles</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
                  <span>Milestones</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="font-semibold text-yellow-300">Dream Job</span>
                </div>
              </div>
            </div>
            <SkillTreeCanvas />
          </div>
        )}
        {activeTab === 'planner' && <SmartPlanner />}
        {activeTab === 'resources' && <ResourcesTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'interview' && <InterviewTab />}
        {activeTab === 'explorer' && <CareerExplorer />}
        {activeTab === 'compare' && <CareerComparison />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around overflow-x-auto">
        {MOBILE_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-all shrink-0 ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Global Node Details Slide-In Drawer */}
      <NodeDetailsDrawer />
    </div>
  );
};
