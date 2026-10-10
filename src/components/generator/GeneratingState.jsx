import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';

const GENERATION_STEPS = [
  { icon: Compass, text: 'Analyzing target role trajectory & industry benchmarks...' },
  { icon: Cpu, text: 'Reverse-engineering core prerequisites & skill dependencies...' },
  { icon: Layers, text: 'Synthesizing 5-phase DAG graph & capstone projects...' },
  { icon: Database, text: 'Generating 6 technical interview scenarios per node...' },
  { icon: ShieldCheck, text: 'Calibrating time-budget pacing & milestone schedule...' },
  { icon: CheckCircle2, text: 'Personalized career roadmap ready!' }
];

export const GeneratingState = ({ onComplete, isReady = false }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        // If we reach the step before last and AI is still computing, wait there
        if (prev === GENERATION_STEPS.length - 2 && !isReady) {
          return prev;
        }

        if (prev < GENERATION_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete, isReady]);

  // If AI data arrives while we are waiting at step 4, immediately transition to step 5 (100%) and complete
  useEffect(() => {
    if (isReady && currentStepIndex >= GENERATION_STEPS.length - 2) {
      setCurrentStepIndex(GENERATION_STEPS.length - 1);
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isReady, currentStepIndex, onComplete]);

  const step = GENERATION_STEPS[currentStepIndex];
  const StepIcon = step.icon;
  const progressPercent = Math.round(((currentStepIndex + 1) / GENERATION_STEPS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center min-h-[360px]">
      {/* Animated glowing core */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 blur-2xl opacity-60 animate-pulse"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-1 shadow-2xl relative"
        >
          <div className="w-full h-full bg-[#080c16] rounded-[22px] flex items-center justify-center">
            <StepIcon className="w-10 h-10 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
        Forging Your Career Roadmap
      </h3>
      <p className="text-xs sm:text-sm text-cyan-300 font-mono mb-6 h-6 animate-pulse">
        {step.text}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-slate-700/60 p-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full"
          initial={{ width: '15%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <span className="text-[11px] font-semibold text-slate-400 mt-2">
        {progressPercent}% Synthesized
      </span>
    </div>
  );
};
