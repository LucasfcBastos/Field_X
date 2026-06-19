import { supabase } from '../../../services/supabase/client'
import { Farm, Field } from '../../../types'

export async function fetchFarms(userId: string): Promise<Farm[]> {
  const { data, error } = await supabase
    .from('farms').select('*').eq('user_id', userId).order('name')
  if (error) throw new Error(error.message)
  return (data ?? []) as Farm[]
}

export async function fetchFarmById(id: string): Promise<Farm> {
  const { data, error } = await supabase.from('farms').select('*').eq('id', id).single()
  if (error) throw new Error(error.message)
  return data as Farm
}

export async function createFarm(payload: Omit<Farm, 'id' | 'createdAt' | 'updatedAt'>): Promise<Farm> {
  const { data, error } = await supabase.from('farms').insert({ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select().single()
  if (error) throw new Error(error.message)
  return data as Farm
}

export async function updateFarm(id: string, payload: Partial<Farm>): Promise<Farm> {
  const { data, error } = await supabase.from('farms').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as Farm
}

export async function deleteFarm(id: string): Promise<void> {
  const { error } = await supabase.from('farms').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function fetchFieldsByFarm(farmId: string): Promise<Field[]> {
  const { data, error } = await supabase.from('fields').select('*').eq('farm_id', farmId).order('name')
  if (error) throw new Error(error.message)
  return (data ?? []) as Field[]
}

export async function createField(payload: Omit<Field, 'id' | 'createdAt' | 'updatedAt'>): Promise<Field> {
  const { data, error } = await supabase.from('fields').insert({ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select().single()
  if (error) throw new Error(error.message)
  return data as Field
}
