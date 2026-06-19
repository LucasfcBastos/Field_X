import React, { useEffect } from 'react'
import { View, Image, StyleSheet, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../../navigation/types'
import { colors } from '../../../utils/theme'
import { useAuth } from '../../../contexts/AuthContext'

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Splash'>

export default function SplashScreen() {
  const navigation = useNavigation<Nav>()
  const { session, isLoading } = useAuth()
  const opacity = new Animated.Value(0)

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 1200, useNativeDriver: true }).start()

    const timer = setTimeout(() => {
      if (!isLoading) {
        navigation.replace(session ? 'Login' : 'Login')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [isLoading, session])

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity }}>
        <Image source={require('../../../assets/images/logo.jpeg')} style={styles.logo} resizeMode="contain" />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 220, height: 220 },
})
