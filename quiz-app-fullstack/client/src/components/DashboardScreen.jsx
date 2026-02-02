import { useState } from 'react';
import ZootopiaBackground from './ZootopiaBackground';

export default function DashboardScreen({ onBack }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Zootopia-Inspired Characters
  const players = [
    { 
        id: 1, 
        name: "Officer Hopps", 
        species: "Rabbit 🐰",
        score: "9999", 
        rank: "Top Cop ⭐", 
        avatar: "/mouse.png", // Placeholder until character avatars generated
        bio: "Never lets a fox get away. Determined and brave.",
        stats: { Speed: 95, Intel: 100, Luck: 60 }
    },
    { 
        id: 2, 
        name: "Nick the Fox", 
        species: "Red Fox 🦊",
        score: "8500", 
        rank: "Sly Hustler 🎩", 
        avatar: "/cat.png", // Placeholder
        bio: "Clever con artist turned hero. Always one step ahead.",
        stats: { Speed: 80, Intel: 95, Luck: 85 }
    },
    { 
        id: 3, 
        name: "Flash", 
        species: "Three-Toed Sloth 🦥",
        score: "1200", 
        rank: "DMV Legend 🐌", 
        avatar: "/rocket.png", // Placeholder
        bio: "The fastest... sloth... at the DMV. What... do... you... need?",
        stats: { Speed: 5, Intel: 50, Luck: 100 }
    },
    { 
        id: 4, 
        name: "Clawhauser", 
        species: "Cheetah 🐆",
        score: "7200", 
        rank: "Donut Expert 🍩", 
        avatar: "/tom_and_jerry.png", // Placeholder
        bio: "Loves Gazelle and donuts. The friendliest officer in Zootopia.",
        stats: { Speed: 100, Intel: 40, Luck: 70 }
    }
  ];

  const activePlayer = selectedPlayer || players[0];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-fade-in">
      
      {/* ZPD HEADQUARTERS - Official Police Department Background */}
      <ZootopiaBackground district="zpd" />
      
      {/* ZPD BADGE DESIGN */}
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 rounded-3xl border-[16px] border-yellow-500 shadow-[0_30px_60px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        
        {/* Gold Badge Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Left Side: Character Portrait */}
        <div className="w-full md:w-1/2 p-8 border-r-[6px] border-yellow-600 flex flex-col items-center relative">
            
            {/* ZPD Logo */}
            <div className="absolute top-4 left-4 bg-yellow-500 text-blue-900 font-black text-xs px-3 py-1 rounded-full border-2 border-yellow-600">
                ZPD
            </div>

            {/* Character Display */}
            <div className="w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border-[8px] border-yellow-600 p-6 shadow-2xl flex flex-col items-center mb-6 aspect-square relative overflow-hidden group">
                <img 
                    src={activePlayer.avatar} 
                    alt={activePlayer.name} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700 shadow-2xl"
                />
                
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
            </div>

            {/* Badge Number */}
            <div className="flex items-center gap-4 bg-yellow-500 px-6 py-3 rounded-full border-4 border-yellow-600 shadow-lg">
                <span className="text-blue-900 font-black text-2xl">BADGE #{activePlayer.id.toString().padStart(3, '0')}</span>
            </div>
        </div>

        {/* Right Side: Officer Data */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col">
            
            {/* ZPD Terminal Display */}
            <div className="bg-slate-900 text-green-400 font-mono p-6 rounded-xl border-4 border-slate-700 mb-6 shadow-2xl grow">
                <div className="flex items-center gap-2 mb-4 border-b border-green-800 pb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-600">ZOOTOPIA POLICE DEPARTMENT DATABASE</span>
                </div>

                <h2 className="text-2xl font-black uppercase mb-1 text-yellow-400">OFFICER FILE</h2>
                <h3 className="text-5xl mb-2 text-cyan-400 tracking-tight font-heading">{activePlayer.name}</h3>
                <div className="text-sm text-gray-400 mb-4">Species: {activePlayer.species}</div>
                
                <div className="space-y-2 text-sm">
                    <p className="text-yellow-300 italic mb-4">"{activePlayer.bio}"</p>
                    <div className="grid grid-cols-2 gap-3 bg-slate-800 p-3 rounded">
                        <div>SCORE: <span className="text-white font-bold">{activePlayer.score}</span></div>
                        <div>RANK: <span className="text-white font-bold">{activePlayer.rank}</span></div>
                    </div>
                    <hr className="border-green-900 my-4" />
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span>SPEED:</span>
                            <div className="w-2/3 h-3 bg-slate-800 rounded-full border border-green-900">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{width: activePlayer.stats.Speed+'%'}}></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>INTEL:</span>
                            <div className="w-2/3 h-3 bg-slate-800 rounded-full border border-green-900">
                                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{width: activePlayer.stats.Intel+'%'}}></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>LUCK:</span>
                            <div className="w-2/3 h-3 bg-slate-800 rounded-full border border-green-900">
                                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full" style={{width: activePlayer.stats.Luck+'%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Officer Selector */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                {players.map(p => (
                    <button 
                        key={p.id}
                        onClick={() => setSelectedPlayer(p)}
                        className={`aspect-square rounded-xl border-4 transition-all overflow-hidden shadow-lg ${selectedPlayer?.id === p.id ? 'border-yellow-500 scale-110 ring-4 ring-yellow-300' : 'border-slate-400 hover:border-yellow-400'}`}
                    >
                        <img src={p.avatar} alt={p.name} className="w-full h-full object-cover bg-slate-700" />
                    </button>
                ))}
            </div>

            <button 
                onClick={onBack}
                className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-black rounded-xl border-b-6 border-yellow-700 active:border-b-0 transition-all uppercase text-lg shadow-lg"
            >
                🚔 Close ZPD Database
            </button>
        </div>
      </div>

    </div>
  );
}
