import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { fetchDashboardSummary, fetchRecentAlerts } from '../services/dashboardService'
import { DashboardSummary, Alert } from '../../../types'

export function useDashboard() {
  const { supabaseUser } = useAuth()
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!supabaseUser) return
    setLoading(true)
    setError(null)
    try {
      const [s, a] = await Promise.all([
        fetchDashboardSummary(supabaseUser.id),
        fetchRecentAlerts(supabaseUser.id),
      ])
      setSummary(s)
      setAlerts(a)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [supabaseUser])

  useEffect(() => { load() }, [load])

  return { summary, alerts, loading, error, refresh: load }
}
