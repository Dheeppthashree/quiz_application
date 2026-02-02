import { useRef, useEffect, useState } from 'react';

export default function useHandGesture({ onGesture, enabled }) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  
  // Public State for UI
  const [cursor, setCursor] = useState(null); // 0, 1, 2, 3 (The option being hovered)
  const [progress, setProgress] = useState(0); // 0 to 100

  // Internal Refs
  const videoRef = useRef(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);
  
  // Logic Refs
  const currentHoldStart = useRef(0);
  const currentHoldTarget = useRef(null);
  const lastNextTrigger = useRef(0); // NEW: Track last "next" trigger
  const HOLD_DURATION = 1000; // 1 second to confirm
  const NEXT_COOLDOWN = 2000; // 2 seconds cooldown for "next" gesture

  useEffect(() => {
    if (!enabled) {
      cleanup();
      return;
    }
    initializeHands();
    return () => cleanup();
  }, [enabled]);

  async function initializeHands() {
    try {
      if (typeof window.Hands === 'undefined' || typeof window.Camera === 'undefined') {
        throw new Error('MediaPipe Hands not loaded');
      }

      videoRef.current = document.getElementById('camera-preview');
      if (!videoRef.current) {
        // Create hidden video element if not found
        videoRef.current = document.createElement('video');
        videoRef.current.style.display = 'none';
        document.body.appendChild(videoRef.current);
      }

      handsRef.current = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      handsRef.current.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5
      });

      handsRef.current.onResults(handleResults);

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
             if (handsRef.current && videoRef.current) {
                 await handsRef.current.send({ image: videoRef.current });
             }
        },
        width: 640,
        height: 480
      });

      await camera.start();
      cameraRef.current = camera;
      setIsReady(true);
      setError(null);
      console.log('✋ Hand gesture detection initialized');
    } catch (err) {
      console.error('✋ Hands init error:', err);
      setError(err.message);
      setIsReady(false);
    }
  }

  function handleResults(results) {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
        resetHold();
        return;
    }

    const landmarks = results.multiHandLandmarks[0];
    const count = countFingers(landmarks);

    // Special: 5 fingers = "Next" gesture - WITH COOLDOWN
    if (count === 5) {
        const now = Date.now();
        // Only trigger if cooldown period has passed
        if (now - lastNextTrigger.current > NEXT_COOLDOWN) {
            console.log('🖐️ DETECTED: 5 fingers (open palm) - triggering NEXT');
            lastNextTrigger.current = now; // Update cooldown timer
            onGesture({ type: 'next' });
            resetHold();
        } else {
            console.log('🖐️ 5 fingers detected but in cooldown period');
        }
        return;
    }

    // Map Finger Count to Option Index
    // 1 -> 0 (A)
    // 2 -> 1 (B)
    // 3 -> 2 (C)
    // 4 -> 3 (D)
    
    let target = null;
    if (count >= 1 && count <= 4) {
        target = count - 1;
    }

    if (target !== null) {
        updateHold(target);
    } else {
        resetHold();
    }
  }

  function updateHold(target) {
      const now = Date.now();

      if (currentHoldTarget.current === target) {
          // Continuing same gesture
          const elapsed = now - currentHoldStart.current;
          const p = Math.min((elapsed / HOLD_DURATION) * 100, 100);
          
          setProgress(p);
          setCursor(target);

          if (p >= 100) {
              // CONFIRMED!
              onGesture({ type: 'select', index: target });
              resetHold(); // Reset after trigger to avoid double fire
          }
      } else {
          // New target, start timer
          currentHoldTarget.current = target;
          currentHoldStart.current = now;
          setCursor(target);
          setProgress(0);
      }
  }

  function resetHold() {
      currentHoldTarget.current = null;
      currentHoldStart.current = 0;
      setCursor(null);
      setProgress(0);
  }

  function countFingers(landmarks) {
    const indexUp = landmarks[8].y < landmarks[6].y;
    const middleUp = landmarks[12].y < landmarks[10].y;
    const ringUp = landmarks[16].y < landmarks[14].y;
    const pinkyUp = landmarks[20].y < landmarks[18].y;

    let count = 0;
    if (indexUp) count++;
    if (middleUp) count++;
    if (ringUp) count++;
    if (pinkyUp) count++;
    
    // Check thumb for 5 fingers (open palm gesture)
    // Thumb detection: check if thumb tip is far from palm
    const thumbTip = landmarks[4];
    const palmBase = landmarks[0];
    const thumbDistance = Math.abs(thumbTip.x - palmBase.x);
    const thumbUp = thumbDistance > 0.15; // Threshold for extended thumb
    
    if (thumbUp) count++;
    
    return count;
  }

  function cleanup() {
    if (cameraRef.current) { cameraRef.current.stop(); cameraRef.current = null; }
    if (handsRef.current) { handsRef.current.close(); handsRef.current = null; }
    // Video cleanup
    if (videoRef.current && videoRef.current.parentElement) {
         // Do not remove if it's the external preview, only if we created it
         if (videoRef.current.id !== 'camera-preview') {
             videoRef.current.parentElement.removeChild(videoRef.current);
         }
    }
    videoRef.current = null;
    setIsReady(false);
  }

  // Exposed API
  return { isReady, error, cursor, progress };
}
