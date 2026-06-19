import { useState } from 'react'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'

export function usePermissions() {
  const [locationGranted, setLocationGranted] = useState(false)
  const [cameraGranted, setCameraGranted] = useState(false)

  async function requestLocation(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync()
    const granted = status === 'granted'
    setLocationGranted(granted)
    return granted
  }

  async function requestCamera(): Promise<boolean> {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    const granted = status === 'granted'
    setCameraGranted(granted)
    return granted
  }

  async function requestMediaLibrary(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    return status === 'granted'
  }

  return { locationGranted, cameraGranted, requestLocation, requestCamera, requestMediaLibrary }
}
