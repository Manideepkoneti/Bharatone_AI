import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Message, Conversation, Language } from '../../types';
import { BharatOneAIEngine } from '../../services/aiEngine';
import { StorageService } from '../../services/storage';
import { StructuredResponse } from './StructuredResponse';
import { AIOrb } from '../common/AIOrb';
import { HACKATHON_DEMO_SCENARIOS } from '../../data/scenarios';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User as UserIcon, 
  Share2,
  Trash2,
  Cpu
} from 'lucide-react';

interface AssistantViewProps {
  initialQuery?: string;
  selectedLang: Language;
  onNavigateToModule: (domain: string) => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  initialQuery,
  selectedLang,
  onNavigateToModule
}) => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: selectedLang === 'te'
        ? 'నమస్కారం! నేను భారత్ వన్ AI. విద్యార్థి స్కాలర్‌షిప్‌లు, పంట వ్యాధుల గుర్తింపు, లేదా ప్రభుత్వ సేవల గురించి ఏదైనా అడగండి.'
        : selectedLang === 'hi'
        ? 'नमस्ते! मैं भारतवन AI हूँ। छात्रवृत्ति, कृषि फसल समस्या, या सरकारी नागरिक सेवाओं के बारे में पूछें।'
        : 'Namaste! I am BharatOne AI. Ask any question in Telugu, Hindi, or English regarding scholarships, crop health, or public services.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Handle incoming initialQuery from Dashboard or Landing
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery.trim());
    }
  }, [initialQuery]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMessageId = 'user-' + Date.now();
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const settings = StorageService.getSettings();
      let analysisResult = null;

      // If user configured a Gemini key and demoMode is off or key is active
      if (settings.geminiApiKey) {
        analysisResult = await BharatOneAIEngine.queryGeminiIfConfigured(
          textToSend,
          settings.geminiApiKey,
          selectedLang
        );
      }

      // Fallback to high-precision built-in AI Engine
      if (!analysisResult) {
        // Artificial micro-delay for realistic AI thinking animation (600ms)
        await new Promise((res) => setTimeout(res, 600));
        analysisResult = BharatOneAIEngine.analyzeQuery({
          query: textToSend,
          preferredLanguage: selectedLang,
          userContext: {
            location: user?.location,
            education: user?.education
          }
        });
      }

      const assistantMsg: Message = {
        id: 'assistant-' + Date.now(),
        sender: 'assistant',
        content: analysisResult.summary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: analysisResult
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Save to Conversation History
      const conversation: Conversation = {
        id: 'conv-' + Date.now(),
        title: analysisResult.intent.slice(0, 40),
        domain: analysisResult.domain,
        language: analysisResult.languageCode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: [userMsg, assistantMsg],
        summary: analysisResult.summary.slice(0, 100) + '...'
      };
      StorageService.saveConversation(conversation);

      showToast('AI Analysis Complete', `Identified domain: ${analysisResult.domain.toUpperCase()}`, 'success');
    } catch {
      showToast('AI Engine Error', 'Something went wrong processing your request. Please try again.', 'error');
    } finally {
      setIsThinking(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = 
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition || 
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showToast('Voice Not Supported', 'Web Speech API is not supported in this browser.', 'warning');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      if (selectedLang === 'te') recognition.lang = 'te-IN';
      else if (selectedLang === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening...', 'Speak now in Telugu, Hindi, or English.', 'info');
      };

      recognition.onresult = (e: any) => {
        const spoken = e.results[0][0].transcript;
        setInput(spoken);
        setIsListening(false);
        handleSend(spoken);
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast('Voice Error', 'Could not detect clear speech.', 'error');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        content: 'Conversation cleared. What would you like assistance with?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast('Chat Reset', 'Started a fresh session.', 'info');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Banner with Scenario Shortcuts for Hackathon Presentation */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">🇮🇳</span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              One-Click Evaluation Scenarios
            </span>
          </div>
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Chat</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {HACKATHON_DEMO_SCENARIOS.slice(0, 3).map((demo) => (
            <button
              key={demo.id}
              onClick={() => handleSend(demo.inputPrompt)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-orange-500/40 text-xs text-slate-200 transition-all hover:scale-105 flex items-center gap-1.5 font-mono"
            >
              <span className="text-orange-400">{demo.tag.split(' ')[0]}</span>
              <span className="truncate max-w-[200px]">"{demo.inputPrompt}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="space-y-6 min-h-[450px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 sm:gap-4 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-orange-500 to-amber-600 text-white'
                  : 'bg-gradient-to-tr from-sky-500 to-blue-700 text-white'
              }`}
            >
              {msg.sender === 'user' ? (
                <UserIcon className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>

            {/* Bubble Content */}
            <div
              className={`max-w-2xl sm:max-w-3xl space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl rounded-tr-none p-4 shadow-lg shadow-orange-500/10'
                  : 'w-full'
              }`}
            >
              {/* User Plain Message */}
              {msg.sender === 'user' && (
                <div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed font-telugu">
                    {msg.content}
                  </p>
                  <span className="text-[10px] text-orange-200/80 mt-1 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              )}

              {/* Assistant Message with Full Structured Analysis */}
              {msg.sender === 'assistant' && (
                <div className="space-y-4">
                  {msg.analysis ? (
                    <StructuredResponse
                      analysis={msg.analysis}
                      onNavigateToModule={onNavigateToModule}
                    />
                  ) : (
                    <div className="glass-panel p-4 rounded-2xl border border-white/10">
                      <p className="text-sm text-slate-200 leading-relaxed font-telugu">
                        {msg.content}
                      </p>
                      <span className="text-[10px] text-slate-500 mt-2 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* AI Thinking Animation (Section 4) */}
        {isThinking && (
          <div className="flex items-center gap-4 animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div className="glass-panel px-5 py-3 rounded-2xl border border-sky-500/30 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
              </div>
              <span className="text-xs font-semibold text-sky-300 tracking-wide font-mono">
                BharatOne is understanding & structuring guidance...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-4 z-20 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="glass-panel p-2 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2 bg-[#0B0F19]/95 backdrop-blur-2xl"
        >
          {/* Mic Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            title="Speech input"
            className={`p-3 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              selectedLang === 'te'
                ? 'మీ ప్రశ్నను టైప్ చేయండి లేదా మాట్లాడండి...'
                : selectedLang === 'hi'
                ? 'अपना प्रश्न यहां टाइप करें या बोलें...'
                : 'Type your citizen question or speak naturally...'
            }
            className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-telugu"
          />

          {/* Send Button with micro-interaction */}
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 group"
          >
            <span className="hidden sm:inline">Ask AI</span>
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};
