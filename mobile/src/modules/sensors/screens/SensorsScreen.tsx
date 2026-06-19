import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useSensors } from '../hooks/useSensors'
import { colors, typography, spacing, borderRadius, shadows } from '../../../utils/theme'
import { LoadingSpinner, EmptyState, Badge } from '../../../components/ui'
import { Sensor } from '../../../types'

const STATUS_VARIANT: Record<Sensor['status'], 'success' | 'warning' | 'error'> = {
  active: 'success', maintenance: 'warning', inactive: 'error',
}
const STATUS_LABEL: Record<Sensor['status'], string> = {
  active: 'Ativo', maintenance: 'Manutenção', inactive: 'Inativo',
}

export default function SensorsScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { sensors, loading, refresh, removeSensor } = useSensors()

  function confirmDelete(sensor: Sensor) {
    Alert.alert('Excluir sensor', `Deseja excluir "${sensor.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeSensor(sensor.id) },
    ])
  }

  if (loading) return <LoadingSpinner fullScreen />

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>DISPOSITIVOS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SensorForm')} style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sensors}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        onRefresh={refresh}
        refreshing={loading}
        ListEmptyComponent={
          <EmptyState icon="hardware-chip-outline" title="Nenhum sensor cadastrado" message="Adicione sensores IoT para monitorar sua fazenda." actionLabel="Adicionar sensor" onAction={() => navigation.navigate('SensorForm')} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onLongPress={() => confirmDelete(item)} activeOpacity={0.8}>
            <View style={styles.cardIcon}><Ionicons name="hardware-chip" size={20} color={colors.info} /></View>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardType}>{item.type}</Text>
              {item.batteryLevel !== undefined && <Text style={styles.cardSub}>🔋 {item.batteryLevel}%</Text>}
            </View>
            <Badge label={STATUS_LABEL[item.status]} variant={STATUS_VARIANT[item.status]} />
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
  addBtn: { backgroundColor: colors.info, borderRadius: borderRadius.lg, padding: spacing.sm },
  list: { padding: spacing.base, paddingBottom: spacing['3xl'] },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.base, marginBottom: spacing.sm, ...shadows.sm },
  cardIcon: { width: 40, height: 40, borderRadius: borderRadius.lg, backgroundColor: colors.info + '15', justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  cardBody: { flex: 1 },
  cardName: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.semibold, color: colors.text },
  cardType: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.textMuted, marginTop: 2 },
  cardSub: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.textLight, marginTop: 2 },
})
