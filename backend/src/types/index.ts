import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  userId: string
  userEmail: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationQuery {
  page?: string
  limit?: string
}

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}
