import { DomainId } from '../types';

export interface DomainMeta {
  id: DomainId;
  name: string;
  nameTelugu: string;
  nameHindi: string;
  tagline: string;
  taglineTelugu: string;
  taglineHindi: string;
  icon: string;
  color: string;
  bgLight: string;
  borderColor: string;
  isPrimary: boolean;
  features: string[];
}

export const DOMAINS: DomainMeta[] = [
  {
    id: 'education',
    name: 'Education',
    nameTelugu: 'విద్య & స్కాలర్‌షిప్‌లు',
    nameHindi: 'शिक्षा और छात्रवृत्ति',
    tagline: 'Scholarship guidance, student support & academic schemes',
    taglineTelugu: 'స్కాలర్‌షిప్ గైడెన్స్, విద్యార్థి మద్దతు మరియు పథకాలు',
    taglineHindi: 'छात्रवृत्ति मार्गदर्शन, छात्र सहायता और योजनाएं',
    icon: 'GraduationCap',
    color: '#38BDF8', // Cyan / Sky
    bgLight: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    isPrimary: true,
    features: [
      'Scholarship Eligibility Matching',
      'Document Checklist Generator',
      'State & Central Scheme Tracking',
      'Direct Portal Redirection'
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    nameTelugu: 'వ్యవసాయం & పంట సంరక్షణ',
    nameHindi: 'कृषि एवं फसल परामर्श',
    tagline: 'Crop diagnosis, disease indicator analysis & weather advisory',
    taglineTelugu: 'పంట వ్యాధుల గుర్తింపు, సలహాలు మరియు వాతావరణం',
    taglineHindi: 'फसल रोग पहचान, कृषि परामर्श और मौसम पूर्वानुमान',
    icon: 'Sprout',
    color: '#10B981', // Emerald / Green
    bgLight: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    isPrimary: true,
    features: [
      'AI Crop Image Disease Indicator',
      'Organic & Scientific Remedies',
      'Regional Weather Forecasting',
      'Kisan Call Center Direct Access'
    ]
  },
  {
    id: 'government',
    name: 'Public Services',
    nameTelugu: 'ప్రజా & పౌర సేవలు',
    nameHindi: 'सार्वजनिक व नागरिक सेवाएं',
    tagline: 'Official citizen certificates, government schemes & MeeSeva navigator',
    taglineTelugu: 'అధికారిక పౌర పత్రాలు, ప్రభుత్వ పథకాలు మరియు మీసేవ నావిగేటర్',
    taglineHindi: 'प्रमाणपत्र, सरकारी योजनाएं और नागरिक सेवा मार्गदर्शिका',
    icon: 'Building2',
    color: '#F97316', // Saffron / Orange
    bgLight: 'rgba(249, 115, 22, 0.1)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    isPrimary: true,
    features: [
      'Aadhaar, Ration & Caste Docs',
      'MeeSeva & DigiLocker Guidance',
      'Scheme Eligibility Evaluator',
      'Application Step-by-Step Flow'
    ]
  },
  {
    id: 'employment',
    name: 'Employment',
    nameTelugu: 'ఉపాధి & ఉద్యోగ సలహాలు',
    nameHindi: 'रोजगार व करियर',
    tagline: 'Career pathways, skill gap analysis & government job portal guide',
    taglineTelugu: 'కెరీర్ మార్గాలు, నైపుణ్యాల విశ్లేషణ మరియు ప్రభుత్వ ఉద్యోగాలు',
    taglineHindi: 'करियर मार्गदर्शन, कौशल अंतराल विश्लेषण और रोजगार पोर्टल',
    icon: 'Briefcase',
    color: '#818CF8', // Indigo
    bgLight: 'rgba(129, 140, 248, 0.1)',
    borderColor: 'rgba(129, 140, 248, 0.3)',
    isPrimary: false,
    features: [
      'Skill Gap Visualizer',
      'Free SWAYAM / NPTEL Courses',
      'National Career Service (NCS)',
      'Resume Checklist'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    nameTelugu: 'ఆరోగ్యం & సంక్షేమం',
    nameHindi: 'स्वास्थ्य व आरोग्य',
    tagline: 'Ayushman Bharat PMJAY, Aarogyasri & general wellness information',
    taglineTelugu: 'ఆయుష్మాన్ భారత్, ఆరోగ్యశ్రీ మరియు సాధారణ ఆరోగ్య సమాచారం',
    taglineHindi: 'आयुष्मान भारत, सामान्य स्वास्थ्य और आरोग्य परामर्श',
    icon: 'HeartPulse',
    color: '#F43F5E', // Rose
    bgLight: 'rgba(244, 63, 94, 0.1)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    isPrimary: false,
    features: [
      'Empaneled Hospital Finder Simulator',
      'ABHA Health ID Generation Guide',
      'Emergency 108 / 104 Helplines',
      'General Lifestyle Advisory'
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    nameTelugu: 'ఆర్థిక అక్షరాస్యత',
    nameHindi: 'वित्तीय साक्षरता',
    tagline: 'Digital payment (UPI) security, fraud alert & budget simulator',
    taglineTelugu: 'డిజిటల్ పేమెంట్ భద్రత, మోసాల నివారణ మరియు బడ్జెట్ టూల్',
    taglineHindi: 'यूपीआई सुरक्षा, ऑनलाइन फ्रॉड रोकथाम और बजट सिम्युलेटर',
    icon: 'Coins',
    color: '#EAB308', // Amber / Gold
    bgLight: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.3)',
    isPrimary: false,
    features: [
      'UPI Fraud & Scam Simulator',
      '50/30/20 Budgeting Calculator',
      'PM Mudra Loan Information',
      'Cyber Crime 1930 Reporting Guide'
    ]
  }
];
