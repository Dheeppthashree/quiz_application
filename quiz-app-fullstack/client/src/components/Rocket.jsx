export default function Rocket({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      
      {/* Flame - Animated Pulse Effect would be cool, but static for now */}
      <path d="M10,50 Q-10,30 20,40 Q5,50 20,60 Q-10,70 10,50" fill="url(#fireGrad)" stroke="#b45309" strokeWidth="1" />
      
      {/* Left Fin */}
      <path d="M30,50 L20,30 L50,45 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      {/* Right Fin */}
      <path d="M30,50 L20,70 L50,55 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      
      {/* Body */}
      <path d="M25,50 Q25,30 60,30 Q90,30 95,50 Q90,70 60,70 Q25,70 25,50" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
      
      {/* Window */}
      <circle cx="65" cy="50" r="10" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="65" cy="50" r="8" fill="#2563eb" />
      
      {/* Reflection on window */}
      <circle cx="68" cy="47" r="2" fill="white" opacity="0.8" />
    </svg>
  );
}
