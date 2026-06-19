export const colors = {
  primary: '#33C758',
  primaryDark: '#008112',
  secondary: '#015A4A',
  secondaryAlt: '#5A1C01',
  background: '#FFFFFF',
  backgroundAlt: '#DEDCDB',
  text: '#000000',
  textMuted: '#666666',
  textLight: '#999999',
  border: '#E0E0E0',
  error: '#DC2626',
  warning: '#D97706',
  success: '#16A34A',
  info: '#2563EB',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  severity: {
    low: '#16A34A',
    medium: '#D97706',
    high: '#DC2626',
    critical: '#7C3AED',
  },
} as const

export const typography = {
  fontFamily: {
    heading: 'BebasNeue',
    body: 'Nunito',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
} as const
