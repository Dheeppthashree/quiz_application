import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create random particles for animated effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-orange-900 animate-gradient-shift"></div>
      
      {/* Animated overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 animate-pulse-slow"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Moving light rays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-yellow-300 to-transparent animate-slide-down"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent animate-slide-down" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-transparent via-orange-300 to-transparent animate-slide-down" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-radial-glow animate-pulse-slow opacity-30"></div>
      
      {/* Scan line effect - like a movie/game */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-32 animate-scan-line"></div>
      </div>
    </div>
  );
}
