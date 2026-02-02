// Badge System for Zootopia Quiz
// Manages badge definitions, evaluation, and persistence

const BADGE_DEFINITIONS = [
  // Completion Badges (5 total - one per module)
  {
    id: 'complete_t1',
    name: 'Targeting Master',
    description: 'Completed the Targeting & Budget module',
    icon: '🎯',
    category: 'completion',
    criteria: (stats) => stats.completedModules.includes('t1')
  },
  {
    id: 'complete_t2',
    name: 'Creative Expert',
    description: 'Completed the Ad Formats & Creative module',
    icon: '🖼️',
    category: 'completion',
    criteria: (stats) => stats.completedModules.includes('t2')
  },
  {
    id: 'complete_t3',
    name: 'Bidding Strategist',
    description: 'Completed the Bidding Strategies module',
    icon: '💰',
    category: 'completion',
    criteria: (stats) => stats.completedModules.includes('t3')
  },
  {
    id: 'complete_t4',
    name: 'Analytics Guru',
    description: 'Completed the Analytics & Measurement module',
    icon: '📊',
    category: 'completion',
    criteria: (stats) => stats.completedModules.includes('t4')
  },
  {
    id: 'complete_t5',
    name: 'Privacy Pro',
    description: 'Completed the Privacy & Compliance module',
    icon: '🔒',
    category: 'completion',
    criteria: (stats) => stats.completedModules.includes('t5')
  },
  
  // Performance Badges
  {
    id: 'perfect_score',
    name: 'Perfect Detective',
    description: 'Scored 100% on any module',
    icon: '🏆',
    category: 'performance',
    criteria: (stats) => stats.scores.some(s => s.percentage === 100)
  },
  {
    id: 'high_achiever',
    name: 'High Achiever',
    description: 'Scored 80% or higher on 3 modules',
    icon: '⭐',
    category: 'performance',
    criteria: (stats) => stats.scores.filter(s => s.percentage >= 80).length >= 3
  },
  {
    id: 'passing_grade',
    name: 'Study Bunny',
    description: 'Scored 60% or higher on any module',
    icon: '🐰',
    category: 'performance',
    criteria: (stats) => stats.scores.some(s => s.percentage >= 60)
  },
  
  // Control Method Badges
  {
    id: 'voice_master',
    name: 'Voice Commander',
    description: 'Completed a quiz using voice control',
    icon: '🎤',
    category: 'controls',
    criteria: (stats) => stats.controlsUsed.includes('voice')
  },
  {
    id: 'clap_master',
    name: 'Clap Champion',
    description: 'Completed a quiz using clap detection',
    icon: '👏',
    category: 'controls',
    criteria: (stats) => stats.controlsUsed.includes('clap')
  },
  {
    id: 'gesture_master',
    name: 'Gesture Guru',
    description: 'Completed a quiz using hand gestures',
    icon: '✋',
    category: 'controls',
    criteria: (stats) => stats.controlsUsed.includes('gesture')
  },
  
  // Special Badges
  {
    id: 'all_modules',
    name: 'Zootopia Scholar',
    description: 'Completed all 5 modules',
    icon: '🎓',
    category: 'special',
    criteria: (stats) => stats.completedModules.length === 5
  },
  {
    id: 'three_perfects',
    name: 'Triple Ace',
    description: 'Achieved 100% on 3 different modules',
    icon: '💎',
    category: 'special',
    criteria: (stats) => stats.scores.filter(s => s.percentage === 100).length >= 3
  },
  {
    id: 'all_controls',
    name: 'Multi-Modal Master',
    description: 'Used all three control methods (voice, clap, gestures)',
    icon: '🌟',
    category: 'special',
    criteria: (stats) => {
      const controls = stats.controlsUsed;
      return controls.includes('voice') && 
             controls.includes('clap') && 
             controls.includes('gesture');
    }
  }
];

// Evaluate which badges a user has earned
export function evaluateBadges(userStats) {
  const earnedBadges = [];
  
  for (const badge of BADGE_DEFINITIONS) {
    if (badge.criteria(userStats)) {
      earnedBadges.push(badge.id);
    }
  }
  
  return earnedBadges;
}

// Get badge details by ID
export function getBadgeById(badgeId) {
  return BADGE_DEFINITIONS.find(b => b.id === badgeId);
}

// Get all badge definitions
export function getAllBadges() {
  return BADGE_DEFINITIONS;
}

// LocalStorage key
const STORAGE_KEY = 'zootopia_quiz_user_data';

// Save user data to localStorage
export function saveUserData(userData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    console.log('💾 User data saved:', userData);
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}

// Load user data from localStorage
export function loadUserData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      console.log('📂 User data loaded:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
  
  // Return default structure if no data
  return {
    userName: '',
    completedModules: [],
    scores: [],
    controlsUsed: [],
    earnedBadges: []
  };
}

// Add a completed module and update badges
export function addCompletedModule(userData, moduleId, score, total, controlsUsed = []) {
  const percentage = Math.round((score / total) * 100);
  
  // Update completed modules
  if (!userData.completedModules.includes(moduleId)) {
    userData.completedModules.push(moduleId);
  }
  
  // Add score record
  userData.scores.push({
    moduleId,
    score,
    total,
    percentage,
    timestamp: new Date().toISOString()
  });
  
  // Update controls used
  for (const control of controlsUsed) {
    if (!userData.controlsUsed.includes(control)) {
      userData.controlsUsed.push(control);
    }
  }
  
  // Re-evaluate badges
  const newBadges = evaluateBadges(userData);
  const previousBadges = userData.earnedBadges || [];
  
  // Find newly earned badges
  const freshBadges = newBadges.filter(b => !previousBadges.includes(b));
  
  userData.earnedBadges = newBadges;
  
  // Save to localStorage
  saveUserData(userData);
  
  return {
    updatedData: userData,
    newlyEarnedBadges: freshBadges
  };
}

// Clear all user data (reset)
export function clearUserData() {
  localStorage.removeItem(STORAGE_KEY);
  console.log('🗑️ User data cleared');
}

export default {
  evaluateBadges,
  getBadgeById,
  getAllBadges,
  saveUserData,
  loadUserData,
  addCompletedModule,
  clearUserData,
  BADGE_DEFINITIONS
};
