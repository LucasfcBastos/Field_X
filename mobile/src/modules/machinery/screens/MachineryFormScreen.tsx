import React, { useState } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../../components/common'
import { Input, Button } from '../../../components/ui'
import { createMachinery } from '../services/machineryService'
import { useToast } from '../../../hooks/useToast'
import { colors, spacing } from '../../../utils/theme'

export default function MachineryFormScreen() {
  const navigation = useNavigation()
  const toast = useToast()
  const [form, setForm] = useState({ name: '', type: '', manufacturer: '', model: '', year: '', hoursUsed: '', sprayVolume: '' })
  const [loading, setLoading] = useState(false)

  function update(field: keyof typeof form) { return (v: string) => setForm((f) => ({ ...f, [field]: v })) }

  async function handleSave() {
    if (!form.name.trim() || !form.type.trim()) { toast.error('Nome e tipo são obrigatórios'); return }
    setLoading(true)
    try {
      await createMachinery({ farmId: '', name: form.name, type: form.type, manufacturer: form.manufacturer || undefined, model: form.model || undefined, year: form.year ? parseInt(form.year) : undefined, hoursUsed: form.hoursUsed ? parseFloat(form.hoursUsed) : undefined, sprayVolume: form.sprayVolume ? parseFloat(form.sprayVolume) : undefined, status: 'active' })
      toast.success('Maquinário cadastrado!')
      navigation.goBack()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="NOVO MAQUINÁRIO" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Input label="Nome*" placeholder="Ex: Trator John Deere" value={form.name} onChangeText={update('name')} leftIcon="construct-outline" />
        <Input label="Tipo*" placeholder="Ex: Trator, Pulverizador" value={form.type} onChangeText={update('type')} leftIcon="options-outline" />
        <Input label="Fabricante" placeholder="Ex: John Deere, AGCO" value={form.manufacturer} onChangeText={update('manufacturer')} leftIcon="business-outline" />
        <Input label="Modelo" placeholder="Ex: 5078E" value={form.model} onChangeText={update('model')} leftIcon="pricetag-outline" />
        <Input label="Ano de fabricação" placeholder="Ex: 2020" keyboardType="numeric" value={form.year} onChangeText={update('year')} leftIcon="calendar-outline" />
        <Input label="Horas de uso" placeholder="Ex: 1200" keyboardType="numeric" value={form.hoursUsed} onChangeText={update('hoursUsed')} leftIcon="time-outline" />
        <Input label="Volume de pulverização (L)" placeholder="Ex: 2000" keyboardType="numeric" value={form.sprayVolume} onChangeText={update('sprayVolume')} leftIcon="water-outline" />
        <Button label="Salvar maquinário" onPress={handleSave} loading={loading} fullWidth style={styles.btn} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, backgroundColor: colors.background, flexGrow: 1 },
  btn: { marginTop: spacing.lg },
})
