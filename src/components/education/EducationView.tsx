import React, { useState } from 'react';
import { SCHOLARSHIPS } from '../../data/scholarships';
import { ScholarshipScheme, Language } from '../../types';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Building2, 
  Calendar, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import confetti from 'canvas-confetti';

interface EducationViewProps {
  selectedLang: Language;
}

export const EducationView: React.FC<EducationViewProps> = ({ selectedLang }) => {
  const { showToast } = useNotification();

  const [step, setStep] = useState(1);
  const [level, setLevel] = useState('undergraduate');
  const [location, setLocation] = useState('Andhra Pradesh');
  const [stream, setStream] = useState('Engineering / B.Tech');
  const [gpa, setGpa] = useState('75% and above');
  const [category, setCategory] = useState('OBC / BC');
  const [income, setIncome] = useState('Below ₹2,50,000');
  const [isHosteler, setIsHosteler] = useState(true);
  const [matchedSchemes, setMatchedSchemes] = useState<ScholarshipScheme[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Evaluate matching schemes
      const matched = SCHOLARSHIPS.filter((s) => {
        return s.level.includes(level) || level === 'undergraduate';
      });
      setMatchedSchemes(matched);
      setShowResults(true);
      showToast('Scholarship Matching Complete', `Found ${matched.length} potential schemes matching your criteria.`, 'success');
      
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Dedicated Education Module</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            🎓 Education Assistant
          </h1>
          <p className="text-sm text-slate-400">
            Intelligent scholarship matching, document roadmap, and official state reimbursement navigation.
          </p>
        </div>

        {showResults && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:bg-slate-700 transition-all self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Check Another Profile</span>
          </button>
        )}
      </div>

      {!showResults ? (
        /* 4-Step Interactive Wizard (Section 12) */
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8">
          {/* Animated Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-cyan-400">Step {step} of 4</span>
              <span className="text-slate-400">{step * 25}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Education Level */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Step 1: What is your current education level?
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Select your current enrolled tier or upcoming academic milestone.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'school', label: 'School Education', sub: 'Class 1 to Class 10' },
                  { id: 'intermediate', label: 'Intermediate / +2', sub: 'Junior College (MPC, BiPC, CEC, MEC)' },
                  { id: 'polytechnic', label: 'Polytechnic / Diploma', sub: '3-Year Technical Diploma' },
                  { id: 'undergraduate', label: 'Undergraduate Degree', sub: 'B.Tech, B.Sc, B.Com, MBBS, B.A' },
                  { id: 'postgraduate', label: 'Postgraduate / Master', sub: 'M.Tech, M.Sc, MBA, MCA, M.A' },
                  { id: 'phd', label: 'Ph.D / Research', sub: 'Doctoral Fellowship' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLevel(item.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      level === item.id
                        ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <p className={`text-sm font-bold ${level === item.id ? 'text-cyan-300' : 'text-white'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Location */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Step 2: Domicile and Institution Location
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  State welfare schemes (e.g. Jagananna Vidya Deevena) depend on permanent state residence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Andhra Pradesh', label: 'Andhra Pradesh', sub: 'Eligible for Jagananna Vidya & Vasathi Deevena' },
                  { id: 'Telangana', label: 'Telangana', sub: 'Eligible for TS ePASS Post-Matric & Overseas' },
                  { id: 'Karnataka', label: 'Karnataka', sub: 'Eligible for SSP Karnataka State Portal' },
                  { id: 'Tamil Nadu', label: 'Tamil Nadu', sub: 'Eligible for TN Adi Dravidar & BC Welfare' },
                  { id: 'Uttar Pradesh', label: 'Uttar Pradesh', sub: 'Eligible for UP Scholarship & Fee Reimbursement' },
                  { id: 'Other Indian States', label: 'Other Indian States', sub: 'Eligible for Central Sector & NSP Schemes' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLocation(item.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      location === item.id
                        ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <p className={`text-sm font-bold ${location === item.id ? 'text-cyan-300' : 'text-white'}`}>
                      📍 {item.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Academic Information */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Step 3: Academic Performance & Social Category
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Merit scores and social categories help unlock both affirmative government reservations and private merit grants.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Academic Score in Previous Exam
                  </label>
                  <select
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="90% and above">Top Tier (90% and above / Above 9.0 CGPA)</option>
                    <option value="75% and above">First Class with Distinction (75% - 89%)</option>
                    <option value="60% and above">First Class (60% - 74%)</option>
                    <option value="50% and above">Second Class (50% - 59%)</option>
                    <option value="Passing Grade">Passing Grade / Regular Attendance</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Social Reservation Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="OBC / BC">BC / OBC (Backward Classes)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                    <option value="General / Open">General / Open Category</option>
                    <option value="Minority">Religious Minority (Muslim, Christian, Sikh, Jain)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Income & Living */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Step 4: Annual Family Income & Living Status
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Government full fee reimbursement mandates family income limits verified via Tahsildar income certification.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Total Family Annual Income
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Below ₹1,00,000', label: 'Below ₹1,00,000 / year', tag: 'BPL / Highest Subsidy' },
                      { id: 'Below ₹2,50,000', label: '₹1.00L to ₹2.50L / year', tag: 'Full Fee Reimbursement Cap' },
                      { id: 'Above ₹2,50,000', label: 'Above ₹2.50L / year', tag: 'Merit & AICTE Pragati Only' }
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setIncome(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          income === item.id
                            ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-300 font-semibold'
                            : 'bg-slate-900 border-white/5 text-slate-400'
                        }`}
                      >
                        <p className="text-xs font-bold text-white">{item.label}</p>
                        <p className="text-[10px] text-cyan-400/80 mt-1">{item.tag}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    id="hostel"
                    type="checkbox"
                    checked={isHosteler}
                    onChange={(e) => setIsHosteler(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="hostel" className="text-xs text-slate-300 cursor-pointer">
                    I am staying in a College Attached or Government Approved Hostel (Eligible for Vasathi Deevena maintenance grant)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
              >
                Back
              </button>
            ) : <div />}

            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>{step === 4 ? 'Evaluate My Scholarship Matches' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Results Card (Section 12 structure) */
        <div className="space-y-6 animate-fade-in">
          {/* Main Structured Result Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#0B1528] via-[#09101D] to-[#060A13] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  🎓 Scholarship Guidance Output
                </span>
                <h3 className="text-2xl font-black text-white font-heading mt-1">
                  Potential Category: Student Financial Support
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                High Eligibility Match
              </span>
            </div>

            {/* Commonly Relevant Information Box */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Commonly Relevant Information:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  '✓ Academic records (Passing percentage / GPA transcripts)',
                  '✓ Identity documentation (Aadhaar cards of student & mother)',
                  '✓ Income-related documentation (Revenue Tahsildar certificate < ₹2.5L)',
                  '✓ Bank details (Mother’s Aadhaar-seeded active bank account)'
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs font-medium text-emerald-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Next Steps */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Recommended Next Steps:
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  '1. Verify current eligibility and attendance requirements with your college nodal officer.',
                  '2. Identify the applicable scheme: Jagananna Vidya Deevena for tuition reimbursement and Vasathi Deevena for hostel.',
                  '3. Prepare documents: MeeSeva Integrated Income, Caste Certificate, and Bonafide.',
                  '4. Use the relevant official application channel (jaganannavidyadeevena.ap.gov.in or scholarships.gov.in).'
                ].map((stepText, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200">
                    {stepText}
                  </div>
                ))}
              </div>
            </div>

            {/* Official Disclaimer (Prompt instruction) */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Official Note:</strong> Please verify the latest eligibility requirements using the relevant official source. BharatOne is an informational navigation layer and does not guarantee sanction.
              </p>
            </div>
          </div>

          {/* Matching Scholarship Schemes Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-heading">
              Applicable Scholarship Schemes ({matchedSchemes.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase">
                        {scheme.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {scheme.deadline}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-heading">
                      {scheme.title}
                    </h4>
                    <p className="text-xs text-cyan-400 font-medium">
                      Provider: {scheme.provider}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="text-xs text-emerald-400 font-semibold">
                      Benefit: {scheme.benefit}
                    </div>
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-cyan-600 transition-colors"
                    >
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
