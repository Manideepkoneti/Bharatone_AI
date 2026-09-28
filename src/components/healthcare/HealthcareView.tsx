import React, { useState } from 'react';
import { HeartPulse, ShieldAlert, PhoneCall, Search, Hospital, CheckCircle2, UserPlus } from 'lucide-react';
import { Language } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const HealthcareView: React.FC<{ selectedLang: Language }> = () => {
  const { showToast } = useNotification();
  const [hospitalQuery, setHospitalQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const hospitals = [
    { name: 'Government General Hospital (GGH)', city: 'Guntur / Amaravati', scheme: 'Aarogyasri / PM-JAY', beds: '1200 Beds', type: 'Public / Cashless' },
    { name: 'AIIMS Mangalagiri', city: 'Mangalagiri', scheme: 'PM-JAY Empaneled', beds: '960 Beds', type: 'Central Institute' },
    { name: 'KIMS Hospitals', city: 'Vijayawada', scheme: 'Aarogyasri Empaneled', beds: '450 Beds', type: 'Super Specialty' },
    { name: 'Apollo Reach Hospital', city: 'Karimnagar / Warangal', scheme: 'Aarogyasri / PM-JAY', beds: '250 Beds', type: 'Multi Specialty' }
  ];

  const emergencyHelplines = [
    { num: '108', title: 'Emergency Ambulance', desc: 'Critical medical, accident & trauma 24x7 response' },
    { num: '104', title: 'Health Information Helpline', desc: 'Free medical tele-consultation & scheme details' },
    { num: '14416', title: 'Tele-MANAS Mental Health', desc: 'Free confidential psychological counseling' },
    { num: '102', title: 'Mother & Child Care', desc: 'Pregnant women & infant hospital transport' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Wellness & Healthcare Navigation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          🏥 Healthcare & Wellness Navigator
        </h1>
        <p className="text-sm text-slate-400">
          Ayushman Bharat PM-JAY benefits, Aarogyasri empaneled hospital locator, and ABHA health ID guide.
        </p>
      </div>

      {/* MANDATORY PROMINENT MEDICAL DISCLAIMER (Section 16) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 flex items-start gap-3.5 text-xs sm:text-sm text-rose-200">
        <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-rose-300 font-bold uppercase tracking-wider text-xs block">
            Critical Medical Disclaimer
          </strong>
          <p className="leading-relaxed">
            "Information provided is for general guidance and citizen service navigation and does not replace professional medical advice, clinical diagnosis, or hospital treatment. In any medical emergency, please call 108 immediately."
          </p>
        </div>
      </div>

      {/* 24x7 Emergency Helplines Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white font-heading">
          National Emergency Helplines (Toll-Free 24x7)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {emergencyHelplines.map((item) => (
            <div key={item.num} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-rose-400 font-mono">{item.num}</span>
                <PhoneCall className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs font-bold text-white">{item.title}</p>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Empaneled Hospital Finder Simulator */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Empaneled Network Hospital Finder (PM-JAY / Aarogyasri)
            </h3>
            <p className="text-xs text-slate-400">
              Locate verified government and private cashless healthcare centers.
            </p>
          </div>
          <a
            href="https://beneficiary.nha.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors self-start sm:self-auto"
          >
            <span>Check Card on NHA Portal</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((h, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  {h.scheme}
                </span>
                <span className="text-[11px] text-slate-400">{h.beds}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{h.name}</h4>
              <p className="text-xs text-slate-400">📍 {h.city} • {h.type}</p>
              <button
                onClick={() => showToast('Hospital Contact', `Approaching Arogyamitra at ${h.name}. Bring Aadhaar & Rice Card.`, 'info')}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold pt-1 flex items-center gap-1"
              >
                <span>View Free Treatment Specialties →</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
