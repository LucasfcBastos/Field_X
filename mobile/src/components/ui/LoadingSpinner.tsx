import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { colors, typography } from '../../utils/theme'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  message?: string
  size?: 'small' | 'large'
}

export default function LoadingSpinner({ fullScreen = false, message, size = 'large' }: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size={size} color={colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    )
  }
  return (
    <View style={styles.inline}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  inline: { paddingVertical: 32, justifyContent: 'center', alignItems: 'center' },
  message: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, marginTop: 12 },
})
