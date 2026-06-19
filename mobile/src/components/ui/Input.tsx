import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, typography, spacing, borderRadius } from '../../utils/theme'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ComponentProps<typeof Ionicons>['name']
  rightIcon?: React.ComponentProps<typeof Ionicons>['name']
  onRightIconPress?: () => void
  secureToggle?: boolean
}

export default function Input({
  label, error, hint, leftIcon, rightIcon, onRightIconPress,
  secureToggle = false, secureTextEntry, style, ...props
}: InputProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = secureToggle || secureTextEntry

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error ? styles.inputError : styles.inputDefault]}>
        {leftIcon && <Ionicons name={leftIcon} size={18} color={colors.textMuted} style={styles.iconLeft} />}
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithLeft, (rightIcon || secureToggle) && styles.inputWithRight, style]}
          placeholderTextColor={colors.textLight}
          secureTextEntry={secureToggle ? !visible : secureTextEntry}
          {...props}
        />
        {secureToggle ? (
          <TouchableOpacity onPress={() => setVisible((v) => !v)} style={styles.iconRight}>
            <Ionicons name={visible ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconRight}>
            <Ionicons name={rightIcon} size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.base },
  label: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text, marginBottom: spacing.xs },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: borderRadius.lg, backgroundColor: colors.white, minHeight: 48 },
  inputDefault: { borderColor: colors.border },
  inputError: { borderColor: colors.error },
  input: { flex: 1, fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text, paddingHorizontal: spacing.base, paddingVertical: spacing.sm },
  inputWithLeft: { paddingLeft: spacing.xs },
  inputWithRight: { paddingRight: spacing.xs },
  iconLeft: { marginLeft: spacing.md },
  iconRight: { marginRight: spacing.md },
  error: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.error, marginTop: spacing.xs },
  hint: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.textMuted, marginTop: spacing.xs },
})
