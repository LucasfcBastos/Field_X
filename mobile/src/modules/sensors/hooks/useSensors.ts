import { useState, useEffect, useCallback } from 'react'
import { fetchSensors, deleteSensor } from '../services/sensorsService'
import { Sensor } from '../../../types'

export function useSensors(farmId?: string) {
  const [sensors, setSensors] = useState<Sensor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setSensors(await fetchSensors(farmId)) }
    catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }, [farmId])

  useEffect(() => { load() }, [load])

  async function removeSensor(id: string) {
    await deleteSensor(id)
    setSensors((prev) => prev.filter((s) => s.id !== id))
  }

  return { sensors, loading, error, refresh: load, removeSensor }
}
