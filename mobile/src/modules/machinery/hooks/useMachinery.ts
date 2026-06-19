import { useState, useEffect, useCallback } from 'react'
import { fetchMachinery, deleteMachinery } from '../services/machineryService'
import { Machinery } from '../../../types'

export function useMachinery(farmId?: string) {
  const [machinery, setMachinery] = useState<Machinery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setMachinery(await fetchMachinery(farmId)) }
    catch (err: any) { setError(err.message) }
    finally { setLoading(false) }
  }, [farmId])

  useEffect(() => { load() }, [load])

  async function remove(id: string) {
    await deleteMachinery(id)
    setMachinery((prev) => prev.filter((m) => m.id !== id))
  }

  return { machinery, loading, error, refresh: load, remove }
}
