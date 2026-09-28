import React from 'react';
import { DOMAINS } from '../../data/domains';
import { 
  GraduationCap, 
  Sprout, 
  Building2, 
  Briefcase, 
  HeartPulse, 
  Coins, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { DomainId } from '../../types';

interface DomainsGridProps {
  onSelectDomain: (domain: DomainId) => void;
}

export const DomainsGrid: React.FC<DomainsGridProps> = ({ onSelectDomain }) => {
  const iconMap: Record<string, React.ElementType> = {
    GraduationCap,
    Sprout,
    Building2,
    Briefcase,
    HeartPulse,
    Coins
  };

  return (
    <section id="domains-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
          <span>Unified Citizen Access</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Supported Citizen Domains
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          From higher education scholarships and crop leaf diagnostics to MeeSeva public certificates, BharatOne guides you every step of the way.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOMAINS.map((domain) => {
          const Icon = iconMap[domain.icon] || Building2;
          return (
            <div
              key={domain.id}
              onClick={() => onSelectDomain(domain.id)}
              className="group relative p-6 sm:p-7 rounded-2xl glass-panel glass-card-hover border border-white/10 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header with icon & badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: domain.bgLight, color: domain.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {domain.isPrimary ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Live Workflow
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      Interactive Demo
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-orange-400 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-orange-400/90 font-medium mt-0.5 font-telugu">
                    {domain.nameTelugu}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {domain.tagline}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-2 space-y-1.5 border-t border-white/5">
                  {domain.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-4 flex items-center justify-between border-t border-white/10">
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                  Open {domain.name} Assistant
                </span>
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-orange-500 group-hover:text-white group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
