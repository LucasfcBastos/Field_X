import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Header } from '../../../components/common'
import { Button, Input } from '../../../components/ui'
import { uploadDroneImage } from '../services/dronesService'
import { useToast } from '../../../hooks/useToast'
import { usePermissions } from '../../../hooks/usePermissions'
import { colors, typography, spacing, borderRadius } from '../../../utils/theme'
import { Ionicons } from '@expo/vector-icons'

export default function DroneUploadScreen() {
  const navigation = useNavigation()
  const toast = useToast()
  const { requestMediaLibrary } = usePermissions()
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function pickImage() {
    const granted = await requestMediaLibrary()
    if (!granted) { toast.error('Permissão de galeria negada'); return }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'images', quality: 0.8, allowsEditing: true })
    if (!result.canceled && result.assets[0]) setImageUri(result.assets[0].uri)
  }

  async function handleUpload() {
    if (!imageUri) { toast.error('Selecione uma imagem'); return }
    setLoading(true)
    try {
      await uploadDroneImage('', imageUri, description || undefined)
      toast.success('Imagem enviada com sucesso!')
      navigation.goBack()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="UPLOAD DRONE" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.picker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.preview} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="cloud-upload-outline" size={48} color={colors.primary} />
              <Text style={styles.pickerText}>Toque para selecionar imagem</Text>
            </View>
          )}
        </TouchableOpacity>
        <Input label="Descrição" placeholder="Ex: Talhão Norte — levantamento de pragas" value={description} onChangeText={setDescription} leftIcon="document-text-outline" />
        <Button label="Enviar imagem" onPress={handleUpload} loading={loading} fullWidth style={styles.btn} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, backgroundColor: colors.background, flexGrow: 1 },
  picker: { borderRadius: borderRadius.xl, borderWidth: 2, borderColor: colors.primary, borderStyle: 'dashed', overflow: 'hidden', marginBottom: spacing.xl, minHeight: 200 },
  preview: { width: '100%', height: 220 },
  placeholder: { height: 200, justifyContent: 'center', alignItems: 'center', gap: spacing.sm },
  pickerText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.primary },
  btn: { marginTop: spacing.sm },
})
