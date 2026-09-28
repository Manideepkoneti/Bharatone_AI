import React, { useState } from 'react';
import { Briefcase, Sparkles, BookOpen, CheckCircle2, ArrowRight, Award, Compass } from 'lucide-react';
import { Language } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const EmploymentView: React.FC<{ selectedLang: Language }> = () => {
  const { showToast } = useNotification();
  const [careerRole, setCareerRole] = useState('Full Stack AI Developer');
  const [experienceLevel, setExperienceLevel] = useState('Fresh Graduate / College Student');
  const [currentSkills, setCurrentSkills] = useState('HTML, CSS, Basic Python, Problem Solving');
  const [showRoadmap, setShowRoadmap] = useState(false);

  const handleGenerate = () => {
    setShowRoadmap(true);
    showToast('Career Roadmap Generated', `Tailored learning milestones for ${careerRole}.`, 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Interactive Employment Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          💼 Employment & Career Guidance
        </h1>
        <p className="text-sm text-slate-400">
          Skill gap analyzer, free government certifications (SWAYAM / NPTEL), and job preparation roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Define Your Career Aspirations
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Target Desired Career
              </label>
              <select
                value={careerRole}
                onChange={(e) => setCareerRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Full Stack AI Developer">Full Stack & AI Developer</option>
                <option value="Data Analyst / BI Specialist">Data Analyst & BI Specialist</option>
                <option value="Civil Services Aspirant (UPSC / APPSC)">Civil Services Aspirant (UPSC / APPSC)</option>
                <option value="Agritech Field Operations Specialist">Agritech & Sustainable Farming Officer</option>
                <option value="Cloud & Cyber Security Analyst">Cloud Infrastructure & Cyber Security</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="College Student / Pre-Final Year">College Student / Pre-Final Year</option>
                <option value="Fresh Graduate (0-1 yr)">Fresh Graduate (0-1 yr)</option>
                <option value="Career Transitioning Professional">Career Transitioning Professional</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Current Known Skills
              </label>
              <textarea
                rows={3}
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Skill Gap & Generate Path</span>
            </button>
          </div>
        </div>

        {/* Right Output: Skill Gap & Learning Path */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-[#0F142A] to-[#0A0D1B] space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
                💼 AI CAREER GUIDANCE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
                Target: {careerRole}
              </h2>
            </div>

            {/* Skill Gap Visualizer */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Identified Skill Gaps to Bridge:
              </h4>
              <div className="space-y-2">
                {[
                  { skill: 'React & Modern Frontend Architecture', status: 'Priority', level: '70% Gap' },
                  { skill: 'FastAPI / Python AI Model Integration', status: 'Core', level: '85% Gap' },
                  { skill: 'Cloud Deployment (Docker, Vercel, Supabase)', status: 'Essential', level: '60% Gap' },
                  { skill: 'Technical Portfolio & Open-Source PRs', status: 'Hiring Key', level: '90% Gap' },
                ].map((gap, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs">
                    <span className="font-semibold text-white">{gap.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {gap.status}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{gap.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Government Certifications */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Free Government & Open-Access Portals:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://swayam.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 flex items-center justify-between text-slate-300 hover:text-white transition-all"
                >
                  <div>
                    <p className="font-bold text-white">SWAYAM Portal</p>
                    <p className="text-[10px] text-slate-400">Govt of India free college credits</p>
                  </div>
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                </a>

                <a
                  href="https://ncs.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 flex items-center justify-between text-slate-300 hover:text-white transition-all"
                >
                  <div>
                    <p className="font-bold text-white">National Career Service (NCS)</p>
                    <p className="text-[10px] text-slate-400">Pan-India Job Fairs & Rozgar Melas</p>
                  </div>
                  <Award className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
