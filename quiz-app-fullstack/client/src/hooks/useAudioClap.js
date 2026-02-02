import { useState, useEffect, useRef } from 'react';

export default function useAudioClap({ onClap, enabled = true }) {
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  const lastClapTime = useRef(0);

  // Thresholds
  const CLAP_THRESHOLD = 0.8; // High amplitude
  const COOLDOWN_MS = 1000; // 1 second between claps

  useEffect(() => {
    if (!enabled) {
      cleanup();
      return;
    }

    initAudio();
    return () => cleanup();
  }, [enabled]);

  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      detectClap();
    } catch (err) {
      console.error("Audio Clap Init Error:", err);
    }
  };

  const detectClap = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const checkAmplitude = () => {
      // If we are getting destroyed, stop
      if (!analyserRef.current) return;

      analyserRef.current.getByteTimeDomainData(dataArray);

      // Find max amplitude in this frame
      let maxVal = 0;
      for (let i = 0; i < bufferLength; i++) {
        const val = dataArray[i] / 128.0; // Normalize 0-2
        const amplitude = Math.abs(val - 1);
        if (amplitude > maxVal) maxVal = amplitude;
      }

      const now = Date.now();
      
      // Detect Clap: distinct spike > threshold
      if (maxVal > 0.6) { // Sensitivity
         if (now - lastClapTime.current > COOLDOWN_MS) {
             console.log("👏 CLAP DETECTED via Audio! Amp:", maxVal);
             onClap(); 
             lastClapTime.current = now;
         }
      }

      requestRef.current = requestAnimationFrame(checkAmplitude);
    };

    checkAmplitude();
  };

  const cleanup = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    if (sourceRef.current) {
        sourceRef.current.mediaStream?.getTracks().forEach(t => t.stop());
    }
    setIsListening(false);
  };

  return { isListening };
}
