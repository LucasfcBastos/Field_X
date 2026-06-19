import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, typography, spacing, borderRadius, shadows } from '../../../utils/theme'

interface StatCardProps {
  icon: React.ComponentProps<typeof Ionicons>['name']
  label: string
  value: string | number
  color?: string
}

export default function StatCard({ icon, label, value, color = colors.primary }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.base, alignItems: 'center', ...shadows.md, minWidth: 90 },
  iconWrap: { width: 44, height: 44, borderRadius: borderRadius.lg, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  value: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.text },
  label: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
})
