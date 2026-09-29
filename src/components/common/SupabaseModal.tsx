import React, { useState, useEffect } from 'react';
import { SupabaseService } from '../../services/supabaseClient';
import { useNotification } from '../../context/NotificationContext';
import { 
  Database, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Key, 
  Globe, 
  RefreshCw,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useNotification();
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = SupabaseService.getConfig();
      const activeUrl = config.url || 'https://htzyquzyglqzcuqjlakk.supabase.co';
      const activeKey = config.anonKey || 'sb_publishable_f1_vnsmsqB42Zib0wwzaLw_UjsGwUhr';
      setUrl(activeUrl);
      setAnonKey(activeKey);
      setIsConfigured(SupabaseService.isConfigured());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async () => {
    if (!url || !anonKey) {
      showToast('Missing Credentials', 'Please enter your Supabase URL and Anon Key.', 'error');
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await SupabaseService.testConnection(url, anonKey);
      setTestResult(res);
      if (res.success) {
        showToast('Connection Successful', res.message, 'success');
      } else {
        showToast('Connection Failed', res.message, 'error');
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || 'Connection error' });
      showToast('Connection Failed', err?.message || 'Connection error', 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (!url || !anonKey) {
      showToast('Missing Fields', 'Please provide both URL and Anon Key.', 'warning');
      return;
    }

    const success = SupabaseService.saveConfig(url, anonKey);
    if (success) {
      setIsConfigured(true);
      showToast('Supabase Connected', 'Database configuration saved successfully.', 'success');
      onClose();
    } else {
      showToast('Config Error', 'Please check the URL format.', 'error');
    }
  };

  const handleCopySchema = () => {
    const sql = `-- Run in Supabase SQL Editor (https://supabase.com/dashboard/project/htzyquzyglqzcuqjlakk/sql/new)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'te',
    location TEXT,
    district TEXT,
    education TEXT,
    interests TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversations (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    domain TEXT NOT NULL,
    language TEXT NOT NULL,
    summary TEXT,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.crop_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    crop_name TEXT NOT NULL,
    detected_issue TEXT NOT NULL,
    confidence NUMERIC(5, 2),
    severity TEXT,
    symptoms TEXT[] DEFAULT '{}',
    causes TEXT[] DEFAULT '{}',
    remedies JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.citizen_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    domain TEXT NOT NULL,
    query_text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.profiles (id, name, email, preferred_language, location)
VALUES ('anonymous', 'Guest Citizen', 'guest@bharatone.ai', 'te', 'Bharat')
ON CONFLICT (id) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_crop_analyses_user ON public.crop_analyses(user_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read profiles" ON public.profiles;
CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Allow public insert profiles" ON public.profiles;
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update profiles" ON public.profiles;
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read conversations" ON public.conversations;
CREATE POLICY "Allow public read conversations" ON public.conversations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Allow public insert conversations" ON public.conversations;
CREATE POLICY "Allow public insert conversations" ON public.conversations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update conversations" ON public.conversations;
CREATE POLICY "Allow public update conversations" ON public.conversations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read crop_analyses" ON public.crop_analyses;
CREATE POLICY "Allow public read crop_analyses" ON public.crop_analyses FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Allow public insert crop_analyses" ON public.crop_analyses;
CREATE POLICY "Allow public insert crop_analyses" ON public.crop_analyses FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read citizen_inquiries" ON public.citizen_inquiries;
CREATE POLICY "Allow public read citizen_inquiries" ON public.citizen_inquiries FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Allow public insert citizen_inquiries" ON public.citizen_inquiries;
CREATE POLICY "Allow public insert citizen_inquiries" ON public.citizen_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

NOTIFY pgrst, 'reload schema';`;

    navigator.clipboard.writeText(sql);
    showToast('SQL Copied to Clipboard', 'Paste and run in your Supabase SQL Editor.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in text-slate-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-emerald-500/30 bg-[#0B0F19]/95 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-heading">
                  Supabase Database Setup
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isConfigured 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {isConfigured ? '🟢 Connected' : '⚪ Unconfigured'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Connect your PostgreSQL cloud backend for citizen profiles & history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Supabase Project URL</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-project-id.supabase.co"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase Publishable / Anon Key</span>
              </label>
              <button
                type="button"
                onClick={() => setAnonKey('sb_publishable_f1_vnsmsqB42Zib0wwzaLw_UjsGwUhr')}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                Use Active Key
              </button>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="sb_publishable_f1_vnsmsqB42Zib0wwzaLw_UjsGwUhr"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors rounded"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Test Status Banner */}
          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 animate-fade-in ${
              testResult.success
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Quick Guide & Schema Reference */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database Schema Required</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySchema}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>Copy SQL</span>
              </button>
              <a
                href="https://supabase.com/dashboard/project/htzyquzyglqzcuqjlakk/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Open SQL Editor</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Run the SQL script in your Supabase SQL Editor to provision <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded">public.profiles</code>, <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded">conversations</code>, and <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded">crop_analyses</code> with Row Level Security.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save & Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
