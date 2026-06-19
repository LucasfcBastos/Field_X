import { supabase } from '../../../services/supabase/client'
import { Sensor, SensorReading } from '../../../types'

export async function fetchSensors(farmId?: string): Promise<Sensor[]> {
  let query = supabase.from('sensors').select('*').order('name')
  if (farmId) query = query.eq('farm_id', farmId)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []) as Sensor[]
}

export async function createSensor(payload: Omit<Sensor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sensor> {
  const { data, error } = await supabase.from('sensors').insert({ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select().single()
  if (error) throw new Error(error.message)
  return data as Sensor
}

export async function updateSensor(id: string, payload: Partial<Sensor>): Promise<Sensor> {
  const { data, error } = await supabase.from('sensors').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) throw new Error(error.message)
  return data as Sensor
}

export async function deleteSensor(id: string): Promise<void> {
  const { error } = await supabase.from('sensors').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function fetchSensorReadings(sensorId: string, limit = 20): Promise<SensorReading[]> {
  const { data, error } = await supabase.from('sensor_readings').select('*').eq('sensor_id', sensorId).order('recorded_at', { ascending: false }).limit(limit)
  if (error) throw new Error(error.message)
  return (data ?? []) as SensorReading[]
}
