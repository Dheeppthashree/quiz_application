export default function Mouse({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
       <g transform="scale(-1, 1) translate(-100, 0)">
        {/* Body - Brown */}
        <path d="M20,70 Q20,50 40,40 Q60,30 80,50 Q90,60 90,80 Q90,90 70,90 Q50,90 20,70" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        {/* Head */}
        <circle cx="80" cy="50" r="15" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        {/* Belly - Lighter Brown */}
        <circle cx="50" cy="70" r="15" fill="#FCD34D" opacity="0.8" />
        {/* Ears - Large & Brown */}
        <circle cx="75" cy="40" r="9" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        <circle cx="90" cy="45" r="9" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        {/* Inner Ears - Pink */}
        <circle cx="75" cy="40" r="5" fill="#FCA5A5" />
        <circle cx="90" cy="45" r="5" fill="#FCA5A5" />
        {/* Eye */}
        <circle cx="82" cy="48" r="2.5" fill="white" />
        <circle cx="82" cy="48" r="1.5" fill="black" />
        {/* Nose */}
        <circle cx="95" cy="52" r="2" fill="black" />
        {/* Tail */}
        <path d="M20,70 Q10,60 5,80" fill="none" stroke="#D97706" strokeWidth="3" />
        {/* Legs */}
        <path d="M40,85 L40,95" stroke="#92400E" strokeWidth="3" />
        <path d="M70,85 L70,95" stroke="#92400E" strokeWidth="3" />
        {/* Bag (removed to look more like running Jerry) */}
      </g>
    </svg>
  );
}
