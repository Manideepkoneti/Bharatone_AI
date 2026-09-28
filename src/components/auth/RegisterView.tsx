import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Language } from '../../types';
import { User, Mail, Lock, Globe, MapPin, GraduationCap, ArrowRight } from 'lucide-react';

interface RegisterViewProps {
  onNavigate: (tab: string) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const { showToast } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('te');
  const [location, setLocation] = useState('Andhra Pradesh');
  const [education, setEducation] = useState('Undergraduate');
  const [interests, setInterests] = useState<string[]>([
    'Education Scholarships',
    'Public Services'
  ]);
  const [loading, setLoading] = useState(false);

  const availableInterests = [
    'Education Scholarships',
    'Agriculture & Crop Advisory',
    'MeeSeva Public Certificates',
    'Employment & Career',
    'Healthcare Schemes',
    'Digital Payment Safety'
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Missing Fields', 'Please complete all required registration fields.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Password Mismatch', 'Password and confirm password must match exactly.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register({
        name,
        email,
        preferredLanguage,
        location,
        education,
        interests
      });
      setLoading(false);
      showToast('Registration Successful', `Welcome to BharatOne AI, ${name}!`, 'success');
      onNavigate('dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl p-8 sm:p-10 space-y-6 bg-[#0E1526]/90">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 mb-2">
            <span>🇮🇳</span>
            <span>Citizen Profile Setup</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">
            Create your BharatOne Profile
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Personalize your AI assistant for your state, preferred language, and academic needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ravi Kumar"
                  required
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ravi@example.com"
                  required
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Preferred Language */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Preferred Language
              </label>
              <div className="relative">
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value as Language)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Location / State */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                State / UT
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi NCT">Delhi NCT</option>
                  <option value="Other States">Other Indian State</option>
                </select>
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Education Level */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">
                Current Education Level
              </label>
              <div className="relative">
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="School (Class 1-10)">School (Class 1-10)</option>
                  <option value="Intermediate / +2 (+12)">Intermediate / +2 (+12)</option>
                  <option value="Polytechnic / Diploma">Polytechnic / Diploma</option>
                  <option value="Undergraduate (Degree / B.Tech / MBBS)">Undergraduate (Degree / B.Tech / MBBS)</option>
                  <option value="Postgraduate (PG / M.Tech / MBA)">Postgraduate (PG / M.Tech / MBA)</option>
                  <option value="Ph.D / Research">Ph.D / Research Scholar</option>
                  <option value="Non-Student / Farmer / Citizen">Non-Student / Farmer / Citizen</option>
                </select>
                <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>

          {/* Optional Interests Checklist */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Areas of Interest (Optional)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableInterests.map((item) => {
                const isSelected = interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`text-left text-xs p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500/40 text-orange-300 font-semibold'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span>Creating Profile...</span>
              ) : (
                <>
                  <span>Create Account & Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
