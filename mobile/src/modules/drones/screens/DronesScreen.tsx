import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useDrones } from '../hooks/useDrones'
import { colors, typography, spacing, borderRadius, shadows } from '../../../utils/theme'
import { LoadingSpinner, EmptyState } from '../../../components/ui'
import { DroneImage } from '../../../types'
import { formatDate } from '../../../utils/formatters'

const { width } = Dimensions.get('window')
const IMG_SIZE = (width - spacing.base * 2 - spacing.sm) / 2

export default function DronesScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { images, loading, refresh, remove } = useDrones()

  if (loading) return <LoadingSpinner fullScreen />

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>DRONES</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DroneUpload')} style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        onRefresh={refresh}
        refreshing={loading}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={<EmptyState icon="camera-outline" title="Nenhuma imagem de drone" message="Faça upload de imagens capturadas por drone para análise." actionLabel="Upload" onAction={() => navigation.navigate('DroneUpload')} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imgCard}
            onLongPress={() => Alert.alert('Excluir', 'Excluir esta imagem?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => remove(item.id) }])}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.img} />
            <View style={styles.imgOverlay}>
              <Text style={styles.imgDate} numberOfLines={1}>{formatDate(item.capturedAt)}</Text>
              {item.description && <Text style={styles.imgDesc} numberOfLines={1}>{item.description}</Text>}
            </View>
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
  addBtn: { backgroundColor: colors.secondary, borderRadius: borderRadius.lg, padding: spacing.sm },
  list: { padding: spacing.base, paddingBottom: spacing['3xl'] },
  row: { gap: spacing.sm, marginBottom: spacing.sm },
  imgCard: { width: IMG_SIZE, borderRadius: borderRadius.xl, overflow: 'hidden', ...shadows.sm },
  img: { width: IMG_SIZE, height: IMG_SIZE, backgroundColor: colors.backgroundAlt },
  imgOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: spacing.sm },
  imgDate: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.white },
  imgDesc: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.white + 'CC' },
})
