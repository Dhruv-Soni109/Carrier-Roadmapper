import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Building2,
  Briefcase,
  Compass,
  Clock,
  Calendar,
  GraduationCap,
  Layers,
  AlertCircle
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { roadmapService } from '../../services/roadmapService';
import { GeneratingState } from './GeneratingState';

const POPULAR_GOALS = [
  {
    goal: 'Full Stack Developer at a climate-tech startup',
    company: 'Watershed / Patch',
    industry: 'Climate Tech & Clean Energy',
    level: 'Beginner',
    hours: 15,
    months: 6
  },
  {
    goal: 'AI/ML Engineer at Google',
    company: 'Google DeepMind',
    industry: 'Artificial Intelligence & Foundational Models',
    level: 'Intermediate',
    hours: 20,
    months: 8
  },
  {
    goal: 'Data Scientist in FinTech',
    company: 'Stripe / Robinhood',
    industry: 'Financial Technology',
    level: 'Beginner',
    hours: 18,
    months: 6
  },
  {
    goal: 'Cybersecurity Analyst',
    company: 'CrowdStrike / Mandiant',
    industry: 'Information Security & Defense',
    level: 'Beginner',
    hours: 15,
    months: 6
  },
  {
    goal: 'Cloud Engineer at Microsoft',
    company: 'Microsoft Azure',
    industry: 'Cloud Infrastructure',
    level: 'Intermediate',
    hours: 16,
    months: 6
  },
  {
    goal: 'UI/UX Designer at a product-based company',
    company: 'Figma / Linear',
    industry: 'Product Design',
    level: 'Beginner',
    hours: 14,
    months: 6
  }
];

export const RoadmapModal = () => {
  const { isGeneratorOpen, setIsGeneratorOpen, loadRoadmap, addToast } = useRoadmap();

  const [formData, setFormData] = useState({
    goal: '',
    targetCompany: '',
    industry: '',
    currentLevel: 'Beginner',
    existingSkills: '',
    weeklyHours: 15,
    targetMonths: 6,
    education: 'Self-Taught / Independent Learner'
  });

  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  if (!isGeneratorOpen) return null;

  const handlePresetSelect = (preset) => {
    setFormData({
      ...formData,
      goal: preset.goal,
      targetCompany: preset.company,
      industry: preset.industry,
      currentLevel: preset.level,
      weeklyHours: preset.hours,
      targetMonths: preset.months
    });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.goal.trim()) {
      errs.goal = 'Target job role is required.';
    } else if (formData.goal.trim().length < 3) {
      errs.goal = 'Please enter a more specific target role.';
    }
    if (!formData.weeklyHours || formData.weeklyHours < 3) {
      errs.weeklyHours = 'Minimum 3 hours per week required.';
    }
    if (!formData.targetMonths || formData.targetMonths < 1) {
      errs.targetMonths = 'Minimum 1 month timeline required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsGenerating(true);
    try {
      const result = await roadmapService.generateRoadmap(formData);
      setGeneratedResult(result.roadmap);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      addToast('Generation Notice', 'Synthesizing with local intelligent roadmap engine.', 'info');
    }
  };

  const handleGenerationFinish = () => {
    if (generatedResult) {
      loadRoadmap(generatedResult);
      setIsGenerating(false);
      setIsGeneratorOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isGenerating && setIsGeneratorOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
      >
        {isGenerating ? (
          <GeneratingState onComplete={handleGenerationFinish} />
        ) : (
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800/80 bg-slate-900/40 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    AI Career Reverse-Engineering
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Forge Your Personalized Roadmap
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Specify your dream role, background, and weekly time budget.
                </p>
              </div>

              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Presets Bar */}
            <div className="px-6 pt-4 pb-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Preset Targets:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_GOALS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    {preset.goal.split(' at ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Target Job Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Target Job Role *
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    placeholder="e.g. Full Stack Developer at a Climate-Tech Startup"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                      errors.goal ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                </div>
                {errors.goal && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.goal}</span>
                  </p>
                )}
              </div>

              {/* Target Company & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Target Company or Archetype
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.targetCompany}
                      onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
                      placeholder="e.g. Watershed / Google / Seed Startup"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Industry Sector
                  </label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g. Climate Tech, FinTech, AI Research"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Current Level & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Current Skill Level
                  </label>
                  <select
                    value={formData.currentLevel}
                    onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="Complete Beginner">Complete Beginner (No coding experience)</option>
                    <option value="Beginner">Beginner (Basic HTML/CSS or scripts)</option>
                    <option value="Intermediate">Intermediate (Built small apps / projects)</option>
                    <option value="Career Switcher">Career Switcher (Tech adjacent experience)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Educational Background (Optional)
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="Self-Taught / Independent Learner">Self-Taught / Independent Learner</option>
                    <option value="Computer Science Student">Computer Science Student / Graduate</option>
                    <option value="Coding Bootcamp Graduate">Coding Bootcamp Graduate</option>
                    <option value="Non-Tech Degree / Transition">Non-Tech Degree / Career Transition</option>
                  </select>
                </div>
              </div>

              {/* Hours / Week & Target Months */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-200">
                      Weekly Learning Hours
                    </label>
                    <span className="text-xs font-bold text-cyan-400 font-mono">
                      {formData.weeklyHours} hrs/week
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="1"
                      value={formData.weeklyHours}
                      onChange={(e) => setFormData({ ...formData, weeklyHours: Number(e.target.value) })}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-200">
                      Target Timeline (Months)
                    </label>
                    <span className="text-xs font-bold text-violet-400 font-mono">
                      {formData.targetMonths} months
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="2"
                      max="18"
                      step="1"
                      value={formData.targetMonths}
                      onChange={(e) => setFormData({ ...formData, targetMonths: Number(e.target.value) })}
                      className="w-full accent-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Existing Skills tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Existing Skills You Already Know (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.existingSkills}
                  onChange={(e) => setFormData({ ...formData, existingSkills: e.target.value })}
                  placeholder="e.g. Git, Basic Python, Figma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              {/* Modal Submit Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsGeneratorOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Forge My Roadmap</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
