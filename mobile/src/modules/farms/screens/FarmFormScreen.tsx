import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header, SafeContainer } from '../../../components/common'
import { Input, Button } from '../../../components/ui'
import { useAuth } from '../../../contexts/AuthContext'
import { createFarm } from '../services/farmsService'
import { useToast } from '../../../hooks/useToast'
import { colors, spacing } from '../../../utils/theme'

export default function FarmFormScreen() {
  const navigation = useNavigation()
  const { supabaseUser } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ name: '', location: '', totalAreaHectares: '' })
  const [loading, setLoading] = useState(false)

  function update(field: keyof typeof form) { return (v: string) => setForm((f) => ({ ...f, [field]: v })) }

  async function handleSave() {
    if (!form.name.trim()) { toast.error('Nome da fazenda é obrigatório'); return }
    if (!supabaseUser) return
    setLoading(true)
    try {
      await createFarm({ userId: supabaseUser.id, name: form.name.trim(), location: form.location || undefined, totalAreaHectares: form.totalAreaHectares ? parseFloat(form.totalAreaHectares) : undefined })
      toast.success('Fazenda cadastrada!')
      navigation.goBack()
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="NOVA FAZENDA" showBack />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Input label="Nome da fazenda*" placeholder="Ex: Fazenda Santa Maria" value={form.name} onChangeText={update('name')} leftIcon="leaf-outline" />
        <Input label="Localização" placeholder="Ex: Goiás, GO" value={form.location} onChangeText={update('location')} leftIcon="location-outline" />
        <Input label="Área total (hectares)" placeholder="Ex: 500" keyboardType="numeric" value={form.totalAreaHectares} onChangeText={update('totalAreaHectares')} leftIcon="resize-outline" />
        <Button label="Salvar fazenda" onPress={handleSave} loading={loading} fullWidth style={styles.btn} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, backgroundColor: colors.background, flexGrow: 1 },
  btn: { marginTop: spacing.lg },
})
