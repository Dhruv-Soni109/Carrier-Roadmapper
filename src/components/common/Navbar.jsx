import React, { useState } from 'react';
import { Compass, Sparkles, Share2, Download, Plus, Menu, X, ArrowRight, Laptop } from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { ThemeToggle } from './ThemeToggle';
import { getShareableUrl } from '../../utils/shareUrl';

export const Navbar = () => {
  const {
    viewMode,
    setViewMode,
    currentRoadmap,
    calculateProgressMetrics,
    setIsGeneratorOpen,
    setIsExportOpen,
    addToast,
    setActiveTab
  } = useRoadmap();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const metrics = calculateProgressMetrics();

  const handleShare = async () => {
    if (!currentRoadmap) return;
    const url = getShareableUrl(currentRoadmap);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        addToast('Share Link Copied! 🔗', 'Compressed roadmap state URL copied to clipboard.', 'success');
      } else {
        prompt('Copy your shareable roadmap link:', url);
      }
    } catch (e) {
      prompt('Copy your shareable roadmap link:', url);
    }
  };

  const scrollToSection = (id) => {
    if (viewMode !== 'landing') {
      setViewMode('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b bg-slate-950/75 dark:bg-[#080c16]/80 border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#080c16] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                PathForge
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                AI
              </span>
            </div>
          </button>

          {/* If in Dashboard, show current career goal badge */}
          {viewMode === 'dashboard' && (
            <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium text-slate-200 truncate max-w-[220px]">
                  {currentRoadmap?.goal || 'Career Roadmap'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-400 font-semibold">{metrics.overallProgressPercent}% done</span>
              </div>
            </div>
          )}
        </div>

        {/* Center / Navigation Links for Landing mode */}
        {viewMode === 'landing' ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('problem')}
              className="hover:text-cyan-400 transition-colors"
            >
              Why PathForge
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-cyan-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-cyan-400 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setViewMode('dashboard');
                setActiveTab('explorer');
              }}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-violet-300 hover:text-violet-200"
            >
              <span>Explore Archetypes</span>
            </button>
          </nav>
        ) : (
          /* Dashboard Quick Tab Shortcuts */
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setViewMode('landing')}
              className="text-xs px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            >
              ← Landing Page
            </button>
          </div>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {viewMode === 'dashboard' ? (
            <>
              {/* Share button */}
              <button
                onClick={handleShare}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 transition-all shadow-sm"
                title="Copy shareable roadmap URL"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Share</span>
              </button>

              {/* Export button */}
              <button
                onClick={() => setIsExportOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 transition-all shadow-sm"
                title="Export roadmap as PNG, plan or print"
              >
                <Download className="w-3.5 h-3.5 text-violet-400" />
                <span>Export</span>
              </button>

              {/* New Roadmap Button */}
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Goal</span>
              </button>
            </>
          ) : (
            <>
              {/* Explore Demo CTA */}
              <button
                onClick={() => setViewMode('dashboard')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all"
              >
                <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Demo</span>
              </button>

              {/* Forge My Roadmap CTA */}
              <button
                onClick={() => setIsGeneratorOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Forge My Roadmap</span>
              </button>
            </>
          )}

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#080c16]/95 backdrop-blur-2xl px-4 py-4 space-y-3">
          {viewMode === 'landing' ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('problem')}
                className="text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
              >
                Why PathForge
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
              >
                How It Works
              </button>
              <button
                onClick={() => {
                  setViewMode('dashboard');
                  setActiveTab('explorer');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-sm text-violet-300 hover:text-violet-200"
              >
                Career Archetypes Explorer
              </button>
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setViewMode('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  Explore Demo Dashboard
                </button>
                <button
                  onClick={() => {
                    setIsGeneratorOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                >
                  Forge My Roadmap
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setViewMode('landing');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-sm text-slate-300 hover:text-cyan-400"
              >
                ← Return to Landing Page
              </button>
              <button
                onClick={() => {
                  handleShare();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-sm text-cyan-400 hover:text-cyan-300"
              >
                Copy Shareable Link
              </button>
              <button
                onClick={() => {
                  setIsExportOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-sm text-violet-400 hover:text-violet-300"
              >
                Export Roadmap
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
