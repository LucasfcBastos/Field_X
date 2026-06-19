import * as repo from './farms.repository'

export const getAll = (userId: string) => repo.findAll(userId)
export const getById = (id: string, userId: string) => repo.findById(id, userId)
export const create = (userId: string, payload: object) => repo.create(userId, payload)
export const update = (id: string, userId: string, payload: object) => repo.update(id, userId, payload)
export const remove = (id: string, userId: string) => repo.remove(id, userId)
