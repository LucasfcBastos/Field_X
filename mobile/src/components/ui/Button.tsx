import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors, borderRadius, spacing, typography } from '../../utils/theme'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: Variant
  size?: Size
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export default function Button({
  label, onPress, variant = 'primary', size = 'md',
  loading = false, disabled = false, fullWidth = false, style, textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[styles.base, styles[variant], styles[`size_${size}`], fullWidth && styles.fullWidth, isDisabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.label, styles[`label_${variant}`], styles[`labelSize_${size}`], textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius.lg, borderWidth: 0 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.error },
  size_sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, minHeight: 36 },
  size_md: { paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.base, minHeight: 44 },
  size_lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, minHeight: 52 },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  label: { fontFamily: typography.fontFamily.body, fontWeight: typography.fontWeight.semibold },
  label_primary: { color: colors.white },
  label_secondary: { color: colors.white },
  label_outline: { color: colors.primary },
  label_ghost: { color: colors.primary },
  label_danger: { color: colors.white },
  labelSize_sm: { fontSize: typography.fontSize.sm },
  labelSize_md: { fontSize: typography.fontSize.base },
  labelSize_lg: { fontSize: typography.fontSize.md },
})
