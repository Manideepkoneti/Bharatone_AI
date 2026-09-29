import React from 'react';

interface AIOrbProps {
  size?: 'sm' | 'md' | 'lg';
  isThinking?: boolean;
  isSpeaking?: boolean;
}

export const AIOrb: React.FC<AIOrbProps> = ({ size = 'md', isThinking = false, isSpeaking = false }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  const orbSize = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
      {/* Outer Pulse Rings */}
      <div 
        className={`absolute inset-0 rounded-full border border-sky-400/20 bg-sky-500/5 ${
          isSpeaking ? 'animate-ping border-orange-400/40 bg-orange-500/10' : isThinking ? 'animate-ping' : 'animate-pulse-ring'
        }`}
        style={{ animationDuration: isSpeaking ? '1.2s' : isThinking ? '2s' : '4s' }}
      />
      <div 
        className={`absolute inset-2 rounded-full border border-orange-500/20 bg-orange-500/5 ${isSpeaking ? 'animate-pulse scale-110' : 'animate-pulse-ring'}`}
        style={{ animationDuration: isSpeaking ? '0.8s' : '6s', animationDelay: '1s' }}
      />
      <div 
        className="absolute inset-4 rounded-full border border-emerald-500/20 bg-emerald-500/5 animate-pulse-ring"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
      />

      {/* Floating Ambient Glow */}
      <div 
        className={`absolute rounded-full filter blur-xl opacity-60 ${
          isSpeaking
            ? 'bg-gradient-to-r from-orange-500 via-amber-400 to-sky-400 animate-pulse'
            : isThinking 
            ? 'bg-gradient-to-r from-orange-500 via-sky-400 to-emerald-400 animate-spin' 
            : 'bg-gradient-to-tr from-sky-500 via-blue-600 to-orange-500'
        } ${sizeMap[size]}`}
        style={{ animationDuration: isSpeaking ? '1s' : isThinking ? '4s' : '10s' }}
      />

      {/* Central Core Orb */}
      <div 
        className={`relative rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-500 ${orbSize[size]} ${
          isSpeaking
            ? 'scale-110 shadow-orange-500/60 ring-2 ring-orange-400/50'
            : isThinking
            ? 'scale-105 shadow-sky-500/40'
            : 'shadow-orange-500/30'
        }`}
        style={{
          background: isSpeaking 
            ? 'radial-gradient(circle at 30% 30%, #fb923c 0%, #ea580c 40%, #0b0f19 100%)'
            : 'radial-gradient(circle at 30% 30%, #38bdf8 0%, #1e3a8a 50%, #0b0f19 100%)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}
      >
        {/* Subtle Indian Tricolor Core Glimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-white/10 to-emerald-500/20 opacity-70 pointer-events-none" />

        {/* Animated Sound Waves inside / across orb when speaking */}
        {isSpeaking ? (
          <div className="flex items-center gap-1 z-10">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-7 bg-white rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
            <span className="w-1 h-5 bg-white rounded-full animate-bounce" style={{ animationDelay: '225ms' }} />
            <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
          </div>
        ) : (
          <>
            {/* Inner Light Flare */}
            <div className="w-2.5 h-2.5 rounded-full bg-white/90 filter blur-xs animate-ping" style={{ animationDuration: '3s' }} />

            {/* Subtle Floating Sparkles */}
            <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full opacity-80" />
            <div className="absolute bottom-3 right-4 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-70" />
          </>
        )}
      </div>

      {/* Floating Sound Wave Label beneath orb when speaking */}
      {isSpeaking && (
        <div className="absolute -bottom-6 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-[10px] font-bold text-orange-300 tracking-wider font-mono animate-pulse">
          <span>AI SPEAKING</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
        </div>
      )}
    </div>
  );
};
