// Zootopia-inspired background component with realistic district backgrounds
export default function ZootopiaBackground({ district = 'savanna' }) {
  const backgrounds = {
    savanna: {
      // Savanna Central - Futuristic metropolis with golden lighting
      gradient: 'from-amber-500 via-orange-400 to-yellow-300',
      imageUrl: '/savanna_central.png',
      overlay: 'from-orange-900/40 via-orange-800/20 to-transparent',
      blur: 'blur-[2px]'
    },
    tundratown: {
      // Tundratown - Arctic city with ice architecture
      gradient: 'from-blue-400 via-cyan-300 to-blue-200',
      imageUrl: '/tundratown.png',
      overlay: 'from-blue-900/40 via-cyan-800/25 to-transparent',
      blur: 'blur-[2px]'
    },
    rainforest: {
      // Rainforest District - Lush tropical urban jungle
      gradient: 'from-emerald-500 via-green-400 to-teal-300',
      imageUrl: '/rainforest.png',
      overlay: 'from-green-900/40 via-emerald-800/25 to-transparent',
      blur: 'blur-[1px]'
    },
    zpd: {
      // ZPD Headquarters - Official police department
      gradient: 'from-blue-700 via-blue-500 to-cyan-400',
      imageUrl: '/savanna_central.png', // Using Savanna Central as fallback for now
      overlay: 'from-blue-900/50 via-blue-800/30 to-transparent',
      blur: 'blur-[2px]'
    }
  };

  const bg = backgrounds[district] || backgrounds.savanna;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient}`}></div>
      
      {/* Realistic Zootopia city background */}
      <div 
        className={`absolute inset-0 bg-cover bg-center opacity-50 ${bg.blur}`}
        style={{ 
          backgroundImage: `url('${bg.imageUrl}')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}
      ></div>
      
      {/* Atmospheric color overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${bg.overlay}`}></div>
      
      {/* Enhanced vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
      
      {/* Subtle animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
    </div>
  );
}
