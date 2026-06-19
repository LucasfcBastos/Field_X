import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../navigation/types'
import { useAuth } from '../../../contexts/AuthContext'
import { useToast } from '../../../hooks/useToast'
import { validateSignUp } from '../../../utils/validators'
import { colors, typography, spacing } from '../../../utils/theme'
import { Input, Button } from '../../../components/ui'

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Register'>

export default function RegisterScreen() {
  const navigation = useNavigation<Nav>()
  const { signUp } = useAuth()
  const toast = useToast()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof typeof form) {
    return (value: string) => setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleRegister() {
    const validation = validateSignUp(form.name, form.email, form.password, form.confirm)
    if (!validation.valid) { setError(validation.error!); return }
    setError('')
    setLoading(true)
    try {
      await signUp(form.email.trim().toLowerCase(), form.password, form.name.trim())
      toast.success('Conta criada! Verifique seu e-mail para confirmar.')
      navigation.navigate('Login')
    } catch (err: any) {
      setError(err.message ?? 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.heading}>Criar conta</Text>

          <Input label="Nome completo" placeholder="João Silva" value={form.name} onChangeText={update('name')} leftIcon="person-outline" />
          <Input label="E-mail" placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={update('email')} leftIcon="mail-outline" />
          <Input label="Senha" placeholder="Mínimo 8 caracteres" value={form.password} onChangeText={update('password')} leftIcon="lock-closed-outline" secureToggle />
          <Input label="Confirmar senha" placeholder="Repita sua senha" value={form.confirm} onChangeText={update('confirm')} leftIcon="lock-closed-outline" secureToggle />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button label="Criar conta" onPress={handleRegister} loading={loading} fullWidth style={styles.btn} />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: spacing.xl },
  form: { backgroundColor: colors.white, borderRadius: 20, padding: spacing.xl, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  heading: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.text, marginBottom: spacing.xl, textAlign: 'center' },
  errorText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.error, marginBottom: spacing.sm, textAlign: 'center' },
  btn: { marginTop: spacing.sm },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  loginText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted },
  link: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.primary, fontWeight: typography.fontWeight.semibold },
})
