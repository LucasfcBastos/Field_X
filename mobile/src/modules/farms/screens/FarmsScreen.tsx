import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useFarms } from '../hooks/useFarms'
import { colors, typography, spacing, borderRadius, shadows } from '../../../utils/theme'
import { LoadingSpinner, EmptyState, Badge } from '../../../components/ui'
import { Farm } from '../../../types'
import { formatArea } from '../../../utils/formatters'

export default function FarmsScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { farms, loading, refresh, removeFarm } = useFarms()

  function confirmDelete(farm: Farm) {
    Alert.alert('Excluir fazenda', `Deseja excluir "${farm.name}"? Esta ação não pode ser desfeita.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeFarm(farm.id) },
    ])
  }

  if (loading) return <LoadingSpinner fullScreen />

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>FAZENDAS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FarmForm')} style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={farms}
        keyExtractor={(f) => f.id}
        contentContainerStyle={styles.list}
        onRefresh={refresh}
        refreshing={loading}
        ListEmptyComponent={
          <EmptyState icon="leaf-outline" title="Nenhuma fazenda cadastrada" message="Adicione sua primeira fazenda para começar." actionLabel="Adicionar fazenda" onAction={() => navigation.navigate('FarmForm')} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FarmDetail', { farmId: item.id })} onLongPress={() => confirmDelete(item)} activeOpacity={0.8}>
            <View style={styles.cardIcon}><Ionicons name="leaf" size={20} color={colors.primary} /></View>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{item.name}</Text>
              {item.totalAreaHectares && <Text style={styles.cardSub}>{formatArea(item.totalAreaHectares)}</Text>}
              {item.location && <Text style={styles.cardSub} numberOfLines={1}>{item.location}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.base, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize['2xl'], letterSpacing: 2, color: colors.text },
  addBtn: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: spacing.sm },
  list: { padding: spacing.base, paddingBottom: spacing['3xl'] },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.base, marginBottom: spacing.sm, ...shadows.sm },
  cardIcon: { width: 40, height: 40, borderRadius: borderRadius.lg, backgroundColor: colors.primary + '15', justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  cardBody: { flex: 1 },
  cardName: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text },
  cardSub: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.textMuted, marginTop: 2 },
})
