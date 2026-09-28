import React from 'react';
import { QUICK_PROMPTS } from '../../data/scenarios';
import { Language } from '../../types';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  selectedLang: Language;
}

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelectPrompt, selectedLang }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
        <span>Try Asking BharatOne:</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {QUICK_PROMPTS.map((item, idx) => {
          let label = item.label;
          if (selectedLang === 'te') label = item.labelTelugu;
          if (selectedLang === 'hi') label = item.labelHindi;

          return (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.prompt)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel text-xs font-medium text-slate-200 hover:text-white border border-white/10 hover:border-orange-500/40 hover:bg-slate-800/90 transition-all hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span className="group-hover:text-orange-300 transition-colors font-telugu">
                {label}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
