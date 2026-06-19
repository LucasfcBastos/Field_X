import { supabaseAdmin } from '../../config/supabase'

export async function findAll(userId: string, farmId?: string) {
  let q = supabaseAdmin.from('sensors').select('*, farms!inner(user_id)').eq('farms.user_id', userId).order('name')
  if (farmId) q = q.eq('farm_id', farmId)
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function create(payload: object) {
  const now = new Date().toISOString()
  const { data, error } = await supabaseAdmin.from('sensors').insert({ ...payload, created_at: now, updated_at: now }).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function update(id: string, payload: object) {
  const { data, error } = await supabaseAdmin.from('sensors').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function remove(id: string) {
  const { error } = await supabaseAdmin.from('sensors').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function findReadings(sensorId: string, limit = 50) {
  const { data, error } = await supabaseAdmin.from('sensor_readings').select('*').eq('sensor_id', sensorId).order('recorded_at', { ascending: false }).limit(limit)
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function addReading(sensorId: string, value: number, unit: string) {
  const { data, error } = await supabaseAdmin.from('sensor_readings').insert({ sensor_id: sensorId, value, unit, recorded_at: new Date().toISOString() }).select().single()
  if (error) throw new Error(error.message)
  return data
}
