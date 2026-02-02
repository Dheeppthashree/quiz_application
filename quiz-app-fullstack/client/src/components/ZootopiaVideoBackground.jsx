import { useState, useEffect, useRef } from 'react';

export default function ZootopiaVideoBackground() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Modern browsers block autoplay with sound. 
    // We can unmute once the user interacts with the page.
    const handleInteraction = () => {
      if (videoRef.current) {
        setIsMuted(false); 
      }
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source src="/zootopia-city-clips.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mute/Unmute Toggle for Video */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-lg hover:scale-110 ${isMuted ? 'bg-gray-500' : 'bg-orange-500'}`}
          title={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <span className="text-[10px] font-bold text-white pr-2 uppercase tracking-tighter">Video Audio</span>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-purple-900/20 to-blue-900/20 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}
