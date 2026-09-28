import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Language, DomainId } from '../../types';
import { StatCards } from './StatCards';
import { WeatherWidget } from './WeatherWidget';
import { QuickPrompts } from './QuickPrompts';
import { AIOrb } from '../common/AIOrb';
import { DOMAINS } from '../../data/domains';
import { 
  Mic, 
  MicOff, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Sprout, 
  Building2, 
  Briefcase, 
  HeartPulse, 
  Coins,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { HACKATHON_DEMO_SCENARIOS } from '../../data/scenarios';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  onAskAI: (query: string) => void;
  selectedLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onAskAI,
  selectedLang,
  onLanguageChange
}) => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const [queryInput, setQueryInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Web Speech API Voice Recognition
  const handleToggleVoice = () => {
    // Check browser support
    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition || 
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Voice Not Supported', 'Your browser does not support Web Speech Recognition. Type your query.', 'warning');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Set language for speech recognition
      if (selectedLang === 'te') recognition.lang = 'te-IN';
      else if (selectedLang === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening...', `Speak now in ${selectedLang === 'te' ? 'Telugu' : selectedLang === 'hi' ? 'Hindi' : 'English'}.`, 'info');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQueryInput(transcript);
        setIsListening(false);
        showToast('Voice Recognized', `"${transcript}"`, 'success');
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast('Voice Error', 'Could not detect audio clearly. Please try typing.', 'error');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      showToast('Mic Unavailable', 'Please allow microphone access or enter text.', 'error');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) {
      showToast('Empty Question', 'Please type a question or select a demo prompt.', 'warning');
      return;
    }
    onAskAI(queryInput.trim());
  };

  const domainIcons: Record<string, React.ElementType> = {
    GraduationCap,
    Sprout,
    Building2,
    Briefcase,
    HeartPulse,
    Coins
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Good Morning, <span className="text-orange-400">{user?.name || 'Citizen'}</span> 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            How can <span className="text-sky-400 font-semibold">BharatOne</span> help you today?
          </p>
        </div>

        {/* Quick Language Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 shrink-0">
          <button
            onClick={() => onLanguageChange('te')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLang === 'te'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            తెలుగు
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLang === 'en'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLang === 'hi'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Main AI Assistant Card (Section 9 & Section 31) */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-white/15 bg-gradient-to-r from-[#0C1527] via-[#0A1120] to-[#0D182E] p-6 sm:p-10 shadow-2xl">
        {/* Subtle background ambient lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, description, and AI Orb visual */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="flex items-center gap-4">
              <AIOrb size="md" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Multilingual Engine</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
                  Ask BharatOne AI
                </h2>
                <p className="text-xs text-slate-400">
                  Type your question or speak naturally.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Natural Language Input form */}
          <div className="lg:col-span-8 space-y-4">
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder={
                    selectedLang === 'te'
                      ? 'మీ ప్రశ్నను తెలుగులో అడగండి (ఉదా: నాకు స్కాలర్‌షిప్ కావాలి)...'
                      : selectedLang === 'hi'
                      ? 'अपना प्रश्न यहां पूछें (जैसे: छात्रवृत्ति या फसल की समस्या)...'
                      : 'Ask anything (e.g., I need scholarship guidance for college)...'
                  }
                  className="w-full bg-slate-900/95 border-2 border-slate-700/80 focus:border-orange-500 rounded-2xl py-4 pl-5 pr-28 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none shadow-inner transition-all font-telugu"
                />

                {/* Inside Input Action Buttons: Mic and Submit */}
                <div className="absolute right-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    title="Voice input"
                    className={`p-2.5 rounded-xl transition-all ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 group"
                  >
                    <span className="hidden sm:inline">Ask BharatOne</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Prompts Pills */}
            <QuickPrompts 
              selectedLang={selectedLang}
              onSelectPrompt={(text) => {
                setQueryInput(text);
                onAskAI(text);
              }}
            />
          </div>
        </div>
      </div>

      {/* 3 Hackathon Golden Scenarios Quick Launcher Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-emerald-950/60 border border-sky-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🏆</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              CodeForge 2026 Evaluation Scenarios
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any scenario to execute live intent & language detection:
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {HACKATHON_DEMO_SCENARIOS.slice(0, 3).map((demo) => (
            <button
              key={demo.id}
              onClick={() => onAskAI(demo.inputPrompt)}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-orange-500/40 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span className="text-sky-400">{demo.tag}</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">తెలుగు</span>
              </div>
              <p className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors font-mono">
                "{demo.inputPrompt}"
              </p>
              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {demo.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Live Animated Statistics Cards */}
      <StatCards />

      {/* Weather & Domains Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weather Widget */}
        <div className="lg:col-span-5">
          <WeatherWidget />
        </div>

        {/* Domain Shortcuts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-heading">
              Service Modules
            </h3>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>View All Portals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DOMAINS.map((domain) => {
              const Icon = domainIcons[domain.icon] || Building2;
              return (
                <div
                  key={domain.id}
                  onClick={() => onNavigate(domain.id)}
                  className="p-3.5 rounded-2xl glass-panel border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="p-2 rounded-xl"
                      style={{ backgroundColor: domain.bgLight, color: domain.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {domain.isPrimary && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                      {domain.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5 font-telugu">
                      {domain.nameTelugu}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
