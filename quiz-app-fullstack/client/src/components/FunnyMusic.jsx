import { useState, useEffect, useRef } from 'react';

export default function FunnyMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // CC0 Comical Track (using a reliable hosted 8-bit funny track)
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"; // Placeholder, but functional

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
      <audio ref={audioRef} src={musicUrl} loop />
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition-transform"
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      <span className="text-xs font-bold text-white pr-2 uppercase tracking-tighter">Funny Loops</span>
    </div>
  );
}
