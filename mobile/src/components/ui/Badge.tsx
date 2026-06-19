import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, borderRadius, spacing, typography } from '../../utils/theme'

type Variant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface BadgeProps {
  label: string
  variant?: Variant
  dot?: boolean
}

const VARIANTS: Record<Variant, { bg: string; text: string }> = {
  success: { bg: '#DCFCE7', text: colors.success },
  warning: { bg: '#FEF3C7', text: colors.warning },
  error: { bg: '#FEE2E2', text: colors.error },
  info: { bg: '#DBEAFE', text: colors.info },
  neutral: { bg: colors.backgroundAlt, text: colors.textMuted },
}

export default function Badge({ label, variant = 'neutral', dot = false }: BadgeProps) {
  const { bg, text } = VARIANTS[variant]
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {dot && <View style={[styles.dot, { backgroundColor: text }]} />}
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.full, alignSelf: 'flex-start' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
  label: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold },
})
