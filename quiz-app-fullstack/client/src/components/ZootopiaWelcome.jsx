import { useState, useEffect } from 'react';

export default function CinematicZootopiaIntro() {
  const [showJudy, setShowJudy] = useState(false);
  const [showNick, setShowNick] = useState(false);
  const [judyMessage, setJudyMessage] = useState('');
  const [nickMessage, setNickMessage] = useState('');
  const [cameraZoom, setCameraZoom] = useState(false);

  useEffect(() => {
    // Camera zoom in effect
    setTimeout(() => setCameraZoom(true), 100);

    // Judy enters first from left
    setTimeout(() => {
      setShowJudy(true);
      setJudyMessage("Welcome to Zootopia! 🎉");
    }, 500);

    // Nick enters from right
    setTimeout(() => {
      setShowNick(true);
      setNickMessage("Ready for some AdTech action? 😎");
    }, 1800);

    // Judy second message
    setTimeout(() => {
      setJudyMessage("In Zootopia, anyone can be anything!");
    }, 3800);

    // Nick second message  
    setTimeout(() => {
      setNickMessage("Even an AdTech quiz champion! Let's go!");
    }, 5300);
  }, []);

  return (
    <>
      {/* Cinematic Camera Effect - Zoom & Blur */}
      <div className={`fixed inset-0 pointer-events-none z-35 transition-all duration-2000 ${cameraZoom ? 'scale-100' : 'scale-110 blur-sm'}`}>
        
        {/* Animated Vehicles - Zootopia City Life */}
        <div className="absolute inset-0">
          {/* Police Car - ZPD patrol */}
          <div className="absolute top-[15%] animate-vehicle-left opacity-80" style={{ fontSize: '4rem' }}>
            🚔
          </div>
          
          {/* Taxi - Yellow cab */}
          <div className="absolute top-[35%] animate-vehicle-right opacity-80" style={{ animationDelay: '2.5s', fontSize: '3.5rem' }}>
            🚕
          </div>
          
          {/* Bus - City transit */}
          <div className="absolute top-[55%] animate-vehicle-left opacity-70" style={{ animationDelay: '5s', fontSize: '4.5rem' }}>
            🚌
          </div>
          
          {/* Regular Car */}
          <div className="absolute top-[75%] animate-vehicle-right opacity-70" style={{ animationDelay: '1.5s', fontSize: '3rem' }}>
            🚗
          </div>
          
          {/* Train - In background */}
          <div className="absolute top-[25%] animate-vehicle-left opacity-60" style={{ animationDelay: '7s', fontSize: '5rem' }}>
            🚂
          </div>
        </div>
      </div>

      {/* Officer Judy Hopps - Left Side - CINEMATIC */}
      <div className={`fixed left-0 bottom-0 z-50 transition-all duration-1200 ease-out ${showJudy ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className="relative character-judy">
          
          {/* Character Image Placeholder - Replace with real image */}
          <div className="w-80 h-[500px] relative character-container">
            
            {/* Movie-Quality Character Render */}
            <div className="absolute inset-0 flex flex-col items-center justify-end perspective-1000">
              
              {/* Ears - More realistic */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-6 z-10">
                <div className="w-8 h-32 bg-gradient-to-b from-purple-100 via-purple-300 to-purple-500 rounded-full transform rotate-[-20deg] shadow-2xl border-2 border-purple-600/30"></div>
                <div className="w-8 h-32 bg-gradient-to-b from-purple-100 via-purple-300 to-purple-500 rounded-full transform rotate-[20deg] shadow-2xl border-2 border-purple-600/30"></div>
              </div>
              
              {/* Head - Hyper realistic */}
              <div className="w-40 h-40 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-full mt-24 relative border-4 border-purple-500/50 shadow-2xl animate-subtle-breath">
                {/* Fur texture effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/40 to-transparent"></div>
                
                {/* Big eyes */}
                <div className="absolute top-14 left-10 flex gap-6">
                  <div className="w-6 h-6 bg-purple-900 rounded-full shadow-lg animate-blink-realistic">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                  <div className="w-6 h-6 bg-purple-900 rounded-full shadow-lg animate-blink-realistic">
                    <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                </div>
                
                {/* Nose */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-5 h-4 bg-pink-400 rounded-full shadow-inner"></div>
                
                {/* White belly marking */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-t from-white to-purple-100 rounded-t-full opacity-80"></div>
              </div>
              
              {/* Body - ZPD Uniform */}
              <div className="w-36 h-52 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 rounded-t-3xl relative mt-3 shadow-2xl border-l-4 border-r-4 border-blue-700/50">
                {/* Badge - Shiny metal effect */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-600 flex items-center justify-center text-xs font-black shadow-xl animate-badge-shine">
                  <span className="text-blue-900">ZPD</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/50 to-transparent animate-shine"></div>
                </div>
                
                {/* Arms - Waving */}
                <div className="absolute -left-10 top-12 w-8 h-20 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full transform rotate-[-25deg] origin-top animate-wave-arm shadow-lg"></div>
                <div className="absolute -right-10 top-12 w-8 h-20 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full rotate-[25deg] shadow-lg"></div>
                
                {/* Belt */}
                <div className="absolute bottom-12 inset-x-0 h-3 bg-black"></div>
              </div>
              
              {/* Lighting effects */}
              <div className="absolute inset-0 bg-purple-400 blur-3xl opacity-20 animate-pulse-glow"></div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-30 animate-rim-light"></div>
            </div>
          </div>

          {/* Speech Bubble - Cinematic */}
          {judyMessage && (
            <div className="absolute left-full top-32 ml-6 animate-bubble-in">
              <div className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-xl text-gray-900 px-8 py-5 rounded-3xl rounded-bl-none shadow-2xl border-4 border-purple-400 max-w-sm relative transform hover:scale-105 transition-transform">
                <p className="font-bold text-lg leading-snug">{judyMessage}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                <div className="absolute -left-5 bottom-6 w-0 h-0 border-t-[25px] border-t-transparent border-r-[25px] border-r-purple-400 border-b-[25px] border-b-transparent"></div>
                <div className="absolute -left-4 bottom-6 w-0 h-0 border-t-[22px] border-t-transparent border-r-[22px] border-r-white border-b-[22px] border-b-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nick Wilde - Right Side - CINEMATIC */}
      <div className={`fixed right-0 bottom-0 z-50 transition-all duration-1200 ease-out ${showNick ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="relative character-nick">
          
          {/* Character Image Placeholder */}
          <div className="w-80 h-[500px] relative character-container">
            
            {/* Movie-Quality Character Render */}
            <div className="absolute inset-0 flex flex-col items-center justify-end perspective-1000">
              
              {/* Fox Ears - Pointed */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-10 z-10">
                <div className="w-10 h-20 bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 rounded-full transform rotate-[-30deg] shadow-2xl border-2 border-orange-800/50 clip-triangle"></div>
                <div className="w-10 h-20 bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 rounded-full transform rotate-[30deg] shadow-2xl border-2 border-orange-800/50 clip-triangle"></div>
              </div>
              
              {/* Head - Sly Fox */}
              <div className="w-40 h-40 bg-gradient-to-br from-orange-300 via-orange-500 to-orange-600 rounded-full mt-28 relative border-4 border-orange-700/50 shadow-2xl animate-subtle-breath" style={{ animationDelay: '0.3s' }}>
                {/* Fur texture */}
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-orange-200/40 to-transparent"></div>
                
                {/* Sly eyes - Green */}
                <div className="absolute top-14 left-10 flex gap-6">
                  <div className="w-5 h-4 bg-green-600 rounded-full shadow-lg transform -skew-x-6">
                    <div className="w-2 h-2 bg-black rounded-full absolute top-1 left-1.5"></div>
                    <div className="w-1h-1 bg-white rounded-full absolute top-0.5 right-1"></div>
                  </div>
                  <div className="w-5 h-4 bg-green-600 rounded-full shadow-lg transform skew-x-6">
                    <div className="w-2 h-2 bg-black rounded-full absolute top-1 left-1.5"></div>
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-1"></div>
                  </div>
                </div>
                
                {/* Snout - White */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-white to-orange-100 rounded-full shadow-inner">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-3 bg-black rounded-b-full"></div>
                </div>
                
                {/* Smirk */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-2 border-b-2 border-orange-900 rounded-full transform rotate-12"></div>
              </div>
              
              {/* Body - Green Hawaiian Shirt */}
              <div className="w-36 h-52 bg-gradient-to-b from-green-700 via-green-600 to-green-800 rounded-t-3xl relative mt-3 shadow-2xl border-l-4 border-r-4 border-green-700/80">
                {/* Hawaiian pattern */}
                <div className="absolute inset-4 text-2xl opacity-70">
                  <span className="absolute top-2 left-2">🌺</span>
                  <span className="absolute top-8 right-3">🌺</span>
                  <span className="absolute bottom-6 left-4">🌺</span>
                  <span className="absolute top-16 left-1/2">🌴</span>
                </div>
                
                {/* Arms - Confident pose */}
                <div className="absolute -left-10 top-12 w-8 h-20 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full transform rotate-[20deg] shadow-lg animate-sway-arm"></div>
                <div className="absolute -right-10 top-16 w-8 h-20 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full rotate-[-90deg] origin-top shadow-lg">
                  {/* Thumbs up gesture */}
                  <div className="absolute -top-4 right-0 w-3 h-6 bg-orange-400 rounded-full transform rotate-90"></div>
                </div>
              </div>
              
              {/* Lighting effects */}
              <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-20 animate-pulse-glow"></div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-300 rounded-full blur-2xl opacity-30 animate-rim-light" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Speech Bubble - Cinematic */}
          {nickMessage && (
            <div className="absolute right-full top-32 mr-6 animate-bubble-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-white to-orange-50 backdrop-blur-xl text-gray-900 px-8 py-5 rounded-3xl rounded-br-none shadow-2xl border-4 border-orange-400 max-w-sm relative transform hover:scale-105 transition-transform">
                <p className="font-bold text-lg leading-snug">{nickMessage}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                <div className="absolute -right-5 bottom-6 w-0 h-0 border-t-[25px] border-t-transparent border-l-[25px] border-l-orange-400 border-b-[25px] border-b-transparent"></div>
                <div className="absolute -right-4 bottom-6 w-0 h-0 border-t-[22px] border-t-transparent border-l-[22px] border-l-white border-b-[22px] border-b-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
