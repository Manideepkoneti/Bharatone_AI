import React from 'react';
import { ArrowRight, Sparkles, Shield, Globe2, CheckCircle2 } from 'lucide-react';
import { AIOrb } from '../common/AIOrb';

interface LandingHeroProps {
  onStart: () => void;
  onExplore: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart, onExplore }) => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-600/10 via-orange-500/10 to-emerald-500/5 filter blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
        {/* Subtle Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/10 shadow-lg backdrop-blur-md">
          <span className="text-sm">🇮🇳</span>
          <span className="text-xs font-semibold text-slate-300">
            Civic AI Companion for 1.4 Billion Citizens
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Hero Headings */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-heading tracking-tight leading-[1.1]">
            One Assistant.{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Many Needs.
            </span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Your multilingual AI companion for essential citizen services, scholarship guidance, crop health, and public certificates.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-400">
            <span className="text-sky-400">Understand.</span>
            <span>•</span>
            <span className="text-orange-400">Guide.</span>
            <span>•</span>
            <span className="text-emerald-400">Connect.</span>
          </div>
        </div>

        {/* Central Animated AI Orb */}
        <div className="py-2">
          <AIOrb size="lg" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-xl shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>Start with BharatOne</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onExplore}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 shadow-lg backdrop-blur-md transition-all hover:scale-105"
          >
            <span>Explore Services</span>
          </button>
        </div>

        {/* Multilingual Support Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
            Speaks Your Language:
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-slate-200 font-medium">
            తెలుగు (Telugu)
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-slate-200 font-medium">
            English
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-slate-200 font-medium">
            हिन्दी (Hindi)
          </span>
        </div>
      </div>
    </section>
  );
};
