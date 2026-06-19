import { isValidEmail, isValidPassword, validateSignIn, validateSignUp } from '../utils/validators'

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('user+tag@domain.co.uk')).toBe(true)
  })
  it('rejects invalid emails', () => {
    expect(isValidEmail('notanemail')).toBe(false)
    expect(isValidEmail('@domain.com')).toBe(false)
    expect(isValidEmail('user@')).toBe(false)
  })
})

describe('isValidPassword', () => {
  it('accepts password with 8+ chars', () => expect(isValidPassword('12345678')).toBe(true))
  it('rejects short passwords', () => expect(isValidPassword('1234567')).toBe(false))
})

describe('validateSignIn', () => {
  it('returns valid for correct input', () => {
    expect(validateSignIn('user@example.com', 'password123').valid).toBe(true)
  })
  it('returns error for empty email', () => {
    const result = validateSignIn('', 'password123')
    expect(result.valid).toBe(false)
    expect(result.error).toBeDefined()
  })
  it('returns error for invalid email', () => {
    const result = validateSignIn('invalid', 'password123')
    expect(result.valid).toBe(false)
  })
  it('returns error for empty password', () => {
    const result = validateSignIn('user@example.com', '')
    expect(result.valid).toBe(false)
  })
})

describe('validateSignUp', () => {
  it('returns valid for correct input', () => {
    expect(validateSignUp('João Silva', 'user@example.com', 'password123', 'password123').valid).toBe(true)
  })
  it('returns error when passwords do not match', () => {
    const result = validateSignUp('João', 'user@example.com', 'password123', 'different')
    expect(result.valid).toBe(false)
    expect(result.error).toContain('coincidem')
  })
  it('returns error for empty name', () => {
    expect(validateSignUp('', 'user@example.com', 'pass1234', 'pass1234').valid).toBe(false)
  })
})
