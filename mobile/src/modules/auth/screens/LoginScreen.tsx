import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../navigation/types'
import { useAuth } from '../../../contexts/AuthContext'
import { useToast } from '../../../hooks/useToast'
import { validateSignIn } from '../../../utils/validators'
import { colors, typography, spacing } from '../../../utils/theme'
import { Input, Button } from '../../../components/ui'

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>

export default function LoginScreen() {
  const navigation = useNavigation<Nav>()
  const { signIn } = useAuth()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleLogin() {
    const validation = validateSignIn(email, password)
    if (!validation.valid) {
      setErrors({ general: validation.error! })
      return
    }
    setErrors({})
    setLoading(true)
    try {
      await signIn(email.trim().toLowerCase(), password)
    } catch (err: any) {
      toast.error(err.message ?? 'Erro ao entrar. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.headerBlock}>
          <Text style={styles.title}>FIELD X</Text>
          <Text style={styles.subtitle}>Seu agrônomo virtual inteligente</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.heading}>Entrar</Text>

          <Input
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            leftIcon="mail-outline"
            error={errors.email}
          />

          <Input
            label="Senha"
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            leftIcon="lock-closed-outline"
            secureToggle
            error={errors.password}
          />

          {errors.general ? <Text style={styles.errorText}>{errors.general}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotLink}>
            <Text style={styles.link}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <Button label="Entrar" onPress={handleLogin} loading={loading} fullWidth style={styles.btn} />

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Cadastre-se</Text>
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
  headerBlock: { alignItems: 'center', marginBottom: spacing['3xl'] },
  title: { fontFamily: typography.fontFamily.heading, fontSize: 48, letterSpacing: 6, color: colors.primary },
  subtitle: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted, marginTop: spacing.xs },
  form: { backgroundColor: colors.white, borderRadius: 20, padding: spacing.xl, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  heading: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.text, marginBottom: spacing.xl, textAlign: 'center' },
  errorText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.error, marginBottom: spacing.sm, textAlign: 'center' },
  forgotLink: { alignSelf: 'flex-end', marginBottom: spacing.base },
  link: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.primary, fontWeight: typography.fontWeight.semibold },
  btn: { marginTop: spacing.sm },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg },
  registerText: { fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.textMuted },
})
