import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMapLocation } from '../hooks/useMapLocation'
import { colors, typography } from '../../../utils/theme'
import { LoadingSpinner } from '../../../components/ui'

export default function MapScreen() {
  const insets = useSafeAreaInsets()
  const { region, loading, error } = useMapLocation()

  if (loading) return <LoadingSpinner fullScreen message="Obtendo localização..." />

  if (error) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.header}><Text style={styles.title}>MAPA</Text></View>
        <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>
      </View>
    )
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}><Text style={styles.title}>MAPA</Text></View>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        region={region!}
        showsUserLocation
        showsMyLocationButton
        showsCompass
      >
        {region && (
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Minha localização" />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontFamily: typography.fontFamily.heading, fontSize: 28, letterSpacing: 2, color: colors.text },
  map: { flex: 1 },
  errorBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { fontFamily: typography.fontFamily.body, fontSize: 16, color: colors.error, textAlign: 'center' },
})
