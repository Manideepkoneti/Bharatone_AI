import { DomainId, Language } from '../types';

export interface DemoScenario {
  id: string;
  title: string;
  tag: string;
  domain: DomainId;
  language: Language;
  inputPrompt: string;
  description: string;
  highlightWords: string[];
}

export const HACKATHON_DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'demo-1-education-telugu',
    title: 'DEMO 1 — Education Scholarship (తెలుగు)',
    tag: '🎓 Education Workflow',
    domain: 'education',
    language: 'te',
    inputPrompt: 'Nenu oka student ni. Naaku scholarship kavali.',
    description: 'Exact Hackathon Demo 1: Identifies Telugu language, Scholarship intent, Education domain, generates documents and next steps.',
    highlightWords: ['student', 'scholarship', 'kavali']
  },
  {
    id: 'demo-2-agriculture-telugu',
    title: 'DEMO 2 — Agriculture Crop Health (తెలుగు)',
    tag: '🌾 Agriculture Workflow',
    domain: 'agriculture',
    language: 'te',
    inputPrompt: 'Na panta lo aakulu yellow ga avutunnayi.',
    description: 'Exact Hackathon Demo 2: Identifies Telugu language, Crop issue intent, Agriculture domain, directs to image analysis & advisory.',
    highlightWords: ['panta', 'aakulu', 'yellow']
  },
  {
    id: 'demo-3-government-telugu',
    title: 'DEMO 3 — Public Service Navigator (తెలుగు)',
    tag: '🏛️ Government Services',
    domain: 'government',
    language: 'te',
    inputPrompt: 'Naaku government service gurinchi telusukovali.',
    description: 'Exact Hackathon Demo 3: Identifies Telugu language, Public Service intent, Government domain, opens service navigator.',
    highlightWords: ['government', 'service', 'telusukovali']
  },
  {
    id: 'demo-4-education-english',
    title: 'Education Scholarship (English)',
    tag: '🎓 Education',
    domain: 'education',
    language: 'en',
    inputPrompt: 'I am an undergraduate student looking for scholarship schemes and fee support.',
    description: 'Comprehensive college and university fee scholarship navigation with required documents.',
    highlightWords: ['undergraduate', 'scholarship', 'support']
  },
  {
    id: 'demo-5-agriculture-english',
    title: 'Crop Leaves Yellowing & Pest Issue (English)',
    tag: '🌾 Agriculture',
    domain: 'agriculture',
    language: 'en',
    inputPrompt: 'My crop leaves are turning yellow and show dark spots. What should I do?',
    description: 'Plant pathology advisory with organic and water management steps.',
    highlightWords: ['crop', 'yellow', 'spots']
  },
  {
    id: 'demo-6-government-english',
    title: 'Public Services & Income Certificate (English)',
    tag: '🏛️ Public Services',
    domain: 'government',
    language: 'en',
    inputPrompt: 'How can I apply for an integrated Income and Caste certificate through MeeSeva?',
    description: 'End-to-end guidance for tahsildar income certification.',
    highlightWords: ['income', 'caste', 'meeseva']
  },
  {
    id: 'demo-7-employment-english',
    title: 'Career & Skill Roadmap (English)',
    tag: '💼 Employment',
    domain: 'employment',
    language: 'en',
    inputPrompt: 'I want help planning my career in technology and artificial intelligence.',
    description: 'Skill gap identification, free government SWAYAM portal links, and learning roadmaps.',
    highlightWords: ['career', 'technology', 'artificial intelligence']
  },
  {
    id: 'demo-8-finance-hindi',
    title: 'Digital Payment Safety & UPI Fraud (हिन्दी)',
    tag: '💰 Finance',
    domain: 'finance',
    language: 'hi',
    inputPrompt: 'ऑनलाइन यूपीआई फ्रॉड और लॉटरी कॉल से अपने परिवार को कैसे सुरक्षित रखें?',
    description: 'Digital payment safety guidelines and Cyber Crime 1930 reporting steps.',
    highlightWords: ['यूपीआई', 'सुरक्षित', 'फ्रॉड']
  }
];

export const QUICK_PROMPTS = [
  {
    label: "🎓 I need scholarship guidance",
    labelTelugu: "🎓 నాకు స్కాలర్‌షిప్ గైడెన్స్ కావాలి",
    labelHindi: "🎓 मुझे छात्रवृत्ति मार्गदर्शन चाहिए",
    prompt: "I need scholarship guidance for my college education.",
    domain: "education"
  },
  {
    label: "🌾 My crop leaves are turning yellow",
    labelTelugu: "🌾 నా పంటలో ఆకులు పసుపుగా మారుతున్నాయి",
    labelHindi: "🌾 मेरी फसल की पत्तियां पीली पड़ रही हैं",
    prompt: "My crop leaves are turning yellow. What could be the issue?",
    domain: "agriculture"
  },
  {
    label: "🏛️ How can I find a government service?",
    labelTelugu: "🏛️ ప్రభుత్వ సేవలను ఎలా పొందాలి?",
    labelHindi: "🏛️ सरकारी सेवा कैसे ढूंढें?",
    prompt: "How can I find and apply for citizen government services?",
    domain: "government"
  },
  {
    label: "💼 I want help planning my career",
    labelTelugu: "💼 నా కెరీర్ ప్లానింగ్ కోసం సహాయం కావాలి",
    labelHindi: "💼 मुझे करियर योजना में मदद चाहिए",
    prompt: "I want help planning my career and learning new skills.",
    domain: "employment"
  },
  {
    label: "💰 How can I improve my financial awareness?",
    labelTelugu: "💰 డిజిటల్ పేమెంట్ భద్రత ఎలా మెరుగుపరచుకోవాలి?",
    labelHindi: "💰 डिजिटल सुरक्षा और वित्तीय जागरूकता कैसे बढ़ाएं?",
    prompt: "How can I improve my financial awareness and avoid online scams?",
    domain: "finance"
  }
];
