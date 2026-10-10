import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Layers,
  Star
} from 'lucide-react';
import { useRoadmap } from '../../context/RoadmapContext';
import { roadmapService } from '../../services/roadmapService';

export const SmartPlanner = () => {
  const {
    currentRoadmap,
    loadRoadmap,
    calculateProgressMetrics,
    completedNodes,
    knownNodes,
    setActiveNodeId,
    addToast
  } = useRoadmap();

  const metrics = calculateProgressMetrics();

  const [weeklyHours, setWeeklyHours] = useState(currentRoadmap?.weeklyHours || 15);
  const [targetMonths, setTargetMonths] = useState(currentRoadmap?.targetMonths || 6);
  const [isReplanning, setIsReplanning] = useState(false);

  // Time budget calculation
  // Total hours available = weeklyHours * (targetMonths * 4.33 weeks)
  const totalWeeks = Math.round(targetMonths * 4.33);
  const totalAvailableBudget = Math.round(weeklyHours * totalWeeks);
  const remainingHoursNeeded = metrics.remainingHours;
  const isBudgetInsufficient = totalAvailableBudget < remainingHoursNeeded;
  const deficitHours = remainingHoursNeeded - totalAvailableBudget;

  // Split tasks into Priority (Foundations & Core) vs Stretch (Certifications & Advanced polish)
  const priorityTasks = (currentRoadmap?.nodes || []).filter(
    (n) => n.phase <= 3 && !completedNodes.has(n.id) && !knownNodes.has(n.id)
  );

  const stretchTasks = (currentRoadmap?.nodes || []).filter(
    (n) => n.phase > 3 && !completedNodes.has(n.id) && !knownNodes.has(n.id)
  );

  // Weekly study schedule sample slots
  const weeklySchedule = [
    { day: 'Mon & Tue (Deep Work)', hours: Math.round(weeklyHours * 0.35), focus: 'Core Mental Models & Theory' },
    { day: 'Wed & Thu (Hands-on Lab)', hours: Math.round(weeklyHours * 0.35), focus: 'Coding Drills & Component Building' },
    { day: 'Sat & Sun (Weekend Project)', hours: Math.round(weeklyHours * 0.3), focus: 'Weekend Project Shipping & Interview Practice' }
  ];

  const handleReplan = async () => {
    setIsReplanning(true);
    try {
      const res = await roadmapService.replanRoadmap(currentRoadmap, weeklyHours, targetMonths);
      loadRoadmap(res.roadmap);
      addToast('Roadmap Re-planned! 📅', `Recalibrated for ${weeklyHours}h/week over ${targetMonths} months.`, 'success');
    } catch (e) {
      console.error(e);
    } finally {
      setIsReplanning(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Smart Learning Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Time-Budget & Pacing Calibration
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Adjust your weekly available hours and target timeline. The planner validates your schedule against the curriculum scope.
          </p>
        </div>

        <button
          onClick={handleReplan}
          disabled={isReplanning}
          className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-violet-500 via-indigo-600 to-cyan-600 hover:opacity-95 shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isReplanning ? 'animate-spin' : ''}`} />
          <span>{isReplanning ? 'Recalculating...' : 'Re-plan My Roadmap'}</span>
        </button>
      </div>

      {/* Warning Notice if Insufficient Time Budget */}
      {isBudgetInsufficient && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3.5 shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-300">
              Schedule Warning: Estimated Hours Exceed Your Time Budget
            </h4>
            <p className="text-amber-200/90 leading-relaxed">
              At <strong className="text-white">{weeklyHours} hours/week</strong> for{' '}
              <strong className="text-white">{targetMonths} months</strong>, you have approximately{' '}
              <strong className="text-white">{totalAvailableBudget} available study hours</strong>, but{' '}
              <strong className="text-white">{remainingHoursNeeded} hours</strong> remain.
            </p>
            <p className="text-xs text-amber-300 font-semibold pt-1">
              Recommendation: Prioritize core Foundation skills first, mark skills you already know as verified, or extend your timeline by{' '}
              {Math.ceil(deficitHours / (weeklyHours * 4.33))} month(s).
            </p>
          </div>
        </div>
      )}

      {/* Pacing Controls & Calculations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Sliders */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white">Interactive Pacing Selectors</h3>

          {/* Weekly Hours Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Weekly Available Learning Hours
              </label>
              <span className="text-base font-bold text-cyan-400 font-mono">
                {weeklyHours} hrs / week
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5h (Casual)</span>
              <span>15h (Recommended)</span>
              <span>40h (Full-time Bootcamp)</span>
            </div>
          </div>

          {/* Target Months Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Target Completion Horizon
              </label>
              <span className="text-base font-bold text-violet-400 font-mono">
                {targetMonths} Months
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="18"
              step="1"
              value={targetMonths}
              onChange={(e) => setTargetMonths(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>2 Months (Sprint)</span>
              <span>6 Months (Balanced)</span>
              <span>18 Months (Long-term)</span>
            </div>
          </div>

          {/* Calculation Breakdown Cards */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Budget</span>
              <p className="text-lg font-bold text-white font-mono mt-1">
                {totalAvailableBudget}h
              </p>
              <span className="text-[10px] text-slate-500">across {totalWeeks} weeks</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Remaining Hours</span>
              <p className="text-lg font-bold text-cyan-400 font-mono mt-1">
                {remainingHoursNeeded}h
              </p>
              <span className="text-[10px] text-slate-500">curriculum work</span>
            </div>
          </div>
        </div>

        {/* Right: Suggested Weekly Schedule */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Suggested Weekly Learning Schedule</h3>
            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              {weeklyHours}h / week total
            </span>
          </div>

          <div className="space-y-3">
            {weeklySchedule.map((slot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{slot.day}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{slot.focus}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
                  {slot.hours} hrs
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
            * Locally calculated estimate based on average developer cognitive retention curves. Adjust schedule according to your personal commitments.
          </p>
        </div>
      </div>

      {/* Priority Tasks vs Stretch Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Priority Tasks */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h3 className="text-base font-bold text-white">Priority Core Tasks</h3>
            <span className="text-xs text-slate-400">({priorityTasks.length} pending)</span>
          </div>
          <div className="space-y-2.5">
            {priorityTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                onClick={() => setActiveNodeId(task.id)}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{task.title}</h4>
                  <span className="text-[11px] text-slate-400">Phase {task.phase} • {task.hours}h</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 hover:text-cyan-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Stretch Tasks */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-bold text-white">Stretch & Capstone Tasks</h3>
            <span className="text-xs text-slate-400">({stretchTasks.length} pending)</span>
          </div>
          <div className="space-y-2.5">
            {stretchTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                onClick={() => setActiveNodeId(task.id)}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-violet-500/40 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{task.title}</h4>
                  <span className="text-[11px] text-slate-400">Phase {task.phase} • {task.hours}h</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 hover:text-violet-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
