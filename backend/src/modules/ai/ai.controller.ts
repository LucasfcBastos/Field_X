import { Request, Response } from 'express'
import * as service from './ai.service'
import { ok, serverError } from '../../utils/response'
import { AuthenticatedRequest } from '../../types'

export async function generateInsights(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req as AuthenticatedRequest
    const { farmId } = req.query
    const result = await service.generateFarmInsight(userId, farmId as string | undefined)
    ok(res, result, 'Insights gerados com sucesso.')
  } catch (err: any) {
    serverError(res, err.message)
  }
}
