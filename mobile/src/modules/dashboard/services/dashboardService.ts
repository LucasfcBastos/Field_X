import { supabase } from '../../../services/supabase/client'
import { DashboardSummary, Alert } from '../../../types'

export async function fetchDashboardSummary(userId: string): Promise<DashboardSummary> {
  const [farmsRes, sensorsRes, machineryRes, alertsRes] = await Promise.all([
    supabase.from('farms').select('id', { count: 'exact' }).eq('user_id', userId),
    supabase.from('sensors').select('id', { count: 'exact' }).eq('status', 'active'),
    supabase.from('machinery').select('id', { count: 'exact' }).eq('status', 'active'),
    supabase.from('alerts').select('id', { count: 'exact' }).eq('user_id', userId).eq('read', false),
  ])

  const fieldsRes = await supabase.from('fields').select('id', { count: 'exact' })

  return {
    totalFarms: farmsRes.count ?? 0,
    totalFields: fieldsRes.count ?? 0,
    activeSensors: sensorsRes.count ?? 0,
    connectedMachinery: machineryRes.count ?? 0,
    pendingAlerts: alertsRes.count ?? 0,
  }
}

export async function fetchRecentAlerts(userId: string, limit = 5): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return (data ?? []) as Alert[]
}

export async function markAlertRead(alertId: string): Promise<void> {
  const { error } = await supabase.from('alerts').update({ read: true }).eq('id', alertId)
  if (error) throw new Error(error.message)
}
