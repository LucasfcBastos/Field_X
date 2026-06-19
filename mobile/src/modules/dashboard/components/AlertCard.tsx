import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Alert } from '../../../types'
import { colors, typography, spacing, borderRadius } from '../../../utils/theme'
import { formatRelativeTime } from '../../../utils/formatters'

const SEVERITY_COLORS = {
  info: colors.info, warning: colors.warning, error: colors.error, critical: '#7C3AED',
}

interface AlertCardProps {
  alert: Alert
  onPress?: () => void
}

export default function AlertCard({ alert, onPress }: AlertCardProps) {
  const accent = SEVERITY_COLORS[alert.severity] ?? colors.info
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, !alert.read && styles.unread]} activeOpacity={0.8}>
      <View style={[styles.indicator, { backgroundColor: accent }]} />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{alert.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{alert.message}</Text>
        <Text style={styles.time}>{formatRelativeTime(alert.createdAt)}</Text>
      </View>
      {!alert.read && <View style={[styles.dot, { backgroundColor: accent }]} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.lg, marginBottom: spacing.sm, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  unread: { borderColor: colors.primary + '40' },
  indicator: { width: 4 },
  body: { flex: 1, padding: spacing.md },
  title: { fontFamily: typography.fontFamily.body, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.base, color: colors.text },
  message: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.textMuted, marginTop: 2 },
  time: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.textLight, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, alignSelf: 'center', marginRight: spacing.md },
})
