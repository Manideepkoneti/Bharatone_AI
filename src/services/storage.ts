import { Conversation, UserProfile } from '../types';

const USER_KEY = 'bharatone_user';
const CONVERSATIONS_KEY = 'bharatone_conversations';
const SETTINGS_KEY = 'bharatone_settings';
const STATS_KEY = 'bharatone_stats';

export interface AppSettings {
  demoMode: boolean;
  geminiApiKey: string;
  autoSpeak: boolean;
  soundEffects: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export interface AppStats {
  usersAssisted: number;
  aiInteractions: number;
  languagesCount: number;
  domainsCount: number;
}

// Default initial demo conversations
const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-demo-1',
    title: 'Scholarship Guidance (Jagananna Vidya Deevena)',
    domain: 'education',
    language: 'te',
    timestamp: 'Today, 10:42 AM',
    summary: 'Undergraduate student scholarship eligibility check & document requirements.',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        content: 'Nenu oka student ni. Naaku scholarship kavali.',
        timestamp: '10:42 AM'
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        content: 'మీరు విద్యార్థి అని మరియు కళాశాల స్కాలర్‌షిప్ లేదా ఫీజు సహాయం కావాలని అర్థమైంది. ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రభుత్వాలు అలాగే కేంద్ర ప్రభుత్వం అందిస్తున్న వివిధ విద్యా పథకాల వివరాలు కింద ఇవ్వబడ్డాయి.',
        timestamp: '10:42 AM',
        analysis: {
          language: 'Telugu (తెలుగు)',
          languageCode: 'te',
          intent: 'Scholarship Guidance (స్కాలర్‌షిప్ మార్గదర్శకత్వం)',
          domain: 'education',
          confidence: 0.98,
          summary: 'మీరు విద్యార్థి అని మరియు కళాశాల స్కాలర్‌షిప్ కావాలని అర్థమైంది.',
          requiredInformation: ['కోర్సు & కళాశాల వివరాలు', 'కుటుంబ వార్షిక ఆదాయం (₹2.5L లోపు)', 'గ్రామ/వార్డు సచివాలయం'],
          requiredDocuments: ['విద్యార్థి & తల్లి ఆధార్ కార్డులు', 'ఆదాయ మరియు కుల ధృవీకరణ పత్రాలు', 'కళాశాల అలాట్‌మెంట్ ఆర్డర్', 'తల్లి బ్యాంక్ పాస్‌బుక్'],
          recommendedSteps: ['జ్ఞానభూమి పోర్టల్‌లో రిజిస్టర్ చేయండి', 'సచివాలయంలో e-KYC పూర్తి చేయండి', 'NSP పోర్టల్ చెక్ చేయండి'],
          disclaimer: 'దయచేసి తాజా అర్హతలను జ్ఞానభూమి పోర్టల్ ద్వారా సరిచూసుకోండి.',
          deepLink: 'education'
        }
      }
    ]
  },
  {
    id: 'conv-demo-2',
    title: 'Crop Leaves Yellowing & Fertilizer Advisory',
    domain: 'agriculture',
    language: 'te',
    timestamp: 'Today, 10:28 AM',
    summary: 'Tomato & Paddy leaf chlorosis diagnostic and 19:19:19 spray recommendation.',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        content: 'Na panta lo aakulu yellow ga avutunnayi.',
        timestamp: '10:28 AM'
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        content: 'మీ పంటలో ఆకులు పసుపు రంగులోకి మారుతున్నాయని గుర్తించాం. ఇది సాధారణంగా పోషకాల లోపం (నత్రజని/జింక్ లోపం) లేదా క్లోరోసిస్ (Chlorosis) కావచ్చు.',
        timestamp: '10:28 AM',
        analysis: {
          language: 'Telugu (తెలుగు)',
          languageCode: 'te',
          intent: 'Crop Health Advisory (పంట వ్యాధుల గుర్తింపు)',
          domain: 'agriculture',
          confidence: 0.98,
          summary: 'పంట ఆకుల పసుపు రంగు గుర్తింపు మరియు నత్రజని లోపం నివారణ సలహా.',
          requiredInformation: ['పంట రకం (వరి, పత్తి, టమోటా)', 'నీటి నిల్వ పరిస్థితి', 'పాత లేదా కొత్త ఆకులా?'],
          requiredDocuments: ['ఆకుల స్పష్టమైన ఫోటో', 'పట్టాదారు పాస్‌బుక్'],
          recommendedSteps: ['ఫోటో అప్‌లోడ్ చేసి AI విశ్లేషణ పొందండి', 'నీటి నిల్వను తొలగించండి', '19:19:19 స్ప్రే చేయండి', 'కిసాన్ కాల్ సెంటర్ 1800-180-1551 సంప్రదించండి'],
          disclaimer: 'ఇవి ప్రాథమిక పరిశీలన సూచికలు మాత్రమే. వ్యవసాయ అధికారిని సంప్రదించండి.',
          deepLink: 'agriculture'
        }
      }
    ]
  },
  {
    id: 'conv-demo-3',
    title: 'Integrated Income & Caste Certificate',
    domain: 'government',
    language: 'en',
    timestamp: 'Yesterday, 4:15 PM',
    summary: 'MeeSeva Tahsildar income certification procedure & checklist.',
    messages: [
      {
        id: 'msg-5',
        sender: 'user',
        content: 'How can I apply for an integrated Income and Caste certificate through MeeSeva?',
        timestamp: '4:15 PM'
      },
      {
        id: 'msg-6',
        sender: 'assistant',
        content: 'I understand you need assistance obtaining an integrated Income and Caste Certificate for education or welfare schemes. Here are the required documents and MeeSeva portal workflow.',
        timestamp: '4:15 PM',
        analysis: {
          language: 'English',
          languageCode: 'en',
          intent: 'Public Service & Certificate Guidance',
          domain: 'government',
          confidence: 0.97,
          summary: 'End-to-end guidance for revenue income certification through MeeSeva.',
          requiredInformation: ['Permanent address', 'Annual family income proof', 'Caste category'],
          requiredDocuments: ['Aadhaar Cards of applicant & parents', 'Ration Card / Rice Card', 'Salary Slip / Income Affidavit', 'School Study Certificate'],
          recommendedSteps: ['Visit nearest MeeSeva or Village Secretariat', 'Submit biometric e-KYC', 'Field verification by VRO/RI', 'Download signed certificate'],
          disclaimer: 'BharatOne is an informational navigation layer and does not submit applications directly.',
          deepLink: 'services'
        }
      }
    ]
  }
];

export const StorageService = {
  // User Profile
  getUser(): UserProfile | null {
    const data = localStorage.getItem(USER_KEY);
    if (!data) {
      // Default demo citizen profile
      const defaultUser: UserProfile = {
        id: 'user-ravi-kumar',
        name: 'Ravi Kumar',
        email: 'ravi.kumar@bharatone.ai',
        preferredLanguage: 'te',
        location: 'Andhra Pradesh',
        district: 'Guntur',
        education: 'Undergraduate (B.Tech)',
        interests: ['Education Scholarships', 'Public Services', 'Agriculture'],
        createdAt: '2026-01-15'
      };
      this.setUser(defaultUser);
      return defaultUser;
    }
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  setUser(user: UserProfile | null) {
    if (!user) {
      localStorage.removeItem(USER_KEY);
    } else {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Conversations
  getConversations(): Conversation[] {
    const data = localStorage.getItem(CONVERSATIONS_KEY);
    if (!data) {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
      return INITIAL_CONVERSATIONS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  },

  saveConversation(conversation: Conversation) {
    const list = this.getConversations();
    const existingIndex = list.findIndex(c => c.id === conversation.id);
    if (existingIndex >= 0) {
      list[existingIndex] = conversation;
    } else {
      list.unshift(conversation);
    }
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(list));
    this.incrementInteractions();
  },

  // Settings
  getSettings(): AppSettings {
    const data = localStorage.getItem(SETTINGS_KEY);
    let supabaseConfig = { url: '', anonKey: '' };
    try {
      const storedSup = localStorage.getItem('bharatone_supabase_config');
      if (storedSup) {
        supabaseConfig = JSON.parse(storedSup);
      }
    } catch {
      // ignore
    }

    const defaultUrl = supabaseConfig.url || import.meta.env.VITE_SUPABASE_URL || 'https://htzyquzyglqzcuqjlakk.supabase.co';
    const defaultKey = supabaseConfig.anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_f1_vnsmsqB42Zib0wwzaLw_UjsGwUhr';

    if (!data) {
      const defaultSettings: AppSettings = {
        demoMode: true,
        geminiApiKey: '',
        autoSpeak: false,
        soundEffects: true,
        supabaseUrl: defaultUrl,
        supabaseAnonKey: defaultKey
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    try {
      const parsed = JSON.parse(data);
      return {
        demoMode: parsed.demoMode ?? true,
        geminiApiKey: parsed.geminiApiKey || '',
        autoSpeak: parsed.autoSpeak ?? false,
        soundEffects: parsed.soundEffects ?? true,
        supabaseUrl: parsed.supabaseUrl || defaultUrl,
        supabaseAnonKey: parsed.supabaseAnonKey || defaultKey
      };
    } catch {
      return { 
        demoMode: true, 
        geminiApiKey: '', 
        autoSpeak: false, 
        soundEffects: true,
        supabaseUrl: defaultUrl,
        supabaseAnonKey: defaultKey
      };
    }
  },

  saveSettings(settings: AppSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    if (settings.supabaseUrl !== undefined || settings.supabaseAnonKey !== undefined) {
      try {
        const storedSup = localStorage.getItem('bharatone_supabase_config');
        const curr = storedSup ? JSON.parse(storedSup) : {};
        curr.url = settings.supabaseUrl !== undefined ? settings.supabaseUrl : (curr.url || '');
        curr.anonKey = settings.supabaseAnonKey !== undefined ? settings.supabaseAnonKey : (curr.anonKey || '');
        localStorage.setItem('bharatone_supabase_config', JSON.stringify(curr));
      } catch {
        // ignore
      }
    }
  },

  // Stats
  getStats(): AppStats {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) {
      const initialStats: AppStats = {
        usersAssisted: 426,
        aiInteractions: 1248,
        languagesCount: 3,
        domainsCount: 6
      };
      localStorage.setItem(STATS_KEY, JSON.stringify(initialStats));
      return initialStats;
    }
    try {
      return JSON.parse(data);
    } catch {
      return { usersAssisted: 426, aiInteractions: 1248, languagesCount: 3, domainsCount: 6 };
    }
  },

  incrementInteractions() {
    const stats = this.getStats();
    stats.aiInteractions += 1;
    stats.usersAssisted += 1;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }
};
