import { supabaseAdmin } from '../../config/supabase'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email, password,
    email_confirm: true,
    user_metadata: { name },
  })
  if (error) throw new Error(error.message)

  await supabaseAdmin.from('profiles').insert({
    id: data.user.id, email, name,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  })

  return data.user
}

export async function refreshToken(token: string) {
  const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: token })
  if (error) throw new Error(error.message)
  return data
}

export async function resetPassword(email: string) {
  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email)
  if (error) throw new Error(error.message)
}

export async function getProfile(userId: string) {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', userId).single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateProfile(userId: string, updates: { name?: string; farmName?: string; avatarUrl?: string }) {
  const { data, error } = await supabaseAdmin.from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId).select().single()
  if (error) throw new Error(error.message)
  return data
}
