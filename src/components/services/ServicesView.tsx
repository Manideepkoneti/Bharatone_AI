import React, { useState } from 'react';
import { PUBLIC_SERVICES } from '../../data/services';
import { PublicService, Language } from '../../types';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface ServicesViewProps {
  selectedLang: Language;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ selectedLang }) => {
  const { showToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeService, setActiveService] = useState<PublicService>(PUBLIC_SERVICES[0]);

  const categories = [
    { id: 'all', label: 'All Services', icon: '🏛️' },
    { id: 'documents', label: '📄 Certificates & ID', icon: '📄' },
    { id: 'education', label: '🎓 Education', icon: '🎓' },
    { id: 'agriculture', label: '🌾 Agriculture', icon: '🌾' },
    { id: 'healthcare', label: '🏥 Healthcare', icon: '🏥' },
    { id: 'housing', label: '🏠 Housing (PMAY)', icon: '🏠' },
    { id: 'transportation', label: '🚍 Transport / Driving', icon: '🚍' },
  ];

  const filteredServices = PUBLIC_SERVICES.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleTelugu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Civic Access Layer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            🏛️ Public Service Navigator
          </h1>
          <p className="text-sm text-slate-400">
            Direct roadmap to state & central government welfare schemes, certificates, and MeeSeva citizen portals.
          </p>
        </div>

        {/* Informational Guidance Badge */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0" />
          <span>Informational guidance layer • Zero application fees</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates, schemes, or departments (e.g., Income Certificate, PM-Kisan)..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Services List + Active Service Detailed Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Service Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Available Citizen Services ({filteredServices.length})
          </p>

          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredServices.map((service) => {
              const isSelected = activeService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setActiveService(service);
                    showToast('Service Selected', service.title, 'info');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-800/90 border-orange-500/60 shadow-xl shadow-orange-500/10'
                      : 'glass-panel border-white/5 hover:border-white/20 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-200 uppercase">
                      {service.category}
                    </span>
                    <span className="text-[11px] text-orange-400 font-semibold truncate max-w-[140px]">
                      {service.portalName}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white font-heading">
                    {service.title}
                  </h3>
                  <p className="text-xs text-orange-300/90 font-medium font-telugu mt-0.5">
                    {service.titleTelugu}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Service Guide (Section 14 structure) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-[#121927] via-[#0E1524] to-[#0A0F1A] space-y-6">
            {/* Title & Department */}
            <div className="border-b border-white/10 pb-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Department: {activeService.department}
              </span>
              <h2 className="text-2xl font-black text-white font-heading">
                {activeService.title}
              </h2>
              <p className="text-sm text-orange-300 font-semibold font-telugu">
                {activeService.titleTelugu}
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Purpose & Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
                {activeService.description}
              </p>
            </div>

            {/* Eligibility Considerations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Eligibility Considerations
              </h4>
              <div className="space-y-1.5">
                {activeService.eligibility.map((el, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                3. Common Required Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeService.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-emerald-300 flex items-start gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* General Process */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                4. General Application Process
              </h4>
              <div className="space-y-2">
                {activeService.processSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-md bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Crucial Navigation Disclaimer (Section 14) */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold block uppercase tracking-wide text-[10px]">
                  Navigational Layer Disclaimer
                </strong>
                <p>
                  BharatOne AI is a navigation and guidance layer for Indian citizens. It does not submit government applications or process official certifications directly. Please use the official state portal below to submit applications.
                </p>
              </div>
            </div>

            {/* Official Source External Link */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-slate-400">
                Official Gateway: <strong className="text-white">{activeService.portalName}</strong>
              </span>
              <a
                href={activeService.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
              >
                <span>Open {activeService.portalName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
