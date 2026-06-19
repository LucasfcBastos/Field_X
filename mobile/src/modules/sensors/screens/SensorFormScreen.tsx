import React, { useState } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../../components/common'
import { Input, Button } from '../../../components/ui'
import { createSensor } from '../services/sensorsService'
import { useToast } from '../../../hooks/useToast'
import { colors, spacing } from '../../../utils/theme'

export default function SensorFormScreen() {
  const navigation = useNavigation()
  const toast = useToast()
  const [form, setForm] = useState({ name: '', type: '', manufacturer: '', measurementUnit: '', connectivity: '' })
  const [loading, setLoading] = useState(false)

  function update(field: keyof typeof form) { return (v: string) => setForm((f) => ({ ...f, [field]: v })) }

  async function handleSave() {
    if (!form.name.trim() || !form.type.trim()) { toast.error('Nome e tipo são obrigatórios'); return }
    setLoading(true)
    try {
      await createSensor({ farmId: '', name: form.name, type: form.type, manufacturer: form.manufacturer || undefined, measurementUnit: form.measurementUnit || undefined, connectivity: form.connectivity || undefined, status: 'active' })
      toast.success('Sensor cadastrado!')
      navigation.goBack()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="NOVO SENSOR" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Input label="Nome*" placeholder="Ex: Sensor Temperatura A" value={form.name} onChangeText={update('name')} leftIcon="hardware-chip-outline" />
        <Input label="Tipo*" placeholder="Ex: Temperatura, Umidade" value={form.type} onChangeText={update('type')} leftIcon="options-outline" />
        <Input label="Fabricante" placeholder="Ex: Agrosens" value={form.manufacturer} onChangeText={update('manufacturer')} leftIcon="business-outline" />
        <Input label="Unidade de medida" placeholder="Ex: °C, %, mm" value={form.measurementUnit} onChangeText={update('measurementUnit')} leftIcon="speedometer-outline" />
        <Input label="Conectividade" placeholder="Ex: LoRa, Wi-Fi, 4G" value={form.connectivity} onChangeText={update('connectivity')} leftIcon="wifi-outline" />
        <Button label="Salvar sensor" onPress={handleSave} loading={loading} fullWidth style={styles.btn} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, backgroundColor: colors.background, flexGrow: 1 },
  btn: { marginTop: spacing.lg },
})
