import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAIInsights } from '../hooks/useAIInsights'
import { colors, typography, spacing, borderRadius, shadows } from '../../../utils/theme'
import { LoadingSpinner, Button } from '../../../components/ui'

export default function AIInsightsScreen() {
  const insets = useSafeAreaInsets()
  const { insight, loading, error, generate } = useAIInsights()

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>IA AGRONÔMICA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!insight && !loading && !error && (
          <View style={styles.emptyBox}>
            <Ionicons name="sparkles" size={56} color={colors.primary} />
            <Text style={styles.emptyTitle}>Agrônomo Virtual</Text>
            <Text style={styles.emptyDesc}>
              Gere insights inteligentes baseados nos dados de campo, sensores e maquinário da sua fazenda.
            </Text>
            <Button label="Gerar análise" onPress={generate} style={styles.generateBtn} />
          </View>
        )}

        {loading && (
          <View style={styles.loadingBox}>
            <LoadingSpinner message="Analisando dados com inteligência artificial..." />
          </View>
        )}

        {error && !loading && (
          <View style={styles.errorBox}>
            <Ionicons name="warning-outline" size={40} color={colors.error} />
            <Text style={styles.errorText}>{error}</Text>
            <Button label="Tentar novamente" onPress={generate} variant="outline" style={styles.retryBtn} />
          </View>
        )}

        {insight && !loading && (
          <>
            <View style={styles.providerBadge}>
              <Ionicons name="sparkles" size={14} color={colors.primary} />
              <Text style={styles.providerText}>Gerado via {insight.provider.toUpperCase()}</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightText}>{insight.content}</Text>
            </View>
            <Button label="Nova análise" onPress={generate} variant="outline" style={styles.generateBtn} />
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.base, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize['2xl'], letterSpacing: 2, color: colors.text },
  content: { padding: spacing.base, paddingBottom: spacing['3xl'], flexGrow: 1 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: spacing['5xl'], gap: spacing.md },
  emptyTitle: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.text },
  emptyDesc: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22, paddingHorizontal: spacing.xl },
  generateBtn: { marginTop: spacing.md, minWidth: 200 },
  loadingBox: { paddingVertical: spacing['5xl'] },
  errorBox: { alignItems: 'center', paddingVertical: spacing['3xl'], gap: spacing.md },
  errorText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.error, textAlign: 'center' },
  retryBtn: { marginTop: spacing.sm },
  providerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: spacing.md },
  providerText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.primary, fontWeight: typography.fontWeight.semibold },
  insightCard: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.xl, ...shadows.md },
  insightText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text, lineHeight: 24 },
})
