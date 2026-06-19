import { useState, useEffect, useCallback } from 'react'
import { fetchDroneImages, deleteDroneImage } from '../services/dronesService'
import { DroneImage } from '../../../types'

export function useDrones(farmId?: string) {
  const [images, setImages] = useState<DroneImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setImages(await fetchDroneImages(farmId)) }
    catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }, [farmId])

  useEffect(() => { load() }, [load])

  async function remove(id: string) {
    await deleteDroneImage(id)
    setImages((prev) => prev.filter((i) => i.id !== id))
  }

  return { images, loading, error, refresh: load, remove }
}
