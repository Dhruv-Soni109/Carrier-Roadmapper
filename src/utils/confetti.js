import confetti from 'canvas-confetti';

export const triggerCelebration = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#10b981', '#f59e0b', '#ec4899']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerPhaseConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24']
  });
};
