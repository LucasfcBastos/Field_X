import { supabase } from '../../../services/supabase/client'
import { DroneImage } from '../../../types'

export async function fetchDroneImages(farmId?: string): Promise<DroneImage[]> {
  let query = supabase.from('drone_images').select('*').order('captured_at', { ascending: false })
  if (farmId) query = query.eq('farm_id', farmId)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []) as DroneImage[]
}

export async function uploadDroneImage(
  farmId: string, uri: string, description?: string
): Promise<DroneImage> {
  const fileName = `drone_${Date.now()}.jpg`
  const filePath = `drones/${farmId}/${fileName}`

  const response = await fetch(uri)
  const blob = await response.blob()

  const { error: uploadError } = await supabase.storage
    .from('field-images').upload(filePath, blob, { contentType: 'image/jpeg' })
  if (uploadError) throw new Error(uploadError.message)

  const { data: { publicUrl } } = supabase.storage.from('field-images').getPublicUrl(filePath)

  const { data, error } = await supabase.from('drone_images').insert({
    farm_id: farmId, image_url: publicUrl, description, captured_at: new Date().toISOString(), created_at: new Date().toISOString(),
  }).select().single()
  if (error) throw new Error(error.message)
  return data as DroneImage
}

export async function deleteDroneImage(id: string): Promise<void> {
  const { error } = await supabase.from('drone_images').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
