-- ==============================================================================
-- 🇮🇳 BHARATONE AI — OFFICIAL SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Project: BharatOne AI (https://htzyquzyglqzcuqjlakk.supabase.co)
-- Purpose: Complete database schema with profiles, conversations, crop analyses,
--          citizen inquiries, indexes, RLS policies, and PostgREST grants.
-- Instructions: Copy and run this entire script in your Supabase SQL Editor:
--               👉 https://supabase.com/dashboard/project/htzyquzyglqzcuqjlakk/sql/new
-- ==============================================================================

-- 1. Enable Cryptographic & UUID Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLE: public.profiles
-- Stores citizen, student, and farmer profile data, languages, and locations.
-- ==============================================================================
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

-- Comments
COMMENT ON TABLE public.profiles IS 'Stores citizen demographic, preferred language, and district location preferences';

-- ==============================================================================
-- 3. TABLE: public.conversations
-- Stores multilingual AI Assistant structured interaction sessions & histories.
-- ==============================================================================
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

COMMENT ON TABLE public.conversations IS 'Stores multilingual BharatOne AI dialogue sessions and structured responses';

-- ==============================================================================
-- 4. TABLE: public.crop_analyses
-- Stores computer-vision agricultural disease screenings and remedies.
-- ==============================================================================
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

COMMENT ON TABLE public.crop_analyses IS 'Stores computer vision agricultural disease screenings and treatments';

-- ==============================================================================
-- 5. TABLE: public.citizen_inquiries
-- Stores public service inquiries, grievance routing, and civic feedback.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.citizen_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    domain TEXT NOT NULL,
    query_text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.citizen_inquiries IS 'Stores citizen assistance inquiries and grievance status';

-- ==============================================================================
-- 6. DEFAULT SYSTEM / GUEST PROFILE
-- Ensures anonymous / unauthenticated guest conversation sessions succeed without FK errors
-- ==============================================================================
INSERT INTO public.profiles (id, name, email, preferred_language, location)
VALUES ('anonymous', 'Guest Citizen', 'guest@bharatone.ai', 'te', 'Bharat')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 7. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_domain ON public.conversations(domain);
CREATE INDEX IF NOT EXISTS idx_conversations_created ON public.conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crop_analyses_user ON public.crop_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_crop_analyses_crop ON public.crop_analyses(crop_name);
CREATE INDEX IF NOT EXISTS idx_citizen_inquiries_user ON public.citizen_inquiries(user_id);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Enable RLS on all exposed tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_inquiries ENABLE ROW LEVEL SECURITY;

-- 8.1 Profiles Policies
DROP POLICY IF EXISTS "Allow public read profiles" ON public.profiles;
CREATE POLICY "Allow public read profiles"
    ON public.profiles FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow public insert profiles" ON public.profiles;
CREATE POLICY "Allow public insert profiles"
    ON public.profiles FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update profiles" ON public.profiles;
CREATE POLICY "Allow public update profiles"
    ON public.profiles FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 8.2 Conversations Policies
DROP POLICY IF EXISTS "Allow public read conversations" ON public.conversations;
CREATE POLICY "Allow public read conversations"
    ON public.conversations FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow public insert conversations" ON public.conversations;
CREATE POLICY "Allow public insert conversations"
    ON public.conversations FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update conversations" ON public.conversations;
CREATE POLICY "Allow public update conversations"
    ON public.conversations FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 8.3 Crop Analyses Policies
DROP POLICY IF EXISTS "Allow public read crop_analyses" ON public.crop_analyses;
CREATE POLICY "Allow public read crop_analyses"
    ON public.crop_analyses FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow public insert crop_analyses" ON public.crop_analyses;
CREATE POLICY "Allow public insert crop_analyses"
    ON public.crop_analyses FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 8.4 Citizen Inquiries Policies
DROP POLICY IF EXISTS "Allow public read citizen_inquiries" ON public.citizen_inquiries;
CREATE POLICY "Allow public read citizen_inquiries"
    ON public.citizen_inquiries FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow public insert citizen_inquiries" ON public.citizen_inquiries;
CREATE POLICY "Allow public insert citizen_inquiries"
    ON public.citizen_inquiries FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- ==============================================================================
-- 9. DATA API & POSTGREST SCHEMA EXPOSURE PERMISSIONS
-- Ensures anon and authenticated roles have permission to read & write to public schema
-- ==============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- ==============================================================================
-- 10. NOTIFY POSTGREST TO RELOAD SCHEMA CACHE IMMEDIATELY
-- ==============================================================================
NOTIFY pgrst, 'reload schema';
