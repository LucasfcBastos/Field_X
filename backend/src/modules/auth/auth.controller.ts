import { Request, Response } from 'express'
import * as authService from './auth.service'
import { ok, created, badRequest, serverError } from '../../utils/response'
import { AuthenticatedRequest } from '../../types'

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body
    const data = await authService.signIn(email, password)
    ok(res, { session: data.session, user: data.user }, 'Login realizado com sucesso.')
  } catch (err: any) {
    badRequest(res, err.message)
  }
}

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = req.body
    const user = await authService.signUp(email, password, name)
    created(res, { user }, 'Conta criada com sucesso.')
  } catch (err: any) {
    badRequest(res, err.message)
  }
}

export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body
    const data = await authService.refreshToken(refreshToken)
    ok(res, { session: data.session })
  } catch (err: any) {
    badRequest(res, err.message)
  }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body
    await authService.resetPassword(email)
    ok(res, null, 'E-mail de recuperação enviado.')
  } catch (err: any) {
    serverError(res, err.message)
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req as AuthenticatedRequest
    const profile = await authService.getProfile(userId)
    ok(res, profile)
  } catch (err: any) {
    serverError(res, err.message)
  }
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req as AuthenticatedRequest
    const profile = await authService.updateProfile(userId, req.body)
    ok(res, profile, 'Perfil atualizado.')
  } catch (err: any) {
    serverError(res, err.message)
  }
}
