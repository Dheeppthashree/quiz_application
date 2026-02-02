import { useState, useEffect } from 'react';
import Rocket from './components/Rocket';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import DashboardScreen from './components/DashboardScreen';
import ModuleSelection from './components/ModuleSelection';
import ModuleAnalytics from './components/ModuleAnalytics';
import OverallAnalytics from './components/OverallAnalytics';
import BadgeCelebration from './components/BadgeCelebration';
import Header from './components/Header';
import FunnyMusic from './components/FunnyMusic';
import ZootopiaVideoBackground from './components/ZootopiaVideoBackground';
import quizData from './data/quiz-data';
import { quizAPI } from './services/api';
import { loadUserData, saveUserData, addCompletedModule, clearUserData, getBadgeById } from './utils/badgeSystem';

export default function App() {
  const [screen, setScreen] = useState('welcome'); // welcome | quiz | moduleAnalytics | overallAnalytics | results | dashboard | moduleSelection
  const [userData, setUserData] = useState(null); // Persistent user data
  const [currentTopic, setCurrentTopic] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [controlsUsedInQuiz, setControlsUsedInQuiz] = useState([]);

  // For badge system
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState([]);
  
  // Current quiz stats for analytics
  const [currentModuleStats, setCurrentModuleStats] = useState(null);

  // Advanced features state
  const [settings, setSettings] = useState({ timerEnabled: false });
  const [celebrationQueue, setCelebrationQueue] = useState([]);

  // Load user data on mount
  useEffect(() => {
    const loaded = loadUserData();
    setUserData(loaded);
    console.log('📂 Loaded user data:', loaded);
    
    // If user has a name, skip welcome to module selection
    if (loaded.userName) {
      setScreen('moduleSelection');
    }
  }, []);

  async function handleStart(name, topicId) {
    // Session Isolation: If a different user starts, clear previous progress
    if (userData && userData.userName && userData.userName.toLowerCase() !== name.toLowerCase()) {
      console.log('🔄 New user detected. Clearing previous session for:', name);
      clearUserData();
      const freshData = {
        userName: name,
        completedModules: [],
        scores: [],
        controlsUsed: [],
        earnedBadges: []
      };
      setUserData(freshData);
      saveUserData(freshData);
      
      // We need to wait a tick or use the fresh data directly for startQuiz
      startQuiz(topicId, name);
    } else {
      const updatedData = { ...userData, userName: name };
      setUserData(updatedData);
      saveUserData(updatedData);
      startQuiz(topicId, name);
    }
  }

  async function startQuiz(topicId, overrideName = null) {
    const currentName = overrideName || userData.userName;
    // Find selected topic
    const topic = quizData.topics.find(t => t.id === topicId);
    if (!topic) return;

    // Create session on server
    try {
      const res = await quizAPI.createSession(currentName, [topicId]);
      setSessionId(res.data.id);
    } catch(e) {
      console.error("Session init failed, using offline mode", e);
      setSessionId('offline-' + Date.now());
    }
    
    setCurrentTopic(topic);
    setControlsUsedInQuiz([]);
    setScreen('quiz');
  }

  function handleComplete(score, total, controlsUsed = []) {
    setFinalScore(score);
    setTotalQuestions(total);
    setControlsUsedInQuiz(controlsUsed);
    
    // Update user data with completed module and badges
    const result = addCompletedModule(
      userData, 
      currentTopic.id, 
      score, 
      total,
      controlsUsed
    );
    
    setUserData(result.updatedData);
    setNewlyEarnedBadges(result.newlyEarnedBadges);
    
    console.log('🏆 Newly earned badges:', result.newlyEarnedBadges);
    
    // Store current module stats for analytics display
    setCurrentModuleStats({
      moduleId: currentTopic.id,
      score,
      total,
      controlsUsed,
      earnedBadges: result.newlyEarnedBadges
    });

    // Queue badges for celebration
    if (result.newlyEarnedBadges.length > 0) {
      const badgeDetails = result.newlyEarnedBadges.map(id => getBadgeById(id)).filter(Boolean);
      setCelebrationQueue(badgeDetails);
    }
    
    // Check if all modules completed
    if (result.updatedData.completedModules.length === 5) {
      setScreen('overallAnalytics');
    } else {
      setScreen('moduleAnalytics');
    }
  }

  function handleLogout() {
    if (confirm('Are you sure you want to reset all progress? This will clear your name, badges, and completed modules.')) {
      clearUserData();
      setUserData({
        userName: '',
        completedModules: [],
        scores: [],
        controlsUsed: [],
        earnedBadges: []
      });
      setScreen('welcome');
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 relative overflow-hidden text-white">
      <FunnyMusic />
      
      {/* ZOOTOPIA VIDEO BACKGROUND - Persists across all screens */}
      <ZootopiaVideoBackground />

      {/* Header - shows on all screens except welcome */}
      {userData && userData.userName && screen !== 'welcome' && (
        <Header 
          userName={userData.userName}
          earnedBadges={userData.earnedBadges || []}
          onLogout={handleLogout}
        />
      )}

      {screen === 'welcome' && (
        <WelcomeScreen 
          onStart={handleStart} 
          onDashboard={() => setScreen('dashboard')}
        />
      )}
      
      {screen === 'moduleSelection' && userData && (
        <ModuleSelection 
          completedModules={userData.completedModules || []}
          onSelectModule={startQuiz}
          onBackToWelcome={() => setScreen('welcome')}
          onViewOverallAnalytics={() => setScreen('overallAnalytics')}
          settings={settings}
          onUpdateSettings={setSettings}
        />
      )}
      
      {screen === 'dashboard' && (
        <DashboardScreen onBack={() => setScreen(userData?.userName ? 'moduleSelection' : 'welcome')} />
      )}
      
      {screen === 'quiz' && currentTopic && (
         <QuizScreen 
            topic={currentTopic} 
            sessionId={sessionId}
            onComplete={handleComplete}
            onControlUsed={(control) => {
              if (!controlsUsedInQuiz.includes(control)) {
                setControlsUsedInQuiz([...controlsUsedInQuiz, control]);
              }
            }}
            timerEnabled={settings.timerEnabled}
         />
      )}
      
      {screen === 'moduleAnalytics' && currentModuleStats && (
        <ModuleAnalytics
          moduleId={currentModuleStats.moduleId}
          score={currentModuleStats.score}
          total={currentModuleStats.total}
          controlsUsed={currentModuleStats.controlsUsed}
          earnedBadges={currentModuleStats.earnedBadges}
          onClose={() => setScreen('moduleSelection')}
        />
      )}
      
      {screen === 'overallAnalytics' && userData && (
        <OverallAnalytics
          userData={userData}
          onClose={() => setScreen('moduleSelection')}
        />
      )}

      {screen === 'results' && (
         <ResultsScreen 
           score={finalScore} 
           total={totalQuestions} 
           onRetry={() => setScreen('moduleSelection')}
           newlyEarnedBadges={newlyEarnedBadges}
         />
      )}

      {/* NEW BADGE CELEBRATION OVERLAY */}
      {celebrationQueue.length > 0 && (
        <BadgeCelebration 
          badges={celebrationQueue} 
          onClose={() => setCelebrationQueue([])} 
        />
      )}
    </div>
  );
}
