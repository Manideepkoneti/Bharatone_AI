import React, { useState } from 'react';
import { IntentAnalysis } from '../../types';
import { UnderstandingPanel } from './UnderstandingPanel';
import { 
  CheckSquare, 
  Square, 
  HelpCircle, 
  ArrowRight, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface StructuredResponseProps {
  analysis: IntentAnalysis;
  onNavigateToModule?: (domain: string) => void;
}

export const StructuredResponse: React.FC<StructuredResponseProps> = ({
  analysis,
  onNavigateToModule
}) => {
  const { showToast } = useNotification();
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleDoc = (index: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Text-To-Speech Readout
  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Audio Not Supported', 'Text-to-speech is not supported in this browser.', 'warning');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = `${analysis.summary}. Required documents: ${analysis.requiredDocuments.join(', ')}. Next steps: ${analysis.recommendedSteps.join(', ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Set voice language if available
    if (analysis.languageCode === 'te') {
      utterance.lang = 'te-IN';
    } else if (analysis.languageCode === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    showToast('Voice Assistant', 'Reading out structured guidance.', 'info');
  };

  return (
    <div className="space-y-5 animate-fade-in text-slate-200">
      {/* 1. AI Understanding Identification Panel */}
      <UnderstandingPanel analysis={analysis} />

      {/* 2. Structured Summary */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            1. Executive Guidance Summary
          </span>
          <button
            type="button"
            onClick={handleReadAloud}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              isPlayingAudio
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-orange-400" />}
            <span>{isPlayingAudio ? 'Stop Voice' : 'Read Aloud'}</span>
          </button>
        </div>
        <p className="text-sm sm:text-base text-white leading-relaxed font-telugu">
          {analysis.summary}
        </p>
      </div>

      {/* 3. Information Needed (Interactive Questions) */}
      {analysis.clarifyingQuestions && analysis.clarifyingQuestions.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
            <HelpCircle className="w-4 h-4" />
            <span>2. Information Needed / Eligibility Checks</span>
          </div>
          <div className="space-y-2">
            {analysis.clarifyingQuestions.map((q, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-telugu">{q}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Interactive Document Checklist */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-emerald-500/20 bg-gradient-to-br from-emerald-950/15 via-slate-900 to-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            3. Required Documents Checklist
          </span>
          <span className="text-[11px] text-slate-400">
            Tick items as you gather them
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {analysis.requiredDocuments.map((doc, idx) => {
            const isChecked = !!checkedDocs[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleDoc(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                  isChecked
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/80 border-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs leading-relaxed font-telugu ${isChecked ? 'line-through opacity-80' : ''}`}>
                  {doc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recommended Next Steps (Numbered steps) */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
          4. Recommended Action Sequence
        </span>
        <div className="space-y-2.5">
          {analysis.recommendedSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-200">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed font-telugu">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Important Official Verification Note (Required in Prompt) */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 block mb-0.5 uppercase tracking-wide text-[10px]">
            Official Verification Requirement
          </span>
          <p className="font-telugu">{analysis.disclaimer}</p>
        </div>
      </div>

      {/* 7. Action Button / Direct Workflow Deep Link */}
      {analysis.deepLink && onNavigateToModule && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onNavigateToModule(analysis.deepLink!)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 group"
          >
            <span>
              Open Interactive {analysis.domain.charAt(0).toUpperCase() + analysis.domain.slice(1)} Module
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
