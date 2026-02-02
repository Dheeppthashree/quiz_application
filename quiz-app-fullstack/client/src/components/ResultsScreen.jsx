import ZootopiaBackground from './ZootopiaBackground';
import BadgeShowcase from './BadgeShowcase';

export default function ResultsScreen({ score, total, onRetry, newlyEarnedBadges = [] }) {
  const percentage = Math.round((score / total) * 100);
  
  // Determine performance emoji
  let performanceEmoji = '🎉';
  let performanceText = 'Great job!';
  
  if (percentage === 100) {
    performanceEmoji = '🏆';
    performanceText = 'Perfect Score!';
  } else if (percentage >= 80) {
    performanceEmoji = '⭐';
    performanceText = 'Excellent!';
  } else if (percentage >= 60) {
    performanceEmoji = '👍';
    performanceText = 'Good effort!';
  } else {
    performanceEmoji = '💪';
    performanceText = 'Keep trying!';
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in relative">
      {/* RAINFOREST DISTRICT - Realistic Tropical Environment */}
      <ZootopiaBackground district="rainforest" />
      
      <div className="glass-card p-8 relative z-10">
        {/* Performance Emoji */}
        <div className="text-8xl mb-4 animate-bounce-in">
          {performanceEmoji}
        </div>
        
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
          {performanceText}
        </h2>
        
        <div className="mb-6">
          <div className="text-7xl font-bold mb-2 text-white">
            {percentage}%
          </div>
          <p className="text-xl opacity-80">
            You scored {score} out of {total}
          </p>
        </div>

        {/* Badge Showcase */}
        <BadgeShowcase newlyEarnedBadges={newlyEarnedBadges} />

        {/* Action Button */}
        <button 
          onClick={onRetry} 
          className="btn-primary w-full text-lg mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-xl"
        >
          Choose Next Module 🚀
        </button>
      </div>
    </div>
  );
}
