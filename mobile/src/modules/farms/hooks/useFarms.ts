import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { fetchFarms, deleteFarm } from '../services/farmsService'
import { Farm } from '../../../types'

export function useFarms() {
  const { supabaseUser } = useAuth()
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!supabaseUser) return
    setLoading(true)
    setError(null)
    try {
      setFarms(await fetchFarms(supabaseUser.id))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [supabaseUser])

  useEffect(() => { load() }, [load])

  async function removeFarm(id: string) {
    await deleteFarm(id)
    setFarms((prev) => prev.filter((f) => f.id !== id))
  }

  return { farms, loading, error, refresh: load, removeFarm }
}
