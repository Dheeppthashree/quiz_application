import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function BadgeCelebration({ badges = [], onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBadge = badges[currentIndex];

  useEffect(() => {
    // Fire confetti when a new badge is shown
    if (currentBadge) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [currentIndex, currentBadge]);

  if (!currentBadge) return null;

  const handleNext = () => {
    if (currentIndex < badges.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="max-w-md w-full mx-4 bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-3xl p-8 shadow-2xl text-center transform animate-scale-in">
        <div className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] mb-4">
          Achievement Unlocked!
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
          <div className="relative text-9xl animate-bounce-in">
            {currentBadge.icon}
          </div>
        </div>

        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
          {currentBadge.name}
        </h2>
        
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          {currentBadge.description}
        </p>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-2xl font-black text-xl text-white shadow-xl shadow-orange-500/20 transform transition-all hover:scale-105 active:scale-95"
        >
          {currentIndex < badges.length - 1 ? 'Next Achievement!' : 'Awesome! Keep Playing'}
        </button>
        
        <div className="mt-4 text-gray-500 text-xs uppercase tracking-widest">
          {currentIndex + 1} of {badges.length} Earnt
        </div>
      </div>
    </div>
  );
}
