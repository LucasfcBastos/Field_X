import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from './types'
import { colors } from '../utils/theme'
import { Ionicons } from '@expo/vector-icons'

import DashboardScreen from '../modules/dashboard/screens/DashboardScreen'
import FarmsScreen from '../modules/farms/screens/FarmsScreen'
import DevicesScreen from '../modules/sensors/screens/SensorsScreen'
import MapScreen from '../modules/maps/screens/MapScreen'
import AIInsightsScreen from '../modules/ai/screens/AIInsightsScreen'

const Tab = createBottomTabNavigator<MainTabParamList>()

type IoniconName = React.ComponentProps<typeof Ionicons>['name']

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  Dashboard: { active: 'home', inactive: 'home-outline' },
  Farms: { active: 'leaf', inactive: 'leaf-outline' },
  Devices: { active: 'hardware-chip', inactive: 'hardware-chip-outline' },
  Maps: { active: 'map', inactive: 'map-outline' },
  AI: { active: 'sparkles', inactive: 'sparkles-outline' },
}

const TAB_LABELS: Record<string, string> = {
  Dashboard: 'Início',
  Farms: 'Fazendas',
  Devices: 'Dispositivos',
  Maps: 'Mapa',
  AI: 'IA',
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border, height: 60, paddingBottom: 8 },
        tabBarLabelStyle: { fontFamily: 'Nunito', fontSize: 11 },
        tabBarLabel: TAB_LABELS[route.name],
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name]
          return <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Farms" component={FarmsScreen} />
      <Tab.Screen name="Devices" component={DevicesScreen} />
      <Tab.Screen name="Maps" component={MapScreen} />
      <Tab.Screen name="AI" component={AIInsightsScreen} />
    </Tab.Navigator>
  )
}
