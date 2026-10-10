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
      <main id="dashboard-content" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Interactive Career Skill Tree
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Hierarchical DAG graph layout. Click any node to explore curriculum, resources & 6 interview questions.
                </p>
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
