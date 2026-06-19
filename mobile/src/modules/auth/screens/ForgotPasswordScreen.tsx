import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { useToast } from '../../../hooks/useToast'
import { isValidEmail } from '../../../utils/validators'
import { colors, typography, spacing } from '../../../utils/theme'
import { Input, Button } from '../../../components/ui'
import { Header } from '../../../components/common'

export default function ForgotPasswordScreen() {
  const navigation = useNavigation()
  const { resetPassword } = useAuth()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleReset() {
    if (!isValidEmail(email)) { toast.error('Insira um e-mail válido'); return }
    setLoading(true)
    try {
      await resetPassword(email.trim().toLowerCase())
      setSent(true)
      toast.success('E-mail de recuperação enviado!')
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao enviar e-mail.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="RECUPERAR SENHA" showBack />
      <View style={styles.content}>
        {sent ? (
          <View style={styles.sentBox}>
            <Text style={styles.sentTitle}>E-mail enviado!</Text>
            <Text style={styles.sentMsg}>Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</Text>
            <Button label="Voltar ao login" onPress={() => navigation.goBack()} style={{ marginTop: spacing.xl }} />
          </View>
        ) : (
          <>
            <Text style={styles.desc}>Informe seu e-mail para receber o link de recuperação.</Text>
            <Input label="E-mail" placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} leftIcon="mail-outline" />
            <Button label="Enviar link" onPress={handleReset} loading={loading} fullWidth style={{ marginTop: spacing.sm }} />
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.xl },
  desc: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, marginBottom: spacing.xl },
  sentBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sentTitle: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.success, marginBottom: spacing.base },
  sentMsg: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, textAlign: 'center', lineHeight: 22 },
})
