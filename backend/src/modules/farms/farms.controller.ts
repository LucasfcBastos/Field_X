import { Request, Response } from 'express'
import * as service from './farms.service'
import { ok, created, noContent, notFound, serverError } from '../../utils/response'
import { AuthenticatedRequest } from '../../types'

export async function getAll(req: Request, res: Response): Promise<void> {
  try { ok(res, await service.getAll((req as AuthenticatedRequest).userId)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const farm = await service.getById(req.params.id, (req as AuthenticatedRequest).userId)
    if (!farm) { notFound(res, 'Fazenda não encontrada.'); return }
    ok(res, farm)
  } catch (err: any) { serverError(res, err.message) }
}

export async function create(req: Request, res: Response): Promise<void> {
  try { created(res, await service.create((req as AuthenticatedRequest).userId, req.body)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function update(req: Request, res: Response): Promise<void> {
  try { ok(res, await service.update(req.params.id, (req as AuthenticatedRequest).userId, req.body)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try { await service.remove(req.params.id, (req as AuthenticatedRequest).userId); noContent(res) }
  catch (err: any) { serverError(res, err.message) }
}
