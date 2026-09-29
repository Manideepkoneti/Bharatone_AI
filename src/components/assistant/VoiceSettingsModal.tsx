import React, { useState, useEffect } from 'react';
import { VoiceService, VoiceSettings } from '../../services/voiceService';
import { X, Volume2, Settings2, Sliders, Check } from 'lucide-react';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: VoiceSettings) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [settings, setSettings] = useState<VoiceSettings>(VoiceService.getSettings());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSettings(VoiceService.getSettings());
      setVoices(VoiceService.getVoices());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: keyof VoiceSettings, val: any) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    VoiceService.saveSettings(updated);
    onSave?.(updated);
  };

  const handleTestVoice = () => {
    VoiceService.speak("Namaste! This is BharatOne AI voice assistance.", 'en');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl glass-panel border border-white/20 bg-[#0B0F19]/95 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Voice Output Settings
              </h3>
              <p className="text-xs text-slate-400">
                Text-to-speech preferences & auto-play
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* 1. Voice Enabled */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-white/5">
            <div>
              <p className="text-sm font-semibold text-white">Voice Enabled</p>
              <p className="text-xs text-slate-400">Enable audio responses across BharatOne</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleChange('enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          {/* 2. Auto-Play Response */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-white/5">
            <div>
              <p className="text-sm font-semibold text-white">Auto-Play Response</p>
              <p className="text-xs text-slate-400">Automatically speak answers after voice input</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoPlayOnVoice}
                onChange={(e) => handleChange('autoPlayOnVoice', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
          </div>

          {/* 3. Speech Speed Slider */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Speech Speed:</span>
              <span className="font-mono text-orange-400 font-bold">{settings.rate}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={settings.rate}
              onChange={(e) => handleChange('rate', parseFloat(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.75x (Slower)</span>
              <span>1.0x (Normal)</span>
              <span>1.5x (Faster)</span>
            </div>
          </div>

          {/* 4. Preferred Voice Picker */}
          {voices.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Preferred Browser Voice (Optional)
              </label>
              <select
                value={settings.preferredVoiceURI}
                onChange={(e) => handleChange('preferredVoiceURI', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="">Auto-Detect (Matches Telugu / Hindi / English)</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleTestVoice}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Test Voice</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
