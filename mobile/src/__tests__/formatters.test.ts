import { formatDate, formatRelativeTime, formatCurrency, formatArea, formatHours, truncateText } from '../utils/formatters'

describe('formatDate', () => {
  it('formats ISO date to pt-BR', () => {
    expect(formatDate('2026-01-15T00:00:00Z')).toMatch(/15\/01\/2026/)
  })
})

describe('formatCurrency', () => {
  it('formats BRL currency', () => {
    const result = formatCurrency(1500.5)
    expect(result).toContain('1.500')
  })
})

describe('formatArea', () => {
  it('adds ha suffix', () => {
    expect(formatArea(250)).toContain('ha')
    expect(formatArea(250)).toContain('250')
  })
})

describe('formatHours', () => {
  it('formats whole hours', () => expect(formatHours(5)).toBe('5h'))
  it('formats hours with minutes', () => expect(formatHours(5.5)).toBe('5h 30min'))
})

describe('truncateText', () => {
  it('does not truncate short text', () => expect(truncateText('hello', 10)).toBe('hello'))
  it('truncates long text with ellipsis', () => {
    const result = truncateText('this is a long text', 10)
    expect(result).toHaveLength(13) // 10 + '...'
    expect(result.endsWith('...')).toBe(true)
  })
})

describe('formatRelativeTime', () => {
  it('returns "agora" for current time', () => {
    expect(formatRelativeTime(new Date().toISOString())).toBe('agora')
  })
})
