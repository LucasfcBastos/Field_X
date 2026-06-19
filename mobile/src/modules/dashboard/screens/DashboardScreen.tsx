import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../../../contexts/AuthContext'
import { useDashboard } from '../hooks/useDashboard'
import { colors, typography, spacing } from '../../../utils/theme'
import { LoadingSpinner } from '../../../components/ui'
import StatCard from '../components/StatCard'
import AlertCard from '../components/AlertCard'

export default function DashboardScreen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth()
  const { summary, alerts, loading, refresh } = useDashboard()

  if (loading) return <LoadingSpinner fullScreen message="Carregando dashboard..." />

  const greeting = user?.name ? `Olá, ${user.name.split(' ')[0]}` : 'Olá'

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.base }]}
      refreshControl={undefined}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting} 👋</Text>
        <Text style={styles.farmName}>{user?.farmName ?? 'Sua Fazenda'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Resumo</Text>
      <View style={styles.statsGrid}>
        <StatCard icon="leaf-outline" label="Fazendas" value={summary?.totalFarms ?? 0} color={colors.primary} />
        <StatCard icon="grid-outline" label="Talhões" value={summary?.totalFields ?? 0} color={colors.secondary} />
        <StatCard icon="hardware-chip-outline" label="Sensores" value={summary?.activeSensors ?? 0} color={colors.info} />
        <StatCard icon="construct-outline" label="Máquinas" value={summary?.connectedMachinery ?? 0} color={colors.warning} />
      </View>

      {alerts.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Alertas recentes</Text>
          {alerts.map((a) => <AlertCard key={a.id} alert={a} />)}
        </>
      )}

      {alerts.length === 0 && (
        <View style={styles.noAlerts}>
          <Text style={styles.noAlertsText}>✅ Nenhum alerta pendente</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.base, paddingBottom: spacing['3xl'] },
  header: { marginBottom: spacing.xl },
  greeting: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.text },
  farmName: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, marginTop: 2 },
  sectionTitle: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.text, marginBottom: spacing.md, marginTop: spacing.base },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  noAlerts: { backgroundColor: colors.backgroundAlt, borderRadius: 12, padding: spacing.base, marginTop: spacing.base },
  noAlertsText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, textAlign: 'center' },
})
