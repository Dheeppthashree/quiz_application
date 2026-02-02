import { useState, useEffect, useRef } from 'react';

export default function useVoiceControl({ enabled = false, onCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const synthesisRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // Only initialize if enabled
    if (!enabled) {
      // Cleanup if disabled
      if (recognitionRef.current) {
        try { 
          recognitionRef.current.stop(); 
          setIsListening(false);
        } catch(e) {
          console.log('Voice: cleanup error (safe to ignore)', e);
        }
      }
      return;
    }

    // Check browser support
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      setError('Not supported');
      return;
    }

    console.log('🎤 Initializing voice recognition...');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log('🎤 Voice command detected:', transcript);
      if (onCommand) onCommand(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('🎤 Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setError('Mic Permission Denied');
        setIsListening(false);
      } else if (event.error === 'no-speech') {
        // Ignore - just means user paused
      } else {
        setError(event.error);
        setIsListening(false);
      }
    };

    recognitionRef.current.onstart = () => {
      console.log('🎤 Voice recognition STARTED');
      setIsListening(true);
      setError(null);
    };

    recognitionRef.current.onend = () => {
      console.log('🎤 Voice recognition ENDED');
      setIsListening(false);
      // Auto-restart if still enabled
      if (enabled && recognitionRef.current) {
        try {
          console.log('🎤 Auto-restarting voice recognition...');
          recognitionRef.current.start();
        } catch(e) {
          console.error('🎤 Auto-restart failed:', e);
        }
      }
    };

    // Start listening
    try {
      recognitionRef.current.start();
      console.log('🎤 Voice recognition start() called');
    } catch(e) {
      console.error('🎤 Failed to start:', e);
      setError('Failed to start');
    }

    return () => {
      console.log('🎤 Cleaning up voice recognition');
      if (recognitionRef.current) { 
        try { recognitionRef.current.stop(); } catch(e){} 
      }
    };
  }, [enabled, onCommand]);

  const speak = (text) => {
    if (!synthesisRef.current) return;
    synthesisRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    console.log('🔊 Speaking:', text);
    synthesisRef.current.speak(utterance);
  };

  return { isListening, error, speak };
}
