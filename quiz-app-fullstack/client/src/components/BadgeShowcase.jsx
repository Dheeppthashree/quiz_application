import Badge from './Badge';
import { getBadgeById } from '../utils/badgeSystem';

export default function BadgeShowcase({ newlyEarnedBadges = [] }) {
  if (newlyEarnedBadges.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border-2 border-purple-500/50">
      <h3 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        🎉 New Badges Earned! 🎉
      </h3>
      
      <div className="flex justify-center gap-6 flex-wrap">
        {newlyEarnedBadges.map((badgeId, index) => {
          const badge = getBadgeById(badgeId);
          if (!badge) return null;
          
          return (
            <div 
              key={badgeId} 
              className="animate-bounce-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Badge badge={badge} isLocked={false} showAnimation={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
