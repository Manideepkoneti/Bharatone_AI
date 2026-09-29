import React, { useState, useEffect } from 'react';
import { VoiceService } from '../../services/voiceService';
import { Play, Pause, Square, Volume2, RotateCcw } from 'lucide-react';

interface VoiceControlsProps {
  textToSpeak: string;
  languageCode: string;
  isSpeaking: boolean;
  onStateChange?: (speaking: boolean, paused: boolean) => void;
  className?: string;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  textToSpeak,
  languageCode,
  isSpeaking: parentIsSpeaking,
  onStateChange,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(parentIsSpeaking);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPlaying(parentIsSpeaking);
  }, [parentIsSpeaking]);

  const handlePlay = () => {
    if (isPaused) {
      VoiceService.resume();
      setIsPaused(false);
      setIsPlaying(true);
      onStateChange?.(true, false);
      return;
    }

    VoiceService.speak(textToSpeak, languageCode, {
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
        onStateChange?.(true, false);
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
        onStateChange?.(false, false);
      },
      onError: () => {
        setIsPlaying(false);
        setIsPaused(false);
        onStateChange?.(false, false);
      },
      onPause: () => {
        setIsPaused(true);
        setIsPlaying(false);
        onStateChange?.(false, true);
      },
      onResume: () => {
        setIsPaused(false);
        setIsPlaying(true);
        onStateChange?.(true, false);
      }
    });
  };

  const handlePause = () => {
    VoiceService.pause();
    setIsPaused(true);
    setIsPlaying(false);
    onStateChange?.(false, true);
  };

  const handleStop = () => {
    VoiceService.stop();
    setIsPlaying(false);
    setIsPaused(false);
    onStateChange?.(false, false);
  };

  const handleReplay = () => {
    handleStop();
    setTimeout(() => {
      handlePlay();
    }, 150);
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10 ${className}`}>
      {/* Play / Pause Toggle */}
      {isPlaying ? (
        <button
          type="button"
          onClick={handlePause}
          title="Pause Voice"
          className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
        >
          <Pause className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Pause</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          title={isPaused ? "Resume Voice" : "Play Voice"}
          className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline text-[11px]">{isPaused ? 'Resume' : 'Play'}</span>
        </button>
      )}

      {/* Stop Button */}
      <button
        type="button"
        onClick={handleStop}
        disabled={!isPlaying && !isPaused}
        title="Stop Voice"
        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center gap-1 text-xs"
      >
        <Square className="w-3.5 h-3.5 fill-current" />
        <span className="hidden sm:inline text-[11px]">Stop</span>
      </button>

      {/* Read Aloud Button */}
      <button
        type="button"
        onClick={handlePlay}
        title="Read Aloud"
        className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1 text-xs font-medium"
      >
        <Volume2 className="w-3.5 h-3.5 text-orange-400" />
        <span className="text-[11px]">Read Aloud</span>
      </button>

      {/* Replay Button */}
      <button
        type="button"
        onClick={handleReplay}
        title="Replay Voice"
        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-sky-500/10 transition-all flex items-center gap-1 text-xs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px]">Replay</span>
      </button>

      {/* Animated Waveform when speaking */}
      {isPlaying && (
        <div className="flex items-center gap-0.5 px-2 py-1 rounded-md bg-sky-500/10 border border-sky-500/20">
          <span className="w-0.5 h-3 bg-sky-400 animate-pulse rounded-full" />
          <span className="w-0.5 h-5 bg-orange-400 animate-pulse delay-75 rounded-full" />
          <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-150 rounded-full" />
          <span className="w-0.5 h-4 bg-sky-300 animate-pulse delay-100 rounded-full" />
          <span className="w-0.5 h-3 bg-orange-300 animate-pulse rounded-full" />
          <span className="text-[10px] font-mono text-sky-300 ml-1">Speaking...</span>
        </div>
      )}
    </div>
  );
};
