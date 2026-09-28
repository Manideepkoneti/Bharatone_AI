import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#070A11] text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Slogan */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇮🇳</span>
            <span className="font-extrabold text-lg text-white font-heading tracking-tight">
              Bharat<span className="text-orange-500">One</span> <span className="text-sky-400">AI</span>
            </span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <p className="text-xs text-slate-400">
            One Assistant. Many Needs. • Understand. Guide. Connect.
          </p>
        </div>

        {/* Prototype attribution */}
        <div className="text-center md:text-right text-xs space-y-1">
          <p className="text-slate-300 font-medium">
            Built as an innovation prototype for <span className="text-orange-400 font-semibold">CodeForge 2026</span>.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-4 text-slate-500 text-[11px]">
            <span>© 2026 BharatOne AI</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
