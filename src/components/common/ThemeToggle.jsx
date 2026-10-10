import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';

export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useRoadmap();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 border ${
        isDark
          ? 'bg-slate-800/80 border-slate-700/60 text-amber-300 hover:text-amber-200 hover:bg-slate-700/80'
          : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
      } ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme mode"
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
