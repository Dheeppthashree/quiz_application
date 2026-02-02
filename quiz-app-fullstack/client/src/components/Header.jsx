import { getBadgeById } from '../utils/badgeSystem';

export default function Header({ userName, earnedBadges = [], onLogout }) {
  if (!userName) return null;

  // Show top 5 badges
  const topBadges = earnedBadges.slice(0, 5);
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: User Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl font-bold shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm text-gray-400">Welcome back,</div>
              <div className="text-lg font-bold text-white">{userName}</div>
            </div>
          </div>
        </div>

        {/* Center: Badges */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 mr-2">Badges:</span>
          {topBadges.length > 0 ? (
            <>
              {topBadges.map(badgeId => {
                const badge = getBadgeById(badgeId);
                if (!badge) return null;
                return (
                  <div 
                    key={badgeId} 
                    className="text-3xl hover:scale-125 transition-transform cursor-pointer"
                    title={`${badge.name} - ${badge.description}`}
                  >
                    {badge.icon}
                  </div>
                );
              })}
              {earnedBadges.length > 5 && (
                <div className="text-sm text-gray-400 ml-2">
                  +{earnedBadges.length - 5} more
                </div>
              )}
            </>
          ) : (
            <span className="text-sm text-gray-500 italic">No badges yet - start playing!</span>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullScreen}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
            title="Toggle Full Screen"
          >
            {document.fullscreenElement ? '🗗' : '⛶'}
          </button>
          
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 transition-all text-sm font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
