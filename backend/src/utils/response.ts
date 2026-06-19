import { Response } from 'express'
import { ApiResponse } from '../types'

export function ok<T>(res: Response, data: T, message?: string): void {
  res.status(200).json({ success: true, data, message } satisfies ApiResponse<T>)
}

export function created<T>(res: Response, data: T, message?: string): void {
  res.status(201).json({ success: true, data, message } satisfies ApiResponse<T>)
}

export function noContent(res: Response): void {
  res.status(204).send()
}

export function badRequest(res: Response, message: string): void {
  res.status(400).json({ success: false, error: message } satisfies ApiResponse)
}

export function unauthorized(res: Response, message = 'Não autenticado'): void {
  res.status(401).json({ success: false, error: message } satisfies ApiResponse)
}

export function forbidden(res: Response, message = 'Acesso negado'): void {
  res.status(403).json({ success: false, error: message } satisfies ApiResponse)
}

export function notFound(res: Response, message = 'Recurso não encontrado'): void {
  res.status(404).json({ success: false, error: message } satisfies ApiResponse)
}

export function serverError(res: Response, message = 'Erro interno do servidor'): void {
  res.status(500).json({ success: false, error: message } satisfies ApiResponse)
}
