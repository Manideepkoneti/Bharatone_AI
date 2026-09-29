import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Language } from '../../types';
import { 
  Home, 
  Sparkles, 
  GraduationCap, 
  Sprout, 
  Building2, 
  Briefcase, 
  HeartPulse, 
  Coins, 
  History, 
  BarChart3, 
  User, 
  Settings, 
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { translations } from '../../data/translations';
import { BharatOneLogo } from './BharatOneLogo';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  selectedLang: Language;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  selectedLang,
  onOpenSettings
}) => {
  const { user, logout } = useAuth();
  const t = translations[selectedLang] || translations.en;

  const mainNavItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home, color: 'text-slate-300' },
    { id: 'assistant', label: t.aiAssistant, icon: Sparkles, color: 'text-sky-400', special: true },
    { id: 'education', label: t.education, icon: GraduationCap, color: 'text-cyan-400' },
    { id: 'agriculture', label: t.agriculture, icon: Sprout, color: 'text-emerald-400' },
    { id: 'services', label: t.publicServices, icon: Building2, color: 'text-orange-400' },
    { id: 'employment', label: t.employment, icon: Briefcase, color: 'text-indigo-400' },
    { id: 'healthcare', label: t.healthcare, icon: HeartPulse, color: 'text-rose-400' },
    { id: 'finance', label: t.finance, icon: Coins, color: 'text-amber-400' },
  ];

  const utilityNavItems = [
    { id: 'history', label: t.history, icon: History },
    { id: 'impact', label: t.impact, icon: BarChart3 },
    { id: 'profile', label: t.profile, icon: User },
    { id: 'admin', label: t.admin, icon: ShieldAlert },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] border-r border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl shrink-0 p-4 justify-between">
      <div className="space-y-6">
        {/* Core AI Assistant Highlight Card */}
        <div 
          onClick={() => onNavigate('assistant')}
          className="p-3 rounded-2xl bg-gradient-to-r from-sky-950/60 via-blue-900/40 to-slate-900 border border-sky-500/30 hover:border-sky-400/60 transition-all cursor-pointer shadow-lg shadow-sky-500/5 group"
        >
          <div className="flex items-center gap-2.5">
            <BharatOneLogo size="sm" className="group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-bold text-white tracking-wide">BharatOne Core</p>
              <p className="text-[11px] text-sky-300">Natural Multilingual AI</p>
            </div>
          </div>
        </div>

        {/* Primary Domains Navigation */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Citizen Domains
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/20 via-sky-500/10 to-transparent text-white border-l-4 border-orange-500 pl-2 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-400' : item.color}`} />
                <span className="truncate">{item.label}</span>
                {item.special && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 uppercase">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 mx-2" />

        {/* Utility & Analytics Navigation */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Analytics & System
          </p>
          {utilityNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
          >
            <Settings className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{t.settings}</span>
          </button>
        </div>
      </div>

      {/* User Section & Logout */}
      <div className="pt-4 border-t border-white/10">
        {user && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-sky-500 flex items-center justify-center font-bold text-xs text-white uppercase shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.location}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-medium tracking-wider">
            CODEFORGE 2026 PROTOTYPE
          </p>
        </div>
      </div>
    </aside>
  );
};
