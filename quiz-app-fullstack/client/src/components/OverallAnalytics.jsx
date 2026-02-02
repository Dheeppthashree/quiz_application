import { getBadgeById } from '../utils/badgeSystem';
import quizData from '../data/quiz-data';
import Leaderboard from './Leaderboard';

export default function OverallAnalytics({ userData, onClose }) {
  const { scores, completedModules, earnedBadges, controlsUsed } = userData;
  
  // Calculate overall stats
  const totalQuestions = scores.reduce((sum, s) => sum + s.total, 0);
  const totalCorrect = scores.reduce((sum, s) => sum + s.score, 0);
  const overallPercentage = Math.round((totalCorrect / totalQuestions) * 100);
  const averageScore = Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length);
  
  // Perfect scores
  const perfectScores = scores.filter(s => s.percentage === 100).length;
  
  // Get all badge details
  const allBadges = earnedBadges.map(id => getBadgeById(id)).filter(b => b);
  
  // Group badges by category
  const badgesByCategory = {
    completion: allBadges.filter(b => b.category === 'completion'),
    performance: allBadges.filter(b => b.category === 'performance'),
    controls: allBadges.filter(b => b.category === 'controls'),
    special: allBadges.filter(b => b.category === 'special')
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative z-20">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-8xl mb-4">🎓</div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 mb-3">
            ZOOTOPIA SCHOLAR!
          </h1>
          <p className="text-2xl text-white mb-2">All Modules Completed!</p>
          <p className="text-lg text-gray-300">Congratulations, {userData.userName}! 🎉</p>
        </div>

        {/* Overall Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-4xl font-bold text-white mb-1">{completedModules.length}</div>
            <div className="text-sm text-gray-300">Modules</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-4xl font-bold text-white mb-1">{overallPercentage}%</div>
            <div className="text-sm text-gray-300">Overall Score</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-4xl font-bold text-white mb-1">{perfectScores}</div>
            <div className="text-sm text-gray-300">Perfect Scores</div>
          </div>
          <div className="bg-gradient-to-br from-amber-600/30 to-yellow-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-4xl mb-2">🎖️</div>
            <div className="text-4xl font-bold text-white mb-1">{earnedBadges.length}</div>
            <div className="text-sm text-gray-300">Total Badges</div>
          </div>
        </div>

        {/* Module Breakdown */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">📊 Module Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scores.map((scoreData, idx) => {
              const module = quizData.topics.find(t => t.id === scoreData.moduleId);
              return (
                <div key={idx} className="bg-black/30 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{module?.icon || '📝'}</div>
                      <div>
                        <div className="font-bold text-white">{module?.title || scoreData.moduleId}</div>
                        <div className="text-sm text-gray-400">{scoreData.score}/{scoreData.total} correct</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{scoreData.percentage}%</div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        scoreData.percentage === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        scoreData.percentage >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        scoreData.percentage >= 60 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                        'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${scoreData.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badge Showcase by Category */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🏅 All Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(badgesByCategory).map(([category, badges]) => {
              if (badges.length === 0) return null;
              return (
                <div key={category} className="bg-black/30 border border-white/10 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-white mb-4 capitalize">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {badges.map(badge => (
                      <div key={badge.id} className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-lg px-4 py-3 text-center">
                        <div className="text-4xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-bold text-white">{badge.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls Mastery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🎮 Controls Mastery</h2>
          <div className="flex justify-center gap-6">
            <div className={`rounded-xl px-8 py-6 text-center ${
              controlsUsed.includes('voice') ? 'bg-blue-600/20 border-2 border-blue-500' : 'bg-gray-700/20 border-2 border-gray-600'
            }`}>
              <div className="text-5xl mb-2">🎤</div>
              <div className="text-sm font-bold text-white">Voice</div>
            </div>
            <div className={`rounded-xl px-8 py-6 text-center ${
              controlsUsed.includes('clap') ? 'bg-cyan-600/20 border-2 border-cyan-500' : 'bg-gray-700/20 border-2 border-gray-600'
            }`}>
              <div className="text-5xl mb-2">👏</div>
              <div className="text-sm font-bold text-white">Clap</div>
            </div>
            <div className={`rounded-xl px-8 py-6 text-center ${
              controlsUsed.includes('gesture') ? 'bg-orange-600/20 border-2 border-orange-500' : 'bg-gray-700/20 border-2 border-gray-600'
            }`}>
              <div className="text-5xl mb-2">✋</div>
              <div className="text-sm font-bold text-white">Gestures</div>
            </div>
          </div>
        </div>

        {/* GRAND HALL OF FAME (LEADERBOARD) */}
        <div className="mb-12 border-t border-white/10 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-2 italic">GLOBAL HALL OF FAME</h2>
            <p className="text-gray-400">Where the best ZPD recruits are honored!</p>
          </div>
          <Leaderboard />
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold text-xl text-white shadow-lg transform transition-all hover:scale-105"
          >
            Play More Modules! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
