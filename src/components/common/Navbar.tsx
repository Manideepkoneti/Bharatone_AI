import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Language } from '../../types';
import { Globe, Sparkles, User, Settings, Menu, X, ShieldCheck } from 'lucide-react';
import { translations } from '../../data/translations';
import { BharatOneLogo } from './BharatOneLogo';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  selectedLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSettings: () => void;
  demoMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  selectedLang,
  onLanguageChange,
  onOpenSettings,
  demoMode
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[selectedLang] || translations.en;

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl">
      {/* Top micro-tricolor bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white/80 to-emerald-500 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <BharatOneLogo size="md" className="group-hover:scale-105 transition-transform duration-300" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                Bharat<span className="text-orange-500">One</span> <span className="text-sky-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Proto
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.dashboard}
              </button>
              <button
                onClick={() => onNavigate('assistant')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentTab === 'assistant'
                    ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                {t.aiAssistant}
              </button>
              <button
                onClick={() => onNavigate('education')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'education'
                    ? 'bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.education}
              </button>
              <button
                onClick={() => onNavigate('agriculture')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'agriculture'
                    ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.agriculture}
              </button>
              <button
                onClick={() => onNavigate('services')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'services'
                    ? 'bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.publicServices}
              </button>
              <button
                onClick={() => onNavigate('impact')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'impact'
                    ? 'bg-purple-500/15 text-purple-400 font-semibold border border-purple-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.impact}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('landing')}
                className="px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('landing')}
                className="px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => onNavigate('impact')}
                className="px-3 py-1.5 text-slate-300 hover:text-white transition-colors"
              >
                Impact
              </button>
            </>
          )}
        </nav>

        {/* Right Actions: Language Selector, Demo Badge, Settings, Auth Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-900/90 border border-slate-700/60 rounded-lg p-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 shrink-0" />
            <select
              value={selectedLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs text-slate-200 font-medium py-1 pr-2 focus:outline-none cursor-pointer"
              aria-label="Select Language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.native} ({l.code.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Demo Mode Badge */}
          {demoMode && (
            <button
              onClick={onOpenSettings}
              title="Demo Mode is Active. Fast offline AI reasoning enabled."
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Demo Mode</span>
            </button>
          )}

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="Settings & Gemini API"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile / Auth Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-white/10 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-sky-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-200 hidden md:inline truncate max-w-[100px]">
                  {user.name}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20 transition-all hover:scale-105"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-5 space-y-2">
          {isAuthenticated ? (
            <>
              <div className="p-3 mb-2 rounded-lg bg-slate-800/50 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {user?.location}
                </span>
              </div>
              <button
                onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5 flex items-center justify-between"
              >
                <span>{t.dashboard}</span>
              </button>
              <button
                onClick={() => { onNavigate('assistant'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-sky-400 hover:bg-white/5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.aiAssistant}</span>
              </button>
              <button
                onClick={() => { onNavigate('education'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
              >
                {t.education}
              </button>
              <button
                onClick={() => { onNavigate('agriculture'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
              >
                {t.agriculture}
              </button>
              <button
                onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
              >
                {t.publicServices}
              </button>
              <button
                onClick={() => { onNavigate('impact'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
              >
                {t.impact}
              </button>
              <button
                onClick={() => { onNavigate('history'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5"
              >
                {t.history}
              </button>
              <button
                onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/5 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.admin}</span>
              </button>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-400 hover:bg-rose-500/10 mt-2"
              >
                {t.logout}
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                className="w-full py-2 text-center rounded-lg bg-slate-800 text-white font-medium text-sm"
              >
                Login
              </button>
              <button
                onClick={() => { onNavigate('register'); setMobileMenuOpen(false); }}
                className="w-full py-2 text-center rounded-lg bg-orange-600 text-white font-medium text-sm"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
