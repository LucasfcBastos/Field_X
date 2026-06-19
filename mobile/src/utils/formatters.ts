export function formatDate(dateString: string, locale = 'pt-BR'): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateTime(dateString: string, locale = 'pt-BR'): string {
  const date = new Date(dateString)
  return date.toLocaleString(locale, {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export function formatRelativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'agora'
  if (diffMins < 60) return `há ${diffMins} min`
  if (diffHours < 24) return `há ${diffHours}h`
  if (diffDays < 7) return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`
  return formatDate(dateString)
}

export function formatCurrency(value: number, locale = 'pt-BR', currency = 'BRL'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

export function formatArea(hectares: number): string {
  return `${hectares.toLocaleString('pt-BR')} ha`
}

export function formatTemperature(celsius: number): string {
  return `${celsius.toFixed(1)}°C`
}

export function formatHours(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

export function formatLiters(liters: number): string {
  return `${liters.toLocaleString('pt-BR')} L`
}

export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`
}

export function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}

export function parseDateToBR(date: string): string {
  const [y, m, d] = date.split('-')
  return `${d}/${m}/${y}`
}

export function parseDateFromBR(date: string): string {
  const [d, m, y] = date.split('/')
  return `${y}-${m}-${d}`
}
