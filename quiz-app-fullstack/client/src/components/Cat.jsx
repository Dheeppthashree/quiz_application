export default function Cat({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
       {/* Body - Blue-Gray */}
       <path d="M20,60 Q30,40 60,40 Q80,40 90,60 Q95,70 90,85 Q80,95 30,90 Q10,80 20,60" fill="#6B7280" stroke="#374151" strokeWidth="2" />
       {/* Head */}
       <circle cx="85" cy="50" r="18" fill="#6B7280" stroke="#374151" strokeWidth="2" />
       {/* Ears */}
       <path d="M75,40 L70,25 L85,38 Z" fill="#6B7280" stroke="#374151" strokeWidth="2" />
       <path d="M95,40 L100,25 L90,38 Z" fill="#6B7280" stroke="#374151" strokeWidth="2" />
       {/* Inner Ears - Pink */}
       <path d="M75,38 L72,30 L80,38 Z" fill="#FCA5A5" />
       <path d="M95,38 L98,30 L90,38 Z" fill="#FCA5A5" />
       {/* Eyes - Yellow/Greenish */}
       <circle cx="80" cy="48" r="4" fill="#FEF08A" />
       <circle cx="80" cy="48" r="1.5" fill="black" />
       <circle cx="90" cy="48" r="4" fill="#FEF08A" />
       <circle cx="90" cy="48" r="1.5" fill="black" />
       {/* Nose */}
       <circle cx="85" cy="55" r="2" fill="pink" />
       {/* Belly - Lighter Gray/White */}
       <path d="M30,80 Q50,70 70,80" fill="none" stroke="#E5E7EB" strokeWidth="15" strokeLinecap="round" opacity="0.5" />
       {/* Whiskers */}
       <path d="M95,55 L110,50" stroke="black" strokeWidth="1" />
       <path d="M95,55 L110,60" stroke="black" strokeWidth="1" />
       {/* Tail */}
       <path d="M20,60 Q10,40 20,20" fill="none" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" />
       {/* Legs */}
       <path d="M40,85 L30,100" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
       <path d="M80,85 L90,100" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
