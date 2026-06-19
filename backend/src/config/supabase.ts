import { createClient } from '@supabase/supabase-js'
import { env } from './env'

// Client com service role — use apenas no backend para operações privilegiadas
export const supabaseAdmin = createClient(
  env.supabase.url,
  env.supabase.serviceRoleKey,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Client com anon key — para operações que respeitam RLS
export const supabase = createClient(env.supabase.url, env.supabase.anonKey)
