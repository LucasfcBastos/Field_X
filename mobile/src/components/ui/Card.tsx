import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { colors, borderRadius, spacing, shadows } from '../../utils/theme'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  variant?: 'default' | 'flat' | 'outline'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({ children, style, variant = 'default', padding = 'md' }: CardProps) {
  return (
    <View style={[styles.base, styles[variant], styles[`pad_${padding}`], style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: { borderRadius: borderRadius.xl, backgroundColor: colors.white },
  default: { ...shadows.md },
  flat: { backgroundColor: colors.backgroundAlt },
  outline: { borderWidth: 1, borderColor: colors.border },
  pad_none: { padding: 0 },
  pad_sm: { padding: spacing.sm },
  pad_md: { padding: spacing.base },
  pad_lg: { padding: spacing.xl },
})
