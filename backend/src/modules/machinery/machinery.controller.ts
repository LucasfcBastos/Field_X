import { Request, Response } from 'express'
import * as repo from './machinery.repository'
import { ok, created, noContent, serverError } from '../../utils/response'

export async function getAll(req: Request, res: Response): Promise<void> {
  try { ok(res, await repo.findAll(req.query.farmId as string | undefined)) }
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

export async function getTelemetry(req: Request, res: Response): Promise<void> {
  try { ok(res, await repo.findTelemetry(req.params.id)) }
  catch (err: any) { serverError(res, err.message) }
}

export async function addTelemetry(req: Request, res: Response): Promise<void> {
  try { created(res, await repo.addTelemetry(req.params.id, req.body)) }
  catch (err: any) { serverError(res, err.message) }
}
