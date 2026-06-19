import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export type AuthStackParamList = {
  Splash: undefined
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
}

export type MainTabParamList = {
  Dashboard: undefined
  Farms: undefined
  Devices: undefined
  Maps: undefined
  AI: undefined
}

export type FarmsStackParamList = {
  FarmsList: undefined
  FarmDetail: { farmId: string }
  FarmForm: { farmId?: string }
  FieldForm: { farmId: string; fieldId?: string }
}

export type DevicesStackParamList = {
  DevicesList: undefined
  SensorDetail: { sensorId: string }
  SensorForm: { sensorId?: string; farmId?: string }
  MachineryDetail: { machineryId: string }
  MachineryForm: { machineryId?: string; farmId?: string }
  DronesGallery: { farmId?: string }
  DroneUpload: { farmId: string }
}

export type RootStackParamList = {
  Auth: undefined
  Main: undefined
}

export type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>
export type MainTabNavProp = BottomTabNavigationProp<MainTabParamList>
