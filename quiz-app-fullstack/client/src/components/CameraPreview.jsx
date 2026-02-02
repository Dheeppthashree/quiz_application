export default function CameraPreview({ enabled, mode }) {
  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass-card p-3 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
           <span className="text-sm font-semibold text-primary">
             {mode === 'gesture' ? '✋ Gesture Camera' : '👁️ Access Camera'}
           </span>
           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
        <div className="relative">
          <video id="camera-preview" autoPlay playsInline muted className="w-48 h-36 rounded-lg bg-black/50 object-cover mirror" />
          <canvas id="camera-canvas" className="absolute top-0 left-0 w-48 h-36 rounded-lg pointer-events-none mirror" />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
            {mode === 'gesture' ? 'Show 1-4 Fingers or Open Palm' : 'Monitoring...'}
        </p>
      </div>
    </div>
  );
}
