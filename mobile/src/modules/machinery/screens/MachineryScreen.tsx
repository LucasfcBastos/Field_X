import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useMachinery } from '../hooks/useMachinery'
import { colors, typography, spacing, borderRadius, shadows } from '../../../utils/theme'
import { LoadingSpinner, EmptyState, Badge } from '../../../components/ui'
import { Machinery } from '../../../types'
import { formatHours } from '../../../utils/formatters'

const STATUS_VARIANT: Record<Machinery['status'], 'success' | 'warning' | 'error'> = {
  active: 'success', maintenance: 'warning', inactive: 'error',
}

export default function MachineryScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { machinery, loading, refresh, remove } = useMachinery()

  if (loading) return <LoadingSpinner fullScreen />

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>MAQUINÁRIO</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MachineryForm')} style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={machinery}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        onRefresh={refresh}
        refreshing={loading}
        ListEmptyComponent={<EmptyState icon="construct-outline" title="Nenhum maquinário cadastrado" actionLabel="Adicionar" onAction={() => navigation.navigate('MachineryForm')} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onLongPress={() => Alert.alert('Excluir', `Excluir "${item.name}"?`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => remove(item.id) }])} activeOpacity={0.8}>
            <View style={styles.cardIcon}><Ionicons name="construct" size={20} color={colors.warning} /></View>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardType}>{item.type} {item.model ? `• ${item.model}` : ''}</Text>
              {item.hoursUsed !== undefined && <Text style={styles.cardSub}>⏱ {formatHours(item.hoursUsed)}</Text>}
            </View>
            <Badge label={item.status === 'active' ? 'Ativo' : item.status === 'maintenance' ? 'Manutenção' : 'Inativo'} variant={STATUS_VARIANT[item.status]} />
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
  addBtn: { backgroundColor: colors.warning, borderRadius: borderRadius.lg, padding: spacing.sm },
  list: { padding: spacing.base, paddingBottom: spacing['3xl'] },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.base, marginBottom: spacing.sm, ...shadows.sm },
  cardIcon: { width: 40, height: 40, borderRadius: borderRadius.lg, backgroundColor: colors.warning + '15', justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  cardBody: { flex: 1 },
  cardName: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text },
  cardType: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.textMuted, marginTop: 2 },
  cardSub: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.textLight, marginTop: 2 },
})
