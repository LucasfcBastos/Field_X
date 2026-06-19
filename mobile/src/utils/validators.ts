export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{10,}$/.test(phone)
}

export function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) return false
  if (/^(\d)\1+$/.test(cleaned)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cleaned[i]) * (10 - i)
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned[9])) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cleaned[i]) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  return remainder === parseInt(cleaned[10])
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

export function isPositiveNumber(value: number): boolean {
  return !isNaN(value) && value > 0
}

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateSignIn(email: string, password: string): ValidationResult {
  if (!isNotEmpty(email)) return { valid: false, error: 'E-mail é obrigatório' }
  if (!isValidEmail(email)) return { valid: false, error: 'E-mail inválido' }
  if (!isNotEmpty(password)) return { valid: false, error: 'Senha é obrigatória' }
  return { valid: true }
}

export function validateSignUp(name: string, email: string, password: string, confirmPassword: string): ValidationResult {
  if (!isNotEmpty(name)) return { valid: false, error: 'Nome é obrigatório' }
  if (!isValidEmail(email)) return { valid: false, error: 'E-mail inválido' }
  if (!isValidPassword(password)) return { valid: false, error: 'Senha deve ter no mínimo 8 caracteres' }
  if (password !== confirmPassword) return { valid: false, error: 'As senhas não coincidem' }
  return { valid: true }
}
