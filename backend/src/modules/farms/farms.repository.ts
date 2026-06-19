import { supabaseAdmin } from '../../config/supabase'

export async function findAll(userId: string) {
  const { data, error } = await supabaseAdmin.from('farms').select('*').eq('user_id', userId).order('name')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function findById(id: string, userId: string) {
  const { data, error } = await supabaseAdmin.from('farms').select('*, fields(*)').eq('id', id).eq('user_id', userId).single()
  if (error) throw new Error(error.message)
  return data
}

export async function create(userId: string, payload: object) {
  const now = new Date().toISOString()
  const { data, error } = await supabaseAdmin.from('farms').insert({ ...payload, user_id: userId, created_at: now, updated_at: now }).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function update(id: string, userId: string, payload: object) {
  const { data, error } = await supabaseAdmin.from('farms').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', userId).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function remove(id: string, userId: string) {
  const { error } = await supabaseAdmin.from('farms').delete().eq('id', id).eq('user_id', userId)
  if (error) throw new Error(error.message)
}
