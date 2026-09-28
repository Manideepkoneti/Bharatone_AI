import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { User, Mail, Globe, MapPin, GraduationCap, Save, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

export const ProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotification();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(user?.preferredLanguage || 'te');
  const [location, setLocation] = useState(user?.location || 'Andhra Pradesh');
  const [district, setDistrict] = useState(user?.district || 'Guntur');
  const [education, setEducation] = useState(user?.education || 'Undergraduate (B.Tech)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      preferredLanguage,
      location,
      district,
      education
    });
    showToast('Profile Updated', 'Your citizen preferences were saved successfully.', 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
          <User className="w-3.5 h-3.5" />
          <span>Citizen Identity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          👤 My Profile & Preferences
        </h1>
        <p className="text-sm text-slate-400">
          Personalize your regional state domicile, preferred mother tongue, and academic qualifications.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Top Profile Summary Badge */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-sky-500 flex items-center justify-center font-bold text-2xl text-white uppercase shadow-lg shadow-orange-500/20">
            {name ? name.charAt(0) : 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">{name || 'Citizen User'}</h3>
            <p className="text-xs text-slate-400">{email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                {location}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                {preferredLanguage === 'te' ? 'తెలుగు (Telugu)' : preferredLanguage === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Preferred Language</label>
              <div className="relative">
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value as Language)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">State / Domicile</label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Other Indian States">Other Indian States</option>
                </select>
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Education Level</label>
              <div className="relative">
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500"
                />
                <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
