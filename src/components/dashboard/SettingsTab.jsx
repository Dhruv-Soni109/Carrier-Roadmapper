import React from 'react';
import { Settings, Moon, Sun, Trash2, Server, CheckCircle2, RotateCcw, Database } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { DEMO_ROADMAPS } from '../../data/demoRoadmaps';
import { storage } from '../../utils/storage';

export const SettingsTab = () => {
  const {
    theme,
    toggleTheme,
    currentRoadmap,
    loadRoadmap,
    addToast
  } = useRoadmap();

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all completed tasks and checklist progress for this roadmap?')) {
      storage.remove(`completed_${currentRoadmap.id}`);
      storage.remove(`known_${currentRoadmap.id}`);
      storage.remove(`checklist_${currentRoadmap.id}`);
      window.location.reload();
    }
  };

  const handleClearAllStorage = () => {
    if (confirm('Warning: This will clear all saved PathForge data across all roadmaps. Proceed?')) {
      storage.clearAll();
      window.location.reload();
    }
  };

  const backendUrl = import.meta.env.VITE_API_URL || null;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Application Preferences</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          System & Data Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
          Configure appearance, inspect backend connection status, or manage your stored progress.
        </p>
      </div>

      {/* Backend Integration Readiness Box */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Backend Integration Status</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {backendUrl ? 'Connected' : 'Demo Mode (Local Intelligent Engine)'}
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {backendUrl ? (
            <>Connected to backend API at <code className="text-cyan-300">{backendUrl}</code>.</>
          ) : (
            <>
              Running in <strong className="text-slate-200">Demo Mode</strong> using the built-in local roadmap synthesis engine. To connect to an external Node.js & Express API, configure the <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">VITE_API_URL</code> environment variable. All service wrappers (<code className="text-cyan-300">/api/roadmap</code>, <code className="text-cyan-300">/api/node</code>, <code className="text-cyan-300">/api/replan</code>) are pre-wired.
            </>
          )}
        </p>
      </div>

      {/* Quick Roadmap Switcher */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-violet-400" />
          <span>Switch Target Role Roadmap</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(DEMO_ROADMAPS).map(([k, r]) => (
            <button
              key={k}
              onClick={() => loadRoadmap(r)}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                currentRoadmap?.id === r.id
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200 font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white">{r.goal.split(' at ')[0]}</span>
                {currentRoadmap?.id === r.id && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                )}
              </div>
              <span className="text-[11px] text-slate-400">{r.industry} • {r.totalHours}h</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme & Appearance */}
      <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Color Theme</h3>
          <p className="text-xs text-slate-400">Toggle between Dark Navy and Clean Light mode</p>
        </div>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-2"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
          <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
        </button>
      </div>

      {/* Reset & Storage Cleanup */}
      <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-rose-300">Data Management</h3>
          <p className="text-xs text-rose-300/70">
            Reset current progress or clear all cached local roadmaps and XP.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleResetProgress}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Current Roadmap Progress</span>
          </button>

          <button
            onClick={handleClearAllStorage}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600/20 hover:bg-rose-600/30 text-rose-200 border border-rose-500/40 transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Cached Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
