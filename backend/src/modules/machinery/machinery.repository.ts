import { supabaseAdmin } from '../../config/supabase'

export async function findAll(farmId?: string) {
  let q = supabaseAdmin.from('machinery').select('*').order('name')
  if (farmId) q = q.eq('farm_id', farmId)
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function create(payload: object) {
  const now = new Date().toISOString()
  const { data, error } = await supabaseAdmin.from('machinery').insert({ ...payload, created_at: now, updated_at: now }).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function update(id: string, payload: object) {
  const { data, error } = await supabaseAdmin.from('machinery').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function remove(id: string) {
  const { error } = await supabaseAdmin.from('machinery').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function findTelemetry(machineryId: string, limit = 20) {
  const { data, error } = await supabaseAdmin.from('machinery_telemetry').select('*').eq('machinery_id', machineryId).order('recorded_at', { ascending: false }).limit(limit)
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function addTelemetry(machineryId: string, payload: object) {
  const { data, error } = await supabaseAdmin.from('machinery_telemetry').insert({ ...payload, machinery_id: machineryId, recorded_at: new Date().toISOString() }).select().single()
  if (error) throw new Error(error.message)
  return data
}
