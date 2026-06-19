import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { serverError } from '../utils/response'

export function globalErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack, url: req.url, method: req.method })
  serverError(res, err.message ?? 'Erro interno do servidor.')
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ success: false, error: `Rota não encontrada: ${req.method} ${req.path}` })
}
