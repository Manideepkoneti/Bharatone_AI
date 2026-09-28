export type Language = 'en' | 'te' | 'hi';

export type DomainId = 
  | 'education' 
  | 'agriculture' 
  | 'government' 
  | 'employment' 
  | 'healthcare' 
  | 'finance';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferredLanguage: Language;
  location: string;
  district?: string;
  education: string;
  interests: string[];
  createdAt: string;
}

export interface IntentAnalysis {
  language: string;
  languageCode: Language;
  intent: string;
  domain: DomainId;
  confidence: number; // e.g. 0.98
  summary: string;
  summaryTelugu?: string;
  summaryHindi?: string;
  clarifyingQuestions?: string[];
  requiredInformation: string[];
  requiredDocuments: string[];
  recommendedSteps: string[];
  disclaimer: string;
  deepLink?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  analysis?: IntentAnalysis;
  audioAvailable?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  domain: DomainId;
  language: Language;
  timestamp: string;
  messages: Message[];
  summary: string;
}

export interface PublicService {
  id: string;
  category: DomainId | 'documents' | 'housing' | 'transportation';
  title: string;
  titleTelugu: string;
  titleHindi: string;
  description: string;
  department: string;
  eligibility: string[];
  requiredDocuments: string[];
  processSteps: string[];
  officialUrl: string;
  portalName: string;
  isPopular?: boolean;
}

export interface ScholarshipScheme {
  id: string;
  title: string;
  provider: string;
  level: string[];
  minGpa?: string;
  incomeLimit: string;
  benefit: string;
  deadline: string;
  description: string;
  officialUrl: string;
  category: string;
}

export interface CropAnalysisResult {
  cropName: string;
  detectedIssue: string;
  issueTelugu: string;
  issueHindi: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High';
  symptoms: string[];
  possibleCauses: string[];
  generalAdvisory: string[];
  recommendedSteps: string[];
  organicRemedy: string;
  chemicalRemedy?: string;
  disclaimer: string;
}

export interface NotificationItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: number;
}
