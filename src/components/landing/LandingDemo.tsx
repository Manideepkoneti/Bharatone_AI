import React, { useState } from 'react';
import { HACKATHON_DEMO_SCENARIOS, DemoScenario } from '../../data/scenarios';
import { BharatOneAIEngine } from '../../services/aiEngine';
import { IntentAnalysis } from '../../types';
import { Sparkles, ArrowRight, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface LandingDemoProps {
  onStartFullChat: (prompt: string) => void;
}

export const LandingDemo: React.FC<LandingDemoProps> = ({ onStartFullChat }) => {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(HACKATHON_DEMO_SCENARIOS[0]);
  const [analysis, setAnalysis] = useState<IntentAnalysis>(() => 
    BharatOneAIEngine.analyzeQuery({ query: HACKATHON_DEMO_SCENARIOS[0].inputPrompt })
  );

  const handleSelectScenario = (scenario: DemoScenario) => {
    setActiveScenario(scenario);
    const result = BharatOneAIEngine.analyzeQuery({ query: scenario.inputPrompt });
    setAnalysis(result);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Prototype Sandbox</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Try The 3 Core Hackathon Flows
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Test real-time language detection, intent classification, and structured guidance without leaving this page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: scenario selector pills */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Select a Hackathon Test Case:
          </p>
          {HACKATHON_DEMO_SCENARIOS.slice(0, 4).map((scenario) => {
            const isSelected = activeScenario.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-slate-800/90 border-orange-500/50 shadow-xl shadow-orange-500/10'
                    : 'glass-panel border-white/5 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white uppercase">
                    {scenario.tag}
                  </span>
                  <span className="text-xs font-mono text-sky-400 font-semibold">
                    {scenario.language.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-heading">
                  {scenario.title}
                </h4>
                <div className="mt-2 p-2 rounded-lg bg-slate-950/70 text-xs font-mono text-orange-300/90 border border-white/5">
                  "{scenario.inputPrompt}"
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: live preview of AI Understanding & Structured Response */}
        <div className="lg:col-span-7 glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header: AI Understanding Panel */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/70 via-slate-900 to-slate-900 border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                    🧠 AI Real-Time Understanding
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {Math.round(analysis.confidence * 100)}% Confidence
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Language Detected</p>
                  <p className="font-bold text-white truncate">{analysis.language}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Identified Intent</p>
                  <p className="font-bold text-orange-300 truncate">{analysis.intent.split('(')[0]}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Assigned Domain</p>
                  <p className="font-bold text-sky-300 uppercase">{analysis.domain}</p>
                </div>
              </div>
            </div>

            {/* Structured Guidance Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                1. Citizen Guidance Summary
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed p-3.5 rounded-xl bg-slate-900/80 border border-white/5 font-telugu">
                {analysis.summary}
              </p>
            </div>

            {/* Required Documents Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                2. Key Documents Needed
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.requiredDocuments.slice(0, 4).map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="truncate">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Source Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200/90">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-snug">{analysis.disclaimer}</p>
            </div>
          </div>

          {/* Action button: launch full assistant with this prompt */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Ready to explore full workflow?
            </span>
            <button
              onClick={() => onStartFullChat(activeScenario.inputPrompt)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 transition-all hover:scale-105 ml-auto"
            >
              <span>Launch Full Workflow in Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
