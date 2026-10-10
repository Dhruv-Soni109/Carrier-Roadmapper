import React from 'react';
import { Sparkles, Code2, Award, Briefcase, Milestone, Trophy } from 'lucide-react';

export const getNodeTypeConfig = (type) => {
  switch (type) {
    case 'skill':
      return {
        label: 'Skill',
        icon: Code2,
        colorBg: 'bg-blue-500/10 dark:bg-blue-500/20',
        colorBorder: 'border-blue-500/30',
        colorText: 'text-blue-600 dark:text-blue-400',
        accentHex: '#3b82f6',
        cardGlow: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      };
    case 'project':
      return {
        label: 'Project',
        icon: Sparkles,
        colorBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        colorBorder: 'border-emerald-500/30',
        colorText: 'text-emerald-600 dark:text-emerald-400',
        accentHex: '#10b981',
        cardGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    case 'cert':
      return {
        label: 'Certification',
        icon: Award,
        colorBg: 'bg-amber-500/10 dark:bg-amber-500/20',
        colorBorder: 'border-amber-500/30',
        colorText: 'text-amber-600 dark:text-amber-400',
        accentHex: '#f59e0b',
        cardGlow: 'hover:border-amber-500/50 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    case 'role':
      return {
        label: 'Career Role',
        icon: Briefcase,
        colorBg: 'bg-pink-500/10 dark:bg-pink-500/20',
        colorBorder: 'border-pink-500/30',
        colorText: 'text-pink-600 dark:text-pink-400',
        accentHex: '#ec4899',
        cardGlow: 'hover:border-pink-500/50 hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]',
        badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      };
    case 'milestone':
      return {
        label: 'Milestone',
        icon: Milestone,
        colorBg: 'bg-violet-500/10 dark:bg-violet-500/20',
        colorBorder: 'border-violet-500/30',
        colorText: 'text-violet-600 dark:text-violet-400',
        accentHex: '#8b5cf6',
        cardGlow: 'hover:border-violet-500/50 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]',
        badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      };
    case 'target':
      return {
        label: 'Target Dream Job',
        icon: Trophy,
        colorBg: 'bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-violet-500/20',
        colorBorder: 'border-amber-500/50',
        colorText: 'text-amber-400',
        accentHex: '#f59e0b',
        cardGlow: 'border-amber-400/60 shadow-[0_0_35px_0_rgba(245,158,11,0.4)]',
        badgeBg: 'bg-gradient-to-r from-amber-500/30 to-pink-500/30 text-amber-200 border-amber-400/50',
      };
    default:
      return {
        label: 'Skill',
        icon: Code2,
        colorBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
        colorBorder: 'border-cyan-500/30',
        colorText: 'text-cyan-600 dark:text-cyan-400',
        accentHex: '#06b6d4',
        cardGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      };
  }
};

export const TypeBadge = ({ type, showIcon = true, size = 'sm' }) => {
  const config = getNodeTypeConfig(type);
  const Icon = config.icon;

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.badgeBg} ${sizeClasses}`}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
};
