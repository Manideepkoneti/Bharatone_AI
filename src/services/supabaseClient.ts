import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, Conversation, CropAnalysisResult } from '../types';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const STORAGE_KEY = 'bharatone_supabase_config';

class SupabaseManager {
  private client: SupabaseClient | null = null;
  private config: SupabaseConfig = { url: '', anonKey: '' };

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    // 1. Check Vite Environment Variables with active project fallbacks
    const envUrl = import.meta.env.VITE_SUPABASE_URL || 'https://htzyquzyglqzcuqjlakk.supabase.co';
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_f1_vnsmsqB42Zib0wwzaLw_UjsGwUhr';

    // 2. Check localStorage for in-app configuration
    let storedConfig: Partial<SupabaseConfig> = {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        storedConfig = JSON.parse(stored);
      }
    } catch {
      // ignore
    }

    const finalUrl = storedConfig.url || envUrl;
    const finalKey = storedConfig.anonKey || envKey;

    this.config = { url: finalUrl, anonKey: finalKey };

    if (finalUrl && finalKey && finalUrl.startsWith('http')) {
      try {
        this.client = createClient(finalUrl, finalKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
          }
        });
      } catch (err) {
        console.warn('Failed to initialize Supabase client:', err);
        this.client = null;
      }
    }
  }

  public getClient(): SupabaseClient | null {
    if (!this.client && this.config.url && this.config.anonKey) {
      this.loadConfig();
    }
    return this.client;
  }

  public isConfigured(): boolean {
    return !!(this.config.url && this.config.anonKey && this.config.url.startsWith('http'));
  }

  public getConfig(): SupabaseConfig {
    return { ...this.config };
  }

  public saveConfig(url: string, anonKey: string): boolean {
    this.config = { url: url.trim(), anonKey: anonKey.trim() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
      if (this.config.url && this.config.anonKey && this.config.url.startsWith('http')) {
        this.client = createClient(this.config.url, this.config.anonKey);
        return true;
      }
      this.client = null;
    } catch {
      // ignore
    }
    return false;
  }

  // Live connection test
  public async testConnection(url?: string, anonKey?: string): Promise<{ success: boolean; message: string }> {
    const testUrl = url || this.config.url;
    const testKey = anonKey || this.config.anonKey;

    if (!testUrl || !testKey || !testUrl.startsWith('http')) {
      return { success: false, message: 'Please provide valid Supabase Project URL and Anon API Key.' };
    }

    try {
      const testClient = createClient(testUrl, testKey);
      // Try to query or ping supabase health
      const { data, error } = await testClient.from('profiles').select('id').limit(1);
      
      if (!error) {
        return { 
          success: true, 
          message: 'Connected to Supabase and verified public.profiles table successfully!' 
        };
      }

      // Check if project is reachable but table is not yet created in the schema cache
      if (
        error.code === '42P01' || 
        error.code === 'PGRST205' || 
        error.message?.toLowerCase().includes('schema cache') || 
        error.message?.toLowerCase().includes('relation') || 
        error.message?.toLowerCase().includes('does not exist')
      ) {
        return { 
          success: false, 
          message: "Supabase connection is verified, but 'public.profiles' table is not created yet. Please execute supabase_schema.sql in your Supabase SQL Editor." 
        };
      }

      return { success: false, message: `Supabase error: ${error.message}` };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to reach Supabase endpoint.' };
    }
  }

  // Insert Profile with exact feedback
  public async insertProfile(profile: UserProfile): Promise<{ success: boolean; error?: string; data?: any }> {
    const client = this.getClient();
    if (!client) {
      return { 
        success: false, 
        error: 'Supabase client is not initialized or configured. Please verify connection.' 
      };
    }

    try {
      const payload = {
        id: profile.id,
        name: profile.name.trim(),
        email: profile.email ? profile.email.trim() : null,
        preferred_language: profile.preferredLanguage || 'te',
        location: profile.location || null,
        district: profile.district ? profile.district.trim() : null,
        education: profile.education || null,
        interests: profile.interests || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await client
        .from('profiles')
        .insert([payload])
        .select();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { 
        success: false, 
        error: err?.message || 'Failed to insert profile into Supabase.' 
      };
    }
  }

  // Update Profile with exact feedback
  public async updateProfile(profile: UserProfile): Promise<{ success: boolean; error?: string; data?: any }> {
    const client = this.getClient();
    if (!client) {
      return { 
        success: false, 
        error: 'Supabase client is not initialized or configured.' 
      };
    }

    try {
      const payload = {
        name: profile.name.trim(),
        email: profile.email ? profile.email.trim() : null,
        preferred_language: profile.preferredLanguage || 'te',
        location: profile.location || null,
        district: profile.district ? profile.district.trim() : null,
        education: profile.education || null,
        interests: profile.interests || [],
        updated_at: new Date().toISOString()
      };

      const { data, error } = await client
        .from('profiles')
        .update(payload)
        .eq('id', profile.id)
        .select();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: any) {
      return { 
        success: false, 
        error: err?.message || 'Failed to update profile in Supabase.' 
      };
    }
  }

  // Profile Sync
  public async syncProfile(profile: UserProfile): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client.from('profiles').upsert({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        preferred_language: profile.preferredLanguage,
        location: profile.location,
        district: profile.district,
        education: profile.education,
        interests: profile.interests,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase syncProfile notice:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase syncProfile error:', err);
      return false;
    }
  }

  // Save Conversation
  public async saveConversation(conversation: Conversation, userId?: string): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client.from('conversations').upsert({
        id: conversation.id,
        user_id: userId || 'anonymous',
        title: conversation.title,
        domain: conversation.domain,
        language: conversation.language,
        summary: conversation.summary,
        messages: conversation.messages,
        created_at: new Date().toISOString()
      }, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase saveConversation notice:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase saveConversation error:', err);
      return false;
    }
  }

  // Fetch Conversations
  public async fetchConversations(userId: string): Promise<Conversation[] | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        domain: item.domain,
        language: item.language,
        timestamp: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        messages: item.messages || [],
        summary: item.summary
      }));
    } catch {
      return null;
    }
  }

  // Save Crop Analysis
  public async saveCropAnalysis(
    analysis: CropAnalysisResult, 
    userId: string = 'anonymous',
    cropName: string = 'Crop'
  ): Promise<boolean> {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client.from('crop_analyses').insert({
        user_id: userId,
        crop_name: cropName,
        detected_issue: analysis.detectedIssue,
        confidence: analysis.confidence,
        severity: analysis.severity,
        symptoms: analysis.symptoms,
        causes: analysis.possibleCauses,
        remedies: {
          organic: analysis.organicRemedy,
          chemical: analysis.chemicalRemedy
        },
        created_at: new Date().toISOString()
      });

      return !error;
    } catch {
      return false;
    }
  }
}

export const SupabaseService = new SupabaseManager();
