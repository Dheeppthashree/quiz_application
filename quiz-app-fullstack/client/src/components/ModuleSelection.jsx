import quizData from '../data/quiz-data';
import ZootopiaBackground from './ZootopiaBackground';

export default function ModuleSelection({ 
  completedModules = [], 
  onSelectModule, 
  onBackToWelcome, 
  onViewOverallAnalytics,
  settings = { timerEnabled: false },
  onUpdateSettings
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 relative">
      {/* SAVANNA CENTRAL - Realistic City District */}
      <ZootopiaBackground district="savanna" />
      
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}>
          Choose Your Next Adventure
        </h1>
        <p className="text-xl opacity-90 mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
          Continue your journey through Zootopia
        </p>
        <p className="text-sm text-gray-300 opacity-80">
          {completedModules.length} of {quizData.topics.length} modules completed
        </p>
      </div>

      {/* Quiz Settings */}
      <div className="max-w-md mx-auto mb-12 relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          ⚙️ Quiz Settings
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⏱️</div>
            <div>
              <div className="font-bold text-white">Timed Challenge</div>
              <div className="text-xs text-gray-400">30 seconds per question</div>
            </div>
          </div>
          <button
            onClick={() => onUpdateSettings({ ...settings, timerEnabled: !settings.timerEnabled })}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none 
              ${settings.timerEnabled ? 'bg-orange-500' : 'bg-gray-700'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${settings.timerEnabled ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        {quizData.topics.map((topic) => {
          const isCompleted = completedModules.includes(topic.id);
          
          return (
            <button
              key={topic.id}
              onClick={() => onSelectModule(topic.id)}
              className={`
                group relative p-6 rounded-2xl border-2 transition-all duration-300
                bg-black/40 backdrop-blur-lg
                ${isCompleted 
                  ? 'border-green-500/50 hover:border-green-400' 
                  : 'border-white/20 hover:border-orange-400'
                }
                hover:scale-105 hover:shadow-2xl
                transform
              `}
            >
              {/* Completion Badge */}
              {isCompleted && (
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl shadow-lg z-10">
                  ✓
                </div>
              )}

              {/* Icon */}
              <div className="text-6xl mb-4">{topic.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-300 transition-colors">
                {topic.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4">
                {topic.description}
              </p>

              {/* Questions count */}
              <div className="text-xs text-gray-400">
                {topic.questions.length} Questions
              </div>

              {/* Status */}
              <div className={`
                mt-4 px-4 py-2 rounded-lg text-sm font-semibold
                ${isCompleted 
                  ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
                  : 'bg-orange-600/20 text-orange-300 border border-orange-500/30'
                }
              `}>
                {isCompleted ? '✓ Completed - Play Again' : 'Start Module'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Overall Analytics Button (only if all 5 completed) */}
      {completedModules.length === 5 && onViewOverallAnalytics && (
        <div className="flex justify-center mb-10 relative z-10">
          <button
            onClick={onViewOverallAnalytics}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-2xl font-black text-xl text-white shadow-[0_0_25px_rgba(245,158,11,0.5)] transform transition-all hover:scale-105 hover:rotate-1"
          >
            <span>🎓 View Overall Certificates & Stats</span>
            <span className="text-2xl animate-bounce">➜</span>
          </button>
        </div>
      )}

      {/* Back Button */}
      {onBackToWelcome && (
        <div className="text-center relative z-10">
          <button
            onClick={onBackToWelcome}
            className="px-6 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-white border border-white/20 transition-all"
          >
            ← Back to Welcome
          </button>
        </div>
      )}
    </div>
  );
}
