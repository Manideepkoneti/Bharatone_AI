import React from 'react';
import { MessageSquare, BrainCircuit, FileCheck2, ExternalLink, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'ASK',
      titleTelugu: 'అడగండి',
      desc: 'Type or speak in natural language. Ask in Telugu, Hindi, or English using everyday words.',
      example: '"Nenu oka student ni. Naaku scholarship kavali."',
      icon: MessageSquare,
      color: 'from-orange-500 to-amber-500',
      badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-500/10'
    },
    {
      num: '02',
      title: 'AI UNDERSTANDS',
      titleTelugu: 'ఏఐ గుర్తింపు',
      desc: 'Our engine identifies the language, core intent, domain, and confidence in real time.',
      example: 'Telugu • Scholarship • 🎓 Education (98% Conf)',
      icon: BrainCircuit,
      color: 'from-sky-500 to-blue-600',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10'
    },
    {
      num: '03',
      title: 'PERSONALIZED GUIDANCE',
      titleTelugu: 'వ్యక్తిగత మార్గదర్శకత్వం',
      desc: 'Receive structured checklists of required certificates, eligibility criteria, and advice.',
      example: 'Income cert < ₹2.5L • College Bonafide • Mother Bank A/c',
      icon: FileCheck2,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    },
    {
      num: '04',
      title: 'NEXT STEPS',
      titleTelugu: 'తదుపరి చర్యలు',
      desc: 'Clear official links to state portals (MeeSeva, NSP, GnanaBhumi) with no fake promises.',
      example: 'Step-by-step e-KYC & Tahsildar approval flow',
      icon: ExternalLink,
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span>Intuitive Citizen Flow</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          How BharatOne Works
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          A seamless 4-step intelligent pipeline connecting everyday citizens to vital public welfare schemes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
            >
              {/* Step indicator header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${step.badgeColor}`}>
                    STEP {step.num}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} p-2 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-orange-400/90 font-medium font-telugu">
                    {step.titleTelugu}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Example box */}
              <div className="mt-6 pt-3 border-t border-white/10">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                  Citizen Example
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 text-[11px] font-mono text-sky-300">
                  {step.example}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
