import { useState, useRef, useEffect } from 'react';
import useVoiceControl from '../hooks/useVoiceControl';
import useClapCounter from '../hooks/useClapCounter';
import useHandGesture from '../hooks/useHandGesture';
import CameraPreview from './CameraPreview';
import VoiceWave from './VoiceWave';
import ZootopiaBackground from './ZootopiaBackground';
import { quizAPI } from '../services/api';

export default function QuizScreen({ topic, onComplete, sessionId, onControlUsed, timerEnabled = false }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [gestureFeedback, setGestureFeedback] = useState('');
  
  // Voice and controls state
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [clapEnabled, setClapEnabled] = useState(false);
  const [gestureEnabled, setGestureEnabled] = useState(false);
  const [lastHeard, setLastHeard] = useState('');
  const [feedbackOverlay, setFeedbackOverlay] = useState(null);
  const isProcessing = useRef(false);
  
  // Track which controls were used during quiz
  const controlsUsedRef = useRef([]);

  const CORRECT_PHRASES = ["Awesome!", "Brilliant!", "Spot on!", "You're on fire!", "Spectacular!"];
  const WRONG_PHRASES = ["Don't give up!", "Nice try, keep going!", "You'll get the next one!", "Learning is a journey!", "Stay focused!"];

  const question = topic.questions[currentQuestionIndex];
  const totalQuestions = topic.questions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  // ===================
  // HANDLER FUNCTIONS (MUST BE BEFORE HOOKS!)
  // ===================

  function handleVoiceCommand(text) {
    const txt = text.toLowerCase();
    console.log('🎤 Voice command received:', txt);
    
    const matchNext = txt.includes('next');
    const matchA = txt.includes('option a') || txt === 'a';
    const matchB = txt.includes('option b') || txt === 'b';
    const matchC = txt.includes('option c') || txt === 'c';
    const matchD = txt.includes('option d') || txt === 'd';

    if (matchNext && isAnswered) {
      handleNext();
    } else if (matchNext && !isAnswered) {
      console.log('Voice: Please answer the question first');
      speak('Please answer the question first');
    } else if (matchA) selectOption(0);
    else if (matchB) selectOption(1);
    else if (matchC) selectOption(2);
    else if (matchD) selectOption(3);
  }

  function handleGestureAction(action) {
      if (action.type === 'select') {
          console.log('✋ Hand gesture selected option:', action.index);
          selectOption(action.index);
      } else if (action.type === 'next') {
          console.log('🖐️ 5 FINGERS detected - moving to next question');
          handleNext();
      }
  }

  const toggleVoice = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    if (newState && !controlsUsedRef.current.includes('voice')) {
      controlsUsedRef.current.push('voice');
      if (onControlUsed) onControlUsed('voice');
    }
    console.log('🎤 Voice control:', newState ? 'ENABLED' : 'DISABLED');
  };

  const toggleClap = () => {
    const newState = !clapEnabled;
    setClapEnabled(newState);
    if (newState && !controlsUsedRef.current.includes('clap')) {
      controlsUsedRef.current.push('clap');
      if (onControlUsed) onControlUsed('clap');
    }
    console.log('👏 Clap control:', newState ? 'ENABLED' : 'DISABLED');
  };

  const toggleGesture = () => {
    const newState = !gestureEnabled;
    setGestureEnabled(newState);
    if (newState && !controlsUsedRef.current.includes('gesture')) {
      controlsUsedRef.current.push('gesture');
      if (onControlUsed) onControlUsed('gesture');
    }
    console.log('✋ Gesture control:', newState ? 'ENABLED' : 'DISABLED');
  };

  // ===================
  // HOOKS (AFTER HANDLERS!)
  // ===================

  const { isListening, speak } = useVoiceControl({
    enabled: voiceEnabled,
    onCommand: handleVoiceCommand
  });

  const { isListening: clapListening, currentCount: activeClaps } = useClapCounter({
    enabled: clapEnabled,
    onClapCount: (count) => {
        if (isAnswered) {
            console.log('👏 Claps ignored - question already answered');
            return;
        }
        console.log('👏 Clap count received:', count, '- Selecting option', count - 1);
        if (count >= 1 && count <= 4) {
            selectOption(count - 1);
        }
    }
  });

  const { 
    handCursor, 
    handProgress, 
    gestureReady 
  } = useHandGesture({
    enabled: gestureEnabled,
    onGesture: handleGestureAction
  });

  // ===================
  // CORE LOGIC
  // ===================

  // Timer logic
  useEffect(() => {
    let timer;
    if (timerEnabled && !isAnswered && timeLeft > 0) {
      setTimerActive(true);
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      setTimerActive(false);
      clearInterval(timer);
    }

    // Time's up logic
    if (timeLeft === 0 && !isAnswered) {
      setIsAnswered(true);
      setFeedbackOverlay({
        type: 'wrong',
        emoji: '⏰',
        text: "Time's up! Stay sharp!"
      });
      if (voiceEnabled) speak("Time's up! Stay sharp!");
      
      // Auto-advance
      setTimeout(() => {
        handleNext();
      }, 2500);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, timerEnabled]);

  useEffect(() => {
    const interval = setInterval(() => {
        if (isProcessing.current) isProcessing.current = false;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset timer for new question
    if (timerEnabled) {
      setTimeLeft(30);
    }
    
    if (voiceEnabled) {
      setTimeout(() => speak(question.question), 500);
    }
  }, [currentQuestionIndex]);

  async function selectOption(index) {
    if (isAnswered || isProcessing.current) return;
    if (index < 0 || index >= 4) return;

    isProcessing.current = true;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === question.correct;
    if (isCorrect) setScore(s => s + 1);

    const phrases = isCorrect ? CORRECT_PHRASES : WRONG_PHRASES;
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    setFeedbackOverlay({
        type: isCorrect ? 'correct' : 'wrong',
        emoji: isCorrect ? '🎉' : '💪',
        text: phrase
    });

    if (voiceEnabled) speak(phrase);

    try {
      await quizAPI.submitAnswer(sessionId, {
         topicId: topic.id,
         questionIndex: currentQuestionIndex,
         selectedAnswer: index,
         correctAnswer: question.correct
      });
    } catch(e) { console.error(e); }

    isProcessing.current = false;

    // Auto-advance to next question after 2.5 seconds
    setTimeout(() => {
      handleNext();
    }, 2500);
  }

  function handleNext() {
    if (!isAnswered) return;
    
    if (currentQuestionIndex + 1 < totalQuestions) {
       setIsAnswered(false);
       setSelectedAnswer(null);
       setFeedbackOverlay(null);
       setCurrentQuestionIndex(prev => prev + 1);
       isProcessing.current = false;
    } else {
       // Quiz complete - pass controls used
       onComplete(score, totalQuestions, controlsUsedRef.current);
    }
  }

  // --- RENDER ---
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 relative">
       {/* TUNDRATOWN - Arctic Frozen City */}
       <ZootopiaBackground district="tundratown" />
       {/* Header - Control Buttons */}
       <div className="flex justify-between items-center mb-6 relative z-20 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold opacity-80" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>{topic.title}</h2>
          <div className="flex gap-2">
             <button onClick={toggleVoice} className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${voiceEnabled ? 'bg-blue-600' : 'bg-gray-700'} hover:scale-105 transition-transform`}>
                {voiceEnabled ? '🎤 Voice ON' : '🎤 Voice OFF'}
             </button>
             <button onClick={toggleClap} className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${clapEnabled ? 'bg-green-600' : 'bg-gray-700'} hover:scale-105 transition-transform`}>
                {clapEnabled ? '👏 Clap ON' : '👏 Clap OFF'}
             </button>
             <button onClick={toggleGesture} className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${gestureEnabled ? 'bg-orange-600' : 'bg-gray-700'} hover:scale-105 transition-transform`}>
                {gestureEnabled ? '✋ Hand ON' : '✋ Hand OFF'}
             </button>
          </div>
       </div>

       {/* Status Bar */}
       {(voiceEnabled || gestureEnabled) && (
          <div className="glass-card p-4 mb-4 text-center">
             
             {voiceEnabled && (
                 <div className="mb-2">
                    <div className="flex justify-center w-full mb-1"><VoiceWave isListening={isListening} /></div>
                    <div className="text-cyan-400 font-mono text-lg animate-pulse">
                        {activeClaps > 0 ? `👏 Claps: ${activeClaps}...` : "🎤 Listening for Voice or Claps..."}
                    </div>
                 </div>
             )}

             {gestureEnabled && (
                 <div className="mt-2 text-orange-400 font-mono text-sm">
                    {gestureReady ? "✋ Hand Camera Active: Hold to Select" : "✋ Starting Camera..."}
                 </div>
             )}
          </div>
       )}
      
        {/* Progress & Timer */}
        <div className="mb-8 relative z-20">
           <div className="flex justify-between items-end opacity-70 text-sm mb-2">
              <div className="flex flex-col">
                <span className="font-bold text-orange-400 uppercase tracking-widest text-[10px] mb-1">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white">Score: {score}</span>
                </div>
              </div>

              {timerEnabled && (
                <div className={`flex flex-col items-end transition-all duration-300 ${timeLeft < 10 ? 'scale-110' : ''}`}>
                  <span className="font-bold text-orange-400 uppercase tracking-widest text-[10px] mb-1">Time Remaining</span>
                  <div className={`flex items-center gap-2 text-3xl font-black tabular-nums ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                    <span className="text-2xl animate-spin-slow">⏰</span>
                    {timeLeft}s
                  </div>
                </div>
              )}
           </div>
           <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
              <div className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 transition-all duration-500 shadow-[0_0_15px_rgba(244,114,182,0.4)]" style={{ width: `${progress}%` }} />
           </div>
        </div>

       {/* Feedback Overlay */}
       {feedbackOverlay && (
           <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none animate-bounce-in">
               <div className={`p-8 rounded-3xl glass-card border-4 ${feedbackOverlay.type === 'correct' ? 'border-green-500 bg-green-900/80' : 'border-red-500 bg-red-900/80'} text-center shadow-2xl`}>
                   <div className="text-8xl mb-4">{feedbackOverlay.emoji}</div>
                   <h2 className="text-4xl font-bold text-white mb-2">{feedbackOverlay.type === 'correct' ? 'Correct!' : 'Oops!'}</h2>
                   <p className="text-xl text-white/90">{feedbackOverlay.text}</p>
               </div>
           </div>
       )}

       {/* Question */}
       <div className="glass-card p-8 mb-6 relative z-20 bg-black/40 backdrop-blur-lg border border-white/10">
          <h1 className="text-2xl font-bold mb-8 leading-snug" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{question.question}</h1>
          <div className="space-y-4">
             {question.options.map((opt, i) => {
                const optionLabel = String.fromCharCode(65 + i);
                const isSelected = selectedAnswer === i;
                const isCorrect = i === question.correct;
                
                // Gesture hover logic for statusClass
                let statusClass = "";
                if (!isAnswered && i === handCursor) {
                   statusClass = "border-orange-400 bg-orange-500/20";
                }

                return (
                   <button
                      key={i}
                      onClick={() => selectOption(i)}
                      disabled={isAnswered}
                      className={`w-full p-5 rounded-xl text-left transition-all border-2 backdrop-blur-md relative overflow-hidden
                         ${isAnswered 
                            ? isCorrect 
                               ? 'bg-green-500/20 border-green-500 text-white' 
                               : isSelected 
                                  ? 'bg-red-500/20 border-red-500 text-white' 
                                  : 'bg-black/20 border-white/10 opacity-50'
                            : isSelected // This is for when an option is selected but not yet answered (e.g., gesture selection)
                               ? 'bg-orange-500/30 border-orange-500 text-white scale-105'
                               : statusClass || 'bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/30' // Apply gesture statusClass or default
                         }`}
                      style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
                   >
                     {/* 3. Gesture Progress Bar */}
                     {i === handCursor && !isAnswered && (
                         <div 
                           className="absolute left-0 top-0 bottom-0 bg-orange-500/30 transition-all ease-linear" 
                           style={{ width: `${handProgress}%`, height: '100%' }}
                         />
                     )}
                     {/* Clap Guide */}
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm opacity-30">
                        {i+1} 👏
                     </div>

                     <span className="font-bold text-orange-400 text-xl w-8 relative z-10">{['A','B','C','D'][i]}</span>
                     <span className="text-lg relative z-10">{opt}</span>
                   </button>
                )
             })}
          </div>
       </div>

       {/* Controls Info */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-gray-500 text-sm mt-6 relative z-20">
          <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="font-bold text-blue-400 mb-1">🎤 Voice</div>
              "Next", "Option A"...
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="font-bold text-cyan-400 mb-1">👏 Clap</div>
              1 Clap = A, 2 = B...
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
              <div className="font-bold text-orange-400 mb-1">✋ Hand</div>
              Hold fingers to Select
          </div>
       </div>
       
       {/* Next Button - Fixed position */}
       {isAnswered && (
         <div className="flex justify-center mt-6 relative z-20">
             <button onClick={handleNext} className="btn-primary px-12 py-4 text-xl shadow-2xl">
                Next Question ➜
             </button>
         </div>
       )}

       {/* Camera Preview for Hand Detection */}
       {gestureEnabled && (
         <div className="fixed bottom-4 right-4 z-50">
           <CameraPreview enabled={gestureEnabled} mode="gesture" />
         </div>
       )}

    </div>
  );
}
