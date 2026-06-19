import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export interface MapRegion {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export function useMapLocation() {
  const [region, setRegion] = useState<MapRegion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let subscriber: Location.LocationSubscription | null = null

    async function start() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permissão de localização negada.')
        setLoading(false)
        return
      }

      const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
      setRegion({
        latitude: initial.coords.latitude,
        longitude: initial.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
      setLoading(false)

      subscriber = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) =>
          setRegion((prev) =>
            prev
              ? { ...prev, latitude: loc.coords.latitude, longitude: loc.coords.longitude }
              : { latitude: loc.coords.latitude, longitude: loc.coords.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }
          )
      )
    }

    start()
    return () => { subscriber?.remove() }
  }, [])

  return { region, loading, error }
}
