import { useState } from 'react';
import quizData from '../data/quiz-data';
import ZootopiaBackground from './ZootopiaBackground';
import CinematicZootopiaIntro from './ZootopiaWelcome';

export default function WelcomeScreen({ onStart, onDashboard }) {
  const [name, setName] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // If topic selected, allow start

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in relative">
      
      <div className="max-w-3xl relative z-20">
        {/* ZPD Badge Logo */}
        <div className="inline-block bg-yellow-500 text-blue-900 font-black text-sm px-4 py-2 rounded-full border-4 border-yellow-600 mb-4 shadow-xl">
          🚔 ZOOTOPIA POLICE DEPARTMENT 🚔
        </div>
        
        <h1 className="text-7xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-orange-500 drop-shadow-2xl" style={{ fontFamily: "'Bangers', cursive", textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
            ZOOTOPIA QUIZ
        </h1>
        <p className="text-3xl font-bold text-white drop-shadow-lg mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            🦊 Try Everything! 🐰
        </p>
        <p className="text-xl text-white/90 leading-relaxed mb-8 drop-shadow-md">
            In Zootopia, anyone can be anything. Test your knowledge!
        </p>
        
        <button 
          onClick={onDashboard}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold text-sm backdrop-blur-md transition-all hover:scale-105"
        >
          🏆 View Hall of Fame
        </button>
       </div>

       <div className="glass-card p-8 max-w-2xl mx-auto shadow-2xl border-t border-white/10 bg-black/30 backdrop-blur-lg" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>
         
         {/* Name Input */}
         <div className="mb-8 text-left">
           <label className="block text-sm font-bold mb-3 text-orange-400 tracking-wider">PLAYER NAME</label>
           <input 
             type="text" 
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full bg-black/40 border-2 border-white/5 rounded-xl px-4 py-4 text-white text-lg focus:border-orange-500 focus:bg-black/60 outline-none transition-all placeholder-gray-600"
             placeholder="Enter your name..."
           />
         </div>

         {/* Topic Selection */}
         <div className="mb-8 text-left">
            <label className="block text-sm font-bold mb-3 text-cyan-400 tracking-wider">SELECT A TOPIC</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quizData.topics.map(topic => (
                    <button
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`p-4 rounded-xl text-left border-2 transition-all flex items-center gap-3 group
                            ${selectedTopicId === topic.id 
                                ? 'border-orange-500 bg-orange-500/10' 
                                : 'border-white/5 bg-black/20 hover:bg-white/5 hover:border-white/20'
                            }`}
                    >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                        <div>
                            <div className={`font-bold ${selectedTopicId === topic.id ? 'text-white' : 'opacity-80'}`}>
                                {topic.title}
                            </div>
                            <div className="text-xs opacity-60 line-clamp-1">{topic.description}</div>
                        </div>
                    </button>
                ))}
            </div>
         </div>

         <button 
           onClick={() => name && selectedTopicId && onStart(name, selectedTopicId)}
           disabled={!name || !selectedTopicId}
           className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transform transition-all
              ${name && selectedTopicId 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 hover:from-orange-400 hover:to-red-500 text-white' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
         >
           Start Quiz 🚀
         </button>
       </div>
    </div>
  );
}
