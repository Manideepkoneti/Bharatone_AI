import React from 'react';
import { IntentAnalysis } from '../../types';
import { Cpu, CheckCircle2, Globe2, Target, Layers } from 'lucide-react';

interface UnderstandingPanelProps {
  analysis: IntentAnalysis;
}

export const UnderstandingPanel: React.FC<UnderstandingPanelProps> = ({ analysis }) => {
  const domainColors = {
    education: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
    agriculture: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    government: 'text-orange-400 border-orange-500/30 bg-orange-950/40',
    employment: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40',
    healthcare: 'text-rose-400 border-rose-500/30 bg-rose-950/40',
    finance: 'text-amber-400 border-amber-500/30 bg-amber-950/40'
  };

  const domainBadges = {
    education: '🎓 Education',
    agriculture: '🌾 Agriculture',
    government: '🏛️ Public Services',
    employment: '💼 Employment',
    healthcare: '🏥 Healthcare',
    finance: '💰 Finance'
  };

  const confidencePercentage = Math.round(analysis.confidence * 100);

  return (
    <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-slate-900 via-[#0B1323] to-[#0E1A33] p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-sky-300">
            🧠 AI UNDERSTANDING
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{confidencePercentage}% Confidence</span>
        </div>
      </div>

      {/* Grid of Key Identifiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Language */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Globe2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Detected Language</span>
          </div>
          <p className="text-sm font-bold text-white tracking-wide truncate">
            {analysis.language}
          </p>
        </div>

        {/* Intent */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Target className="w-3.5 h-3.5 text-orange-400" />
            <span>Identified Intent</span>
          </div>
          <p className="text-sm font-bold text-orange-300 tracking-wide truncate font-telugu">
            {analysis.intent}
          </p>
        </div>

        {/* Domain */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Assigned Domain</span>
          </div>
          <span className={`inline-block text-xs font-extrabold px-2 py-0.5 rounded-md border ${domainColors[analysis.domain] || 'text-white'}`}>
            {domainBadges[analysis.domain] || analysis.domain.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
