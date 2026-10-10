import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Check, Lock, CheckCircle2, Award, Sparkles, Trophy, Clock, Zap, Info } from 'lucide-react';
import { getNodeTypeConfig } from '../common/Badge';

export const CustomNode = memo(({ id, data, selected }) => {
  const {
    title,
    type = 'skill',
    hours = 0,
    status = 'available', // 'completed' | 'known' | 'available' | 'locked'
    isTarget = false,
    phase = 1,
    phaseName = '',
    onToggleComplete,
    onSelectDetails
  } = data;

  const config = getNodeTypeConfig(type);
  const Icon = config.icon;

  const isCompleted = status === 'completed';
  const isKnown = status === 'known';
  const isLocked = status === 'locked';

  // Target Node special styling
  if (isTarget) {
    return (
      <div
        onClick={() => onSelectDetails?.(id)}
        className={`relative group rounded-2xl p-4 transition-all duration-300 cursor-pointer min-w-[270px] max-w-[310px] ${
          selected ? 'ring-2 ring-amber-400 scale-[1.03]' : ''
        } ${
          isCompleted
            ? 'bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-amber-900/60 border-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.5)]'
            : 'bg-gradient-to-br from-slate-900/95 via-indigo-950/60 to-purple-950/70 border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]'
        }`}
      >
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-amber-400 !border-2 !border-slate-900"
        />

        {/* Ambient Trophy Aura */}
        <div className="absolute -top-3 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1">
          <Trophy className="w-3 h-3 fill-slate-950" />
          <span>Dream Job</span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-lg shadow-amber-500/30">
            <Trophy className="w-5 h-5 fill-slate-950" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Phase 5 • Ultimate Milestone
            </span>
            <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mt-0.5">
              {title}
            </h3>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-amber-300 font-medium text-[11px]">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>1,000 XP Capstone</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete?.(id);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              isCompleted
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
            }`}
          >
            {isCompleted ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{isCompleted ? 'Achieved!' : 'Mark Achieved'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Standard Phase Node
  return (
    <div
      onClick={() => onSelectDetails?.(id)}
      className={`relative group rounded-xl p-3.5 transition-all duration-300 cursor-pointer min-w-[240px] max-w-[270px] backdrop-blur-xl border ${
        isLocked
          ? 'bg-slate-950/60 border-slate-800/60 opacity-60 grayscale-[40%] hover:opacity-80'
          : isCompleted
          ? 'bg-slate-900/90 border-emerald-500/60 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
          : isKnown
          ? 'bg-slate-900/90 border-cyan-500/60 shadow-[0_0_20px_-3px_rgba(6,182,212,0.25)]'
          : `bg-slate-900/80 ${config.colorBorder} ${config.cardGlow}`
      } ${selected ? 'ring-2 ring-cyan-400 scale-[1.02]' : ''}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={`!w-2.5 !h-2.5 !border-2 !border-slate-900 ${
          isCompleted ? '!bg-emerald-400' : isKnown ? '!bg-cyan-400' : '!bg-slate-500'
        }`}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={`!w-2.5 !h-2.5 !border-2 !border-slate-900 ${
          isCompleted ? '!bg-emerald-400' : isKnown ? '!bg-cyan-400' : '!bg-slate-500'
        }`}
      />

      {/* Top Header Row: Badge & Status */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${config.badgeBg}`}
        >
          <Icon className="w-3 h-3" />
          <span>{config.label}</span>
        </span>

        {/* State Pill */}
        <div className="flex items-center gap-1">
          {isCompleted && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              <span>Done</span>
            </span>
          )}
          {isKnown && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-3 h-3" />
              <span>Known</span>
            </span>
          )}
          {isLocked && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
              <Lock className="w-2.5 h-2.5" />
              <span>Locked</span>
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
        {title}
      </h4>

      {/* Bottom Stats & Quick Actions */}
      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{hours}h est.</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectDetails?.(id);
            }}
            className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
            title="View details & interview questions"
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete?.(id);
            }}
            className={`p-1 rounded transition-colors ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
            }`}
            title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
});
