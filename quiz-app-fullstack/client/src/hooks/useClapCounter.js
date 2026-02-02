import { useState, useEffect, useRef } from 'react';

export default function useClapCounter({ onClapCount, enabled = true }) {
  const [isListening, setIsListening] = useState(false);
  const [clapCount, setClapCount] = useState(0); // Visual feedback
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  
  const lastClapTime = useRef(0);
  const countRef = useRef(0);
  const timerRef = useRef(null);

  // Config - FIXED TIMING
  const CLAP_THRESHOLD = 0.5; // Sensitivity
  const DEBOUNCE_MS = 200; // 200ms debounce between claps (was 150ms)
  const WINDOW_MS = 800; // Wait 800ms after last clap to finalize count (was 1000ms)

  useEffect(() => {
    if (enabled) {
      initAudio();
    } else {
      cleanup();
    }
    return () => cleanup();
  }, [enabled]);

  const initAudio = async () => {
    try {
      console.log('👏 Initializing clap detection...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      console.log('👏 Clap detection ACTIVE');
      listen();
    } catch (err) {
      console.error("👏 Clap Count Init Error:", err);
    }
  };

  const listen = () => {
    if (!analyserRef.current) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const loop = () => {
       if (!analyserRef.current) return;
       requestRef.current = requestAnimationFrame(loop);
       
       analyserRef.current.getByteTimeDomainData(dataArray);
       
       // Find peak
       let maxVal = 0;
       for (let i = 0; i < bufferLength; i++) {
         const val = dataArray[i] / 128.0;
         const amp = Math.abs(val - 1);
         if (amp > maxVal) maxVal = amp;
       }

       const now = Date.now();
       
       // Detect Clap Spike
       if (maxVal > CLAP_THRESHOLD) {
           // Debounce: Ignore if too close to last accepted clap
           if (now - lastClapTime.current > DEBOUNCE_MS) { 
               
               // Register Clap
               lastClapTime.current = now;
               countRef.current += 1;
               setClapCount(c => c + 1); // Update UI immediately
               
               console.log(`👏 CLAP detected! Count now: ${countRef.current}`);

               // Reset Finalize Timer
               if (timerRef.current) clearTimeout(timerRef.current);
               
               timerRef.current = setTimeout(() => {
                   // Time up! Send final count.
                   if (countRef.current > 0) {
                       console.log(`👏 FINAL COUNT: ${countRef.current} - Triggering selection`);
                       onClapCount(countRef.current);
                       countRef.current = 0;
                       setClapCount(0); // Reset UI
                   }
               }, WINDOW_MS);
           }
       }
    };
    loop();
  };

  const cleanup = () => {
    console.log('👏 Cleaning up clap detection');
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    if (sourceRef.current) {
        sourceRef.current.mediaStream?.getTracks().forEach(t => t.stop());
    }
    setIsListening(false);
    setClapCount(0);
    countRef.current = 0;
  };

  return { isListening, currentCount: clapCount };
}
