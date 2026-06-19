import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from './types'

import SplashScreen from '../modules/auth/screens/SplashScreen'
import LoginScreen from '../modules/auth/screens/LoginScreen'
import RegisterScreen from '../modules/auth/screens/RegisterScreen'
import ForgotPasswordScreen from '../modules/auth/screens/ForgotPasswordScreen'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}
