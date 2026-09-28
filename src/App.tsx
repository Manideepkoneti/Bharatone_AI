import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { ApiKeyModal } from './components/common/ApiKeyModal';
import { LandingHero } from './components/landing/LandingHero';
import { DomainsGrid } from './components/landing/DomainsGrid';
import { HowItWorks } from './components/landing/HowItWorks';
import { LandingDemo } from './components/landing/LandingDemo';
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { DashboardView } from './components/dashboard/DashboardView';
import { AssistantView } from './components/assistant/AssistantView';
import { EducationView } from './components/education/EducationView';
import { AgricultureView } from './components/agriculture/AgricultureView';
import { ServicesView } from './components/services/ServicesView';
import { EmploymentView } from './components/employment/EmploymentView';
import { HealthcareView } from './components/healthcare/HealthcareView';
import { FinanceView } from './components/finance/FinanceView';
import { ProfileView } from './components/profile/ProfileView';
import { HistoryView } from './components/history/HistoryView';
import { ImpactView } from './components/impact/ImpactView';
import { AdminView } from './components/admin/AdminView';
import { StorageService } from './services/storage';
import { Language, DomainId } from './types';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useNotification();

  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedLang, setSelectedLang] = useState<Language>(() => user?.preferredLanguage || 'te');
  const [activeQueryForAssistant, setActiveQueryForAssistant] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [demoMode, setDemoMode] = useState<boolean>(() => StorageService.getSettings().demoMode);

  // Sync user language when user profile changes
  React.useEffect(() => {
    if (user?.preferredLanguage) {
      setSelectedLang(user.preferredLanguage);
    }
  }, [user]);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLang(lang);
    const langNames = { te: 'తెలుగు (Telugu)', hi: 'हिन्दी (Hindi)', en: 'English' };
    showToast('Language Changed', `Interface switched to ${langNames[lang]}.`, 'info');
  };

  const handleAskAIFromDashboard = (query: string) => {
    setActiveQueryForAssistant(query);
    setCurrentTab('assistant');
  };

  const handleNavigateToDomain = (domain: string) => {
    setCurrentTab(domain);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    // 1. Public Landing Page
    if (currentTab === 'landing' || (!isAuthenticated && currentTab !== 'login' && currentTab !== 'register')) {
      return (
        <div className="space-y-12">
          <LandingHero
            onStart={() => {
              if (isAuthenticated) setCurrentTab('dashboard');
              else setCurrentTab('login');
            }}
            onExplore={() => {
              const el = document.getElementById('domains-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <DomainsGrid
            onSelectDomain={(domain) => {
              if (isAuthenticated) setCurrentTab(domain);
              else setCurrentTab('login');
            }}
          />
          <HowItWorks />
          <LandingDemo
            onStartFullChat={(prompt) => {
              setActiveQueryForAssistant(prompt);
              if (isAuthenticated) setCurrentTab('assistant');
              else setCurrentTab('login');
            }}
          />
        </div>
      );
    }

    // 2. Authentication
    if (currentTab === 'login') {
      return <LoginView onNavigate={(tab) => setCurrentTab(tab)} />;
    }
    if (currentTab === 'register') {
      return <RegisterView onNavigate={(tab) => setCurrentTab(tab)} />;
    }

    // 3. Authenticated App Pages
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={(tab) => setCurrentTab(tab)}
            onAskAI={handleAskAIFromDashboard}
            selectedLang={selectedLang}
            onLanguageChange={handleLanguageChange}
          />
        );
      case 'assistant':
        return (
          <AssistantView
            initialQuery={activeQueryForAssistant}
            selectedLang={selectedLang}
            onNavigateToModule={handleNavigateToDomain}
          />
        );
      case 'education':
        return <EducationView selectedLang={selectedLang} />;
      case 'agriculture':
        return <AgricultureView selectedLang={selectedLang} />;
      case 'services':
        return <ServicesView selectedLang={selectedLang} />;
      case 'employment':
        return <EmploymentView selectedLang={selectedLang} />;
      case 'healthcare':
        return <HealthcareView selectedLang={selectedLang} />;
      case 'finance':
        return <FinanceView selectedLang={selectedLang} />;
      case 'profile':
        return <ProfileView />;
      case 'history':
        return (
          <HistoryView
            onReopenQuery={(query) => {
              setActiveQueryForAssistant(query);
              setCurrentTab('assistant');
            }}
            onNavigateToModule={handleNavigateToDomain}
          />
        );
      case 'impact':
        return <ImpactView />;
      case 'admin':
        return <AdminView />;
      default:
        return (
          <DashboardView
            onNavigate={(tab) => setCurrentTab(tab)}
            onAskAI={handleAskAIFromDashboard}
            selectedLang={selectedLang}
            onLanguageChange={handleLanguageChange}
          />
        );
    }
  };

  const showSidebar = isAuthenticated && currentTab !== 'landing' && currentTab !== 'login' && currentTab !== 'register';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Universal Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedLang={selectedLang}
        onLanguageChange={handleLanguageChange}
        onOpenSettings={() => setIsSettingsOpen(true)}
        demoMode={demoMode}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar (visible when logged in) */}
        {showSidebar && (
          <Sidebar
            currentTab={currentTab}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedLang={selectedLang}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {/* Viewport Content */}
        <main className="flex-1 w-full min-w-0 pb-16">
          {renderActiveView()}
        </main>
      </div>

      {/* Universal Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* System Settings & Gemini API Modal */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsUpdated={() => {
          setDemoMode(StorageService.getSettings().demoMode);
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MainAppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}
