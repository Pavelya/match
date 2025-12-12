/**
 * Supabase Client
 *
 * Lazy-initialized singleton client for Supabase services (Storage, Auth, etc.)
 * Only initializes when actually needed to avoid crashes when credentials aren't set.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { env } from '@/lib/env'

let supabaseClient: SupabaseClient | null = null

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
}

/**
 * Get Supabase client instance (lazy initialization)
 * Uses service role key for server-side operations
 * @throws Error if Supabase credentials are not configured
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        'Supabase credentials not found. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.'
      )
    }

    supabaseClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }

  return supabaseClient
}

// Storage bucket name
export const STORAGE_BUCKETS = {
  UNIVERSITY_IMAGES: 'university-images'
} as const
