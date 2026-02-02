import { useState, useEffect } from 'react';
import { quizAPI } from '../services/api';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await quizAPI.getLeaderboard();
        setLeaders(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Could not load global rankings.');
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-8 animate-pulse">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-orange-200 font-bold animate-bounce">Filing cases at ZPD...</p>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-xl text-center">
      <p className="text-red-300 font-medium">{error}</p>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/40 to-purple-600/40 p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👮‍♂️</span>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white">Global Hall of Fame</h3>
          </div>
          <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-blue-300 uppercase">Top 10 Officers</span>
        </div>

        {/* List */}
        <div className="divide-y divide-white/5">
          {leaders.length === 0 ? (
            <div className="p-8 text-center text-gray-500 italic">No records found yet. Be the first!</div>
          ) : (
            leaders.map((leader, index) => {
              const isTop3 = index < 3;
              const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : null;
              
              return (
                <div 
                  key={index} 
                  className={`flex items-center justify-between p-4 transition-all hover:bg-white/5 ${isTop3 ? 'bg-white/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      index === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' :
                      index === 2 ? 'bg-orange-700/20 text-orange-400 border border-orange-700/30' :
                      'bg-white/5 text-gray-400'
                    }`}>
                      {rankIcon || index + 1}
                    </div>
                    <div>
                      <div className={`font-bold ${isTop3 ? 'text-white' : 'text-gray-300'}`}>
                        {leader.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        Officer Level: {leader.percentage >= 90 ? 'Chief' : leader.percentage >= 70 ? 'Sergeant' : 'Cadet'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-xl font-black ${isTop3 ? 'text-orange-400' : 'text-gray-400'}`}>
                      {leader.score}
                    </div>
                    <div className="text-[10px] font-bold text-gray-500">
                      {leader.percentage}% Accuracy
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <p className="text-center mt-4 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
        Records provided by ZPD Central Data Center
      </p>
    </div>
  );
}
