import React from 'react'
import { ScrollView, View, StyleSheet, ViewStyle, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../utils/theme'

interface SafeContainerProps {
  children: React.ReactNode
  scrollable?: boolean
  style?: ViewStyle
  contentStyle?: ViewStyle
  refreshing?: boolean
  onRefresh?: () => void
}

export default function SafeContainer({
  children, scrollable = false, style, contentStyle, refreshing = false, onRefresh,
}: SafeContainerProps) {
  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safe, style]} edges={['left', 'right', 'bottom']}>
        <ScrollView
          contentContainerStyle={[styles.scroll, contentStyle]}
          showsVerticalScrollIndicator={false}
          refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} /> : undefined}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={[styles.safe, style]} edges={['left', 'right', 'bottom']}>
      <View style={[styles.container, contentStyle]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
})
