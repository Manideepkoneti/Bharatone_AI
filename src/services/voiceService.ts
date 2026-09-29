export interface VoiceSettings {
  enabled: boolean;
  autoPlayOnVoice: boolean;
  rate: number;
  pitch: number;
  preferredVoiceURI: string;
}

const DEFAULT_SETTINGS: VoiceSettings = {
  enabled: true,
  autoPlayOnVoice: true,
  rate: 1.0,
  pitch: 1.0,
  preferredVoiceURI: ''
};

const STORAGE_KEY = 'bharatone_voice_settings';

export class VoiceService {
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static lastSpokenText: string = '';
  private static lastLangCode: string = 'en';
  private static cachedVoices: SpeechSynthesisVoice[] = [];
  private static activeCallbacks: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
    onPause?: () => void;
    onResume?: () => void;
  } = {};

  static init() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  static getSettings(): VoiceSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  }

  static saveSettings(settings: Partial<VoiceSettings>): VoiceSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  }

  static getVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    if (this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }
    return this.cachedVoices;
  }

  static findBestVoice(langCode: string): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    const settings = this.getSettings();
    if (settings.preferredVoiceURI) {
      const preferred = voices.find(v => v.voiceURI === settings.preferredVoiceURI);
      if (preferred) return preferred;
    }

    if (langCode === 'te') {
      // Search Telugu voices
      const teVoice = voices.find(v => 
        v.lang.toLowerCase().includes('te-in') || 
        v.lang.toLowerCase().includes('te_in') || 
        v.name.toLowerCase().includes('telugu')
      );
      if (teVoice) return teVoice;

      // Fallback: Indian English or Hindi voice
      const indVoice = voices.find(v => 
        v.lang.toLowerCase().includes('hi-in') || 
        v.lang.toLowerCase().includes('en-in') || 
        v.name.toLowerCase().includes('india')
      );
      if (indVoice) return indVoice;
    }

    if (langCode === 'hi') {
      // Search Hindi voices
      const hiVoice = voices.find(v => 
        v.lang.toLowerCase().includes('hi-in') || 
        v.lang.toLowerCase().includes('hi_in') || 
        v.name.toLowerCase().includes('hindi')
      );
      if (hiVoice) return hiVoice;

      // Fallback: Indian English voice
      const indVoice = voices.find(v => 
        v.lang.toLowerCase().includes('en-in') || 
        v.name.toLowerCase().includes('india')
      );
      if (indVoice) return indVoice;
    }

    // English or fallback
    const enIndVoice = voices.find(v => v.lang.toLowerCase().includes('en-in'));
    if (enIndVoice) return enIndVoice;

    const enVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    if (enVoice) return enVoice;

    return voices[0] || null;
  }

  static speak(
    text: string,
    langCode: string = 'en',
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
      onPause?: () => void;
      onResume?: () => void;
    }
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      callbacks?.onError?.();
      return;
    }

    const settings = this.getSettings();
    if (!settings.enabled) {
      callbacks?.onEnd?.();
      return;
    }

    // Cancel current speech
    this.stop();

    this.lastSpokenText = text;
    this.lastLangCode = langCode;
    this.activeCallbacks = callbacks || {};

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const voice = this.findBestVoice(langCode);
    if (voice) {
      utterance.voice = voice;
    }

    if (langCode === 'te') utterance.lang = 'te-IN';
    else if (langCode === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = settings.rate || 1.0;
    utterance.pitch = settings.pitch || 1.0;

    utterance.onstart = () => {
      this.activeCallbacks.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      this.activeCallbacks.onEnd?.();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      this.activeCallbacks.onError?.();
    };

    utterance.onpause = () => {
      this.activeCallbacks.onPause?.();
    };

    utterance.onresume = () => {
      this.activeCallbacks.onResume?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      this.activeCallbacks.onError?.();
    }
  }

  static pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      this.activeCallbacks.onPause?.();
    }
  }

  static resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      this.activeCallbacks.onResume?.();
    }
  }

  static stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.activeCallbacks.onEnd?.();
    }
  }

  static replay() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, this.lastLangCode, this.activeCallbacks);
    }
  }

  static isSpeaking(): boolean {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.speaking && !window.speechSynthesis.paused;
    }
    return false;
  }

  static isPaused(): boolean {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.paused;
    }
    return false;
  }
}

// Auto init voices on load
VoiceService.init();
