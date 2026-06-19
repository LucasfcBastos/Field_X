import { Request, Response, NextFunction } from 'express'
import { supabaseAdmin } from '../config/supabase'
import { unauthorized } from '../utils/response'
import { AuthenticatedRequest } from '../types'

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    unauthorized(res, 'Token de autenticação ausente.')
    return
  }

  const token = authHeader.substring(7)

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) {
      unauthorized(res, 'Token inválido ou expirado.')
      return
    }

    (req as AuthenticatedRequest).userId = user.id
    ;(req as AuthenticatedRequest).userEmail = user.email ?? ''
    next()
  } catch {
    unauthorized(res, 'Erro na validação do token.')
  }
}
