import React, { useState, useEffect } from 'react';
import { StorageService, AppSettings } from '../../services/storage';
import { SupabaseService } from '../../services/supabaseClient';
import { useNotification } from '../../context/NotificationContext';
import { X, Key, Shield, Volume2, RotateCcw, Check, Sparkles, Database, Globe, RefreshCw, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsUpdated: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSettingsUpdated
}) => {
  const { showToast } = useNotification();
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Supabase State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseMsg, setSupabaseMsg] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const currentSettings = StorageService.getSettings();
      const config = SupabaseService.getConfig();
      const activeUrl = currentSettings.supabaseUrl || config.url || '';
      const activeKey = currentSettings.supabaseAnonKey || config.anonKey || '';

      setSettings({
        ...currentSettings,
        supabaseUrl: activeUrl,
        supabaseAnonKey: activeKey
      });
      setSupabaseUrl(activeUrl);
      setSupabaseAnonKey(activeKey);
      setSupabaseMsg(null);
      setIsSaved(false);
    }
  }, [isOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const cleanUrl = supabaseUrl.trim();
      const cleanKey = supabaseAnonKey.trim();

      const updatedSettings: AppSettings = {
        ...settings,
        supabaseUrl: cleanUrl,
        supabaseAnonKey: cleanKey
      };

      // 1. Persist settings in local storage
      StorageService.saveSettings(updatedSettings);

      // 2. Persist Supabase configuration
      if (cleanUrl || cleanKey) {
        SupabaseService.saveConfig(cleanUrl, cleanKey);
      }

      // 3. Notify parent component
      if (typeof onSettingsUpdated === 'function') {
        onSettingsUpdated();
      }

      // 4. Show visual confirmation
      setIsSaved(true);
      showToast('Settings Saved', 'System & AI settings updated successfully.', 'success');

      // 5. Close modal
      setTimeout(() => {
        onClose();
      }, 350);
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      showToast('Save Failed', err?.message || 'Could not save settings.', 'error');
    }
  };

  const handleTestSupabase = async () => {
    if (!supabaseUrl.trim() || !supabaseAnonKey.trim()) {
      showToast('Credentials Required', 'Please enter Supabase URL and Anon Key to test.', 'warning');
      return;
    }
    setIsTestingSupabase(true);
    setSupabaseMsg(null);
    try {
      const res = await SupabaseService.testConnection(supabaseUrl, supabaseAnonKey);
      setSupabaseMsg({ success: res.success, text: res.message });
      if (res.success) {
        showToast('Supabase Connected', res.message, 'success');
      } else {
        showToast('Connection Failed', res.message, 'error');
      }
    } catch (err: any) {
      setSupabaseMsg({ success: false, text: err?.message || 'Failed to connect.' });
      showToast('Connection Error', err?.message || 'Failed to connect.', 'error');
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleTestKey = async () => {
    if (!settings.geminiApiKey.trim()) {
      showToast('API Key Required', 'Please enter a Gemini API Key to test.', 'warning');
      return;
    }
    setIsTesting(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Hello, respond with {"status": "ok"}' }] }]
          })
        }
      );
      if (response.ok) {
        showToast('Gemini API Connected', 'Key verified successfully with Google Gemini 1.5 Flash!', 'success');
      } else {
        showToast('Connection Failed', `Gemini returned HTTP ${response.status}. Check key permissions.`, 'error');
      }
    } catch {
      showToast('Network Error', 'Unable to reach Gemini endpoint. Demo mode will continue.', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleResetData = () => {
    localStorage.clear();
    showToast('Reset Complete', 'Demo data and conversation history have been reset.', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="glass-panel w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl border border-white/10 shadow-2xl bg-[#0B0F19]/95 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">System & AI Settings</h3>
              <p className="text-xs text-slate-400">Configure AI engine, Demo Mode, and speech</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Demo Mode Toggle (Hackathon requirement) */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white">Demo Mode</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Recommended for Judges
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Guarantees instant, reliable responses for Telugu, Hindi, and English even with zero internet or API quotas.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input
                type="checkbox"
                checked={settings.demoMode}
                onChange={(e) => setSettings({ ...settings, demoMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Gemini API Key (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-sky-400" />
                Optional Gemini API Key
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Stored locally in browser only
              </span>
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={settings.geminiApiKey}
                onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                placeholder="AIzaSy... (Leave empty to use built-in offline engine)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 pr-24"
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="px-2 py-1 text-[11px] text-slate-400 hover:text-white rounded bg-slate-800 cursor-pointer"
                >
                  {showKey ? 'Hide' : 'Show'}
                </button>
                {settings.geminiApiKey && (
                  <button
                    type="button"
                    onClick={handleTestKey}
                    disabled={isTesting}
                    className="px-2 py-1 text-[11px] text-sky-400 hover:text-sky-300 rounded bg-sky-950/60 border border-sky-800 cursor-pointer disabled:opacity-50"
                  >
                    {isTesting ? 'Testing...' : 'Test'}
                  </button>
                )}
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              If provided, queries will leverage Google Gemini 1.5 Flash with fallback to the local engine.
            </p>
          </div>

          {/* Supabase Database Connection */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Supabase Database Backend
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                SupabaseService.isConfigured()
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {SupabaseService.isConfigured() ? '🟢 Connected' : '⚪ Local Fallback'}
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="Supabase URL (https://your-project.supabase.co)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <div className="relative">
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="Supabase Anon Key (eyJhbGciOi...)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 pr-20 font-mono"
                />
                <div className="absolute right-2 top-1.5 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleTestSupabase}
                    disabled={isTestingSupabase}
                    className="px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 rounded bg-emerald-950/60 border border-emerald-800 disabled:opacity-50 cursor-pointer"
                  >
                    {isTestingSupabase ? 'Testing...' : 'Test DB'}
                  </button>
                </div>
              </div>
            </div>

            {supabaseMsg && (
              <div className={`p-2 rounded-lg text-xs flex items-center gap-1.5 ${
                supabaseMsg.success ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
              }`}>
                {supabaseMsg.success ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                <span className="text-[11px]">{supabaseMsg.text}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Syncs citizen profiles, dialogue history, and crop health scans to your PostgreSQL cloud. See <code className="text-emerald-300">supabase_schema.sql</code>.
            </p>
          </div>

          {/* Speech and Sound Accessibility */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-medium text-slate-300">
                  Text-to-Speech Voice Readout
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoSpeak}
                  onChange={(e) => setSettings({ ...settings, autoSpeak: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-slate-900/60 shrink-0 rounded-b-2xl">
          <button
            type="button"
            onClick={handleResetData}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 px-3 py-2 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              id="save-settings-btn"
              onClick={handleSave}
              disabled={isSaved}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 rounded-lg shadow-lg shadow-orange-500/25 transition-all hover:scale-105 cursor-pointer disabled:opacity-90"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-pulse" />
                  <span className="text-emerald-100 font-semibold">Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
