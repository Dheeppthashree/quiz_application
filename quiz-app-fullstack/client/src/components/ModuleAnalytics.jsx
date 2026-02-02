import quizData from '../data/quiz-data';
import { getBadgeById } from '../utils/badgeSystem';

export default function ModuleAnalytics({ moduleId, score, total, controlsUsed = [], earnedBadges = [], onClose }) {
  const percentage = Math.round((score / total) * 100);
  const module = quizData.topics.find(t => t.id === moduleId);
  
  // Performance evaluation
  let performanceEmoji = '📊';
  let performanceText = 'Keep Learning!';
  if (percentage === 100) {
    performanceEmoji = '🏆';
    performanceText = 'Perfect Score!';
  } else if (percentage >= 80) {
    performanceEmoji = '⭐';
    performanceText = 'Excellent!';
  } else if (percentage >= 60) {
    performanceEmoji = '👍';
    performanceText = 'Good Job!';
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative z-20">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{performanceEmoji}</div>
          <h2 className="text-4xl font-bold text-white mb-2">{performanceText}</h2>
          <p className="text-xl text-gray-300">Module Complete: {module?.title || moduleId}</p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">{score}/{total}</div>
            <div className="text-sm text-gray-300">Questions Correct</div>
          </div>
          <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">{percentage}%</div>
            <div className="text-sm text-gray-300">Accuracy</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-2xl p-6 text-center border border-white/10">
            <div className="text-5xl font-bold text-white mb-2">{earnedBadges.length}</div>
            <div className="text-sm text-gray-300">New Badges</div>
          </div>
        </div>

        {/* Controls Used */}
        {controlsUsed.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Controls Used 🎮</h3>
            <div className="flex justify-center gap-4">
              {controlsUsed.includes('voice') && (
                <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl px-6 py-3 text-center">
                  <div className="text-3xl mb-1">🎤</div>
                  <div className="text-sm text-white">Voice</div>
                </div>
              )}
              {controlsUsed.includes('clap') && (
                <div className="bg-cyan-600/20 border border-cyan-500/30 rounded-xl px-6 py-3 text-center">
                  <div className="text-3xl mb-1">👏</div>
                  <div className="text-sm text-white">Clap</div>
                </div>
              )}
              {controlsUsed.includes('gesture') && (
                <div className="bg-orange-600/20 border border-orange-500/30 rounded-xl px-6 py-3 text-center">
                  <div className="text-3xl mb-1">✋</div>
                  <div className="text-sm text-white">Gestures</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Newly Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">New Badges Earned! 🎖️</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {earnedBadges.map(badgeId => {
                const badge = getBadgeById(badgeId);
                if (!badge) return null;
                return (
                  <div key={badgeId} className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl px-6 py-4 text-center">
                    <div className="text-5xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-bold text-white">{badge.name}</div>
                    <div className="text-xs text-gray-300 mt-1">{badge.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl font-bold text-xl text-white shadow-lg transform transition-all hover:scale-105"
          >
            Choose Next Module ➜
          </button>
        </div>
      </div>
    </div>
  );
}
