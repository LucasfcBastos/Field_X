import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { colors, typography, spacing } from '../../utils/theme'

interface HeaderProps {
  title: string
  showBack?: boolean
  rightAction?: { icon: React.ComponentProps<typeof Ionicons>['name']; onPress: () => void }
}

export default function Header({ title, showBack = false, rightAction }: HeaderProps) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {rightAction ? (
          <TouchableOpacity onPress={rightAction.onPress} style={styles.iconBtn}>
            <Ionicons name={rightAction.icon} size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.base },
  title: { flex: 1, textAlign: 'center', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize['2xl'], letterSpacing: 2, color: colors.text },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
})
