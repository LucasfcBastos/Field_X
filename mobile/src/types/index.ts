export interface User {
  id: string
  email: string
  name: string
  farmName?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Farm {
  id: string
  userId: string
  name: string
  location?: string
  totalAreaHectares?: number
  latitude?: number
  longitude?: number
  createdAt: string
  updatedAt: string
}

export interface Field {
  id: string
  farmId: string
  name: string
  areaHectares?: number
  crop?: string
  latitude?: number
  longitude?: number
  createdAt: string
  updatedAt: string
}

export interface Operation {
  id: string
  fieldId: string
  userId: string
  date: string
  description: string
  rainfall?: string
  cost?: string
  cropHealth?: string
  tractorHours?: string
  sprayVolume?: string
  soilMoisture?: string
  airTemperature?: string
  createdAt: string
  updatedAt: string
}

export interface Sensor {
  id: string
  farmId: string
  fieldId?: string
  name: string
  type: string
  manufacturer?: string
  measurementUnit?: string
  collectionInterval?: string
  batteryLevel?: number
  connectivity?: string
  status: 'active' | 'inactive' | 'maintenance'
  latitude?: number
  longitude?: number
  createdAt: string
  updatedAt: string
}

export interface SensorReading {
  id: string
  sensorId: string
  value: number
  unit: string
  recordedAt: string
}

export interface Machinery {
  id: string
  farmId: string
  name: string
  type: string
  manufacturer?: string
  model?: string
  year?: number
  hoursUsed?: number
  sprayVolume?: number
  connectivity?: string
  status: 'active' | 'inactive' | 'maintenance'
  createdAt: string
  updatedAt: string
}

export interface MachineryTelemetry {
  id: string
  machineryId: string
  hoursUsed: number
  fuelUsed?: number
  areaWorked?: number
  engineTemp?: number
  recordedAt: string
}

export interface DroneImage {
  id: string
  farmId: string
  fieldId?: string
  imageUrl: string
  description?: string
  capturedAt: string
  processedAt?: string
  analysisResult?: string
  createdAt: string
}

export interface FieldImage {
  id: string
  fieldId?: string
  operationId?: string
  userId: string
  imageUrl: string
  description?: string
  capturedAt: string
  createdAt: string
}

export interface AIInsight {
  id: string
  userId: string
  farmId?: string
  type: 'drought_risk' | 'pest_risk' | 'operational_efficiency' | 'crop_health' | 'recommendation' | 'general'
  title: string
  content: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
  provider: 'openai' | 'gemini' | 'claude'
  createdAt: string
}

export interface Alert {
  id: string
  userId: string
  farmId?: string
  sensorId?: string
  machineryId?: string
  type: string
  title: string
  message: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  read: boolean
  createdAt: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  rainfall: number
  condition: string
  icon: string
  updatedAt: string
}

export interface DashboardSummary {
  activeSensors: number
  connectedMachinery: number
  totalFarms: number
  totalFields: number
  pendingAlerts: number
  weather?: WeatherData
  recentInsight?: AIInsight
}

export type DeviceType = 'sensor' | 'machinery'

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
}
