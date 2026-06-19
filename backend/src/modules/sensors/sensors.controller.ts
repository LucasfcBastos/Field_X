import { Request, Response } from 'express'
import * as repo from './sensors.repository'
import { ok, created, noContent, serverError } from '../../utils/response'
import { AuthenticatedRequest } from '../../types'

export async function getAll(req: Request, res: Response): Promise<void> {
  try { ok(res, await repo.findAll((req as AuthenticatedRequest).userId, req.query.farmId as string | undefined)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function create(req: Request, res: Response): Promise<void> {
  try { created(res, await repo.create(req.body)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function update(req: Request, res: Response): Promise<void> {
  try { ok(res, await repo.update(req.params.id, req.body)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try { await repo.remove(req.params.id); noContent(res) }
  catch (err: any) { serverError(res, err.message) }
}

export async function getReadings(req: Request, res: Response): Promise<void> {
  try { ok(res, await repo.findReadings(req.params.id, parseInt(req.query.limit as string ?? '50', 10))) }
  catch (err: any) { serverError(res, err.message) }
}

export async function addReading(req: Request, res: Response): Promise<void> {
  try { created(res, await repo.addReading(req.params.id, req.body.value, req.body.unit)) }
  catch (err: any) { serverError(res, err.message) }
}
