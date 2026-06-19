import { supabase } from '../../../services/supabase/client'
import { Machinery, MachineryTelemetry } from '../../../types'

export async function fetchMachinery(farmId?: string): Promise<Machinery[]> {
  let query = supabase.from('machinery').select('*').order('name')
  if (farmId) query = query.eq('farm_id', farmId)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []) as Machinery[]
}

export async function createMachinery(payload: Omit<Machinery, 'id' | 'createdAt' | 'updatedAt'>): Promise<Machinery> {
  const { data, error } = await supabase.from('machinery').insert({ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select().single()
  if (error) throw new Error(error.message)
  return data as Machinery
}

export async function updateMachinery(id: string, payload: Partial<Machinery>): Promise<Machinery> {
  const { data, error } = await supabase.from('machinery').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as Machinery
}

export async function deleteMachinery(id: string): Promise<void> {
  const { error } = await supabase.from('machinery').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function fetchTelemetry(machineryId: string, limit = 10): Promise<MachineryTelemetry[]> {
  const { data, error } = await supabase.from('machinery_telemetry').select('*').eq('machinery_id', machineryId).order('recorded_at', { ascending: false }).limit(limit)
  if (error) throw new Error(error.message)
  return (data ?? []) as MachineryTelemetry[]
}
