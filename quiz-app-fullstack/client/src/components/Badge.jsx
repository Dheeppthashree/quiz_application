import { useState } from 'react';

export default function Badge({ badge, isLocked = false, showAnimation = false }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div 
        className={`
          relative w-20 h-20 rounded-full flex items-center justify-center text-4xl
          transition-all duration-300 cursor-pointer
          ${isLocked 
            ? 'bg-gray-700/50 grayscale opacity-50' 
            : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg hover:scale-110'
          }
          ${showAnimation ? 'animate-bounce-in' : ''}
        `}
      >
        <span className={isLocked ? 'opacity-30' : ''}>
          {badge.icon}
        </span>
        
        {!isLocked && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent animate-pulse" />
        )}
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-48">
          <div className="bg-black/95 backdrop-blur-md text-white text-sm rounded-lg p-3 shadow-2xl border border-white/10">
            <div className="font-bold mb-1">{badge.name}</div>
            <div className="text-gray-300 text-xs">{badge.description}</div>
            {isLocked && (
              <div className="text-orange-400 text-xs mt-2 font-semibold">🔒 Locked</div>
            )}
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-8 border-transparent border-t-black/95" />
          </div>
        </div>
      )}
      
      {/* Badge name below */}
      <div className={`
        text-center text-xs mt-2 font-medium
        ${isLocked ? 'text-gray-500' : 'text-white'}
      `}>
        {badge.name}
      </div>
    </div>
  );
}
