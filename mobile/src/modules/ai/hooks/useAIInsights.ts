import { useState, useCallback } from 'react'
import { generateInsight, buildAgronomyPrompt, AIResponse } from '../services/aiProvider'
import { supabase } from '../../../services/supabase/client'
import { useAuth } from '../../../contexts/AuthContext'

export function useAIInsights() {
  const { supabaseUser } = useAuth()
  const [insight, setInsight] = useState<AIResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async () => {
    if (!supabaseUser) return
    setLoading(true)
    setError(null)
    setInsight(null)

    try {
      const [opsRes, sensorsRes, machineryRes] = await Promise.all([
        supabase.from('operations').select('*').eq('user_id', supabaseUser.id).order('date', { ascending: false }).limit(10),
        supabase.from('sensors').select('name,type,status').limit(10),
        supabase.from('machinery_telemetry').select('*').order('recorded_at', { ascending: false }).limit(5),
      ])

      const request = buildAgronomyPrompt({
        operations: opsRes.data ?? [],
        sensors: sensorsRes.data ?? [],
        machinery: machineryRes.data ?? [],
      })

      const response = await generateInsight(request)
      setInsight(response)
    } catch (err: any) {
      setError(err.message ?? 'Erro ao gerar insights.')
    } finally {
      setLoading(false)
    }
  }, [supabaseUser])

  return { insight, loading, error, generate }
}
