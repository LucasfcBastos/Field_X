import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, typography, spacing } from '../../utils/theme'
import Button from './Button'

interface EmptyStateProps {
  icon?: React.ComponentProps<typeof Ionicons>['name']
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ icon = 'leaf-outline', title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={colors.border} />
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} style={styles.button} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing['2xl'] },
  title: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold, color: colors.text, marginTop: spacing.base, textAlign: 'center' },
  message: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, marginTop: spacing.sm, textAlign: 'center', lineHeight: 22 },
  button: { marginTop: spacing.xl },
})
