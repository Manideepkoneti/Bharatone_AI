import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { AIOrb } from '../common/AIOrb';

interface LoginViewProps {
  onNavigate: (tab: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const { login, loginAsDemoPersona } = useAuth();
  const { showToast } = useNotification();
  const [email, setEmail] = useState('ravi.kumar@bharatone.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Validation Error', 'Please enter your registered email address.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      showToast('Welcome to BharatOne', `Logged in successfully as ${email}`, 'success');
      onNavigate('dashboard');
    }, 600);
  };

  const handleDemoSelect = (persona: 'student' | 'farmer' | 'citizen') => {
    loginAsDemoPersona(persona);
    showToast('Demo Account Activated', `Loaded demo profile for immediate hackathon testing.`, 'success');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
        {/* Left Side: Indian Civic Branding */}
        <div className="relative bg-gradient-to-br from-[#0c1427] via-[#091122] to-[#04070e] p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-500/10 filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-sky-500/10 filter blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
              <span className="text-base">🇮🇳</span>
              <span>Built for Bharat</span>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight leading-tight">
                Bharat<span className="text-orange-500">One</span> <span className="text-sky-400">AI</span>
              </h1>
              <p className="text-orange-400 font-semibold text-base">
                One Assistant. Many Needs.
              </p>
            </div>

            <div className="pt-2 text-sm text-slate-400 space-y-1 font-medium">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Understand.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Guide.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connect.
              </p>
            </div>
          </div>

          {/* Center Orb Visual */}
          <div className="relative z-10 py-6 flex justify-center">
            <AIOrb size="md" />
          </div>

          {/* 1-Click Demo Profiles for Hackathon Judges */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              ⚡ 1-Click Hackathon Demo Profiles
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSelect('student')}
                className="p-2 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 text-left transition-all hover:scale-105"
              >
                <p className="text-[11px] font-bold text-sky-300">🎓 Student</p>
                <p className="text-[9px] text-slate-400 truncate">Ravi (AP / Telugu)</p>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect('farmer')}
                className="p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-left transition-all hover:scale-105"
              >
                <p className="text-[11px] font-bold text-emerald-300">🌾 Farmer</p>
                <p className="text-[9px] text-slate-400 truncate">Venkat (TS / Telugu)</p>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect('citizen')}
                className="p-2 rounded-xl bg-orange-950/40 hover:bg-orange-900/60 border border-orange-500/30 text-left transition-all hover:scale-105"
              >
                <p className="text-[11px] font-bold text-orange-300">🏛️ Citizen</p>
                <p className="text-[9px] text-slate-400 truncate">Priya (UP / Hindi)</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6 bg-[#0E1526]/80">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-heading">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to access your citizen dashboard and AI guidance history.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Password Assistance', 'For this hackathon prototype, any password will sign in.', 'info')}
                  className="text-xs text-orange-400 hover:text-orange-300"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-400 cursor-pointer">
                Remember me on this browser
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Login to BharatOne</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0E1526] px-3 text-[11px] text-slate-500 font-semibold tracking-wider uppercase">
                OR
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => {
                showToast('Google Sign-In Simulator', 'Signed in using Google Workspace identity.', 'success');
                login('google.citizen@bharatone.ai');
                onNavigate('dashboard');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all hover:scale-[1.01]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Footer link to register */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
