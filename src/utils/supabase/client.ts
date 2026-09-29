import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://htzyquzyglqzcuqjlakk.supabase.co";

const supabaseKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_f1_vnsmsqB42Zib0wwzaLw_UjsGwUhr";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );

export const supabase = createClient();
