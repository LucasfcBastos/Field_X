import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { badRequest } from '../utils/response'

export function validate(schema: Joi.ObjectSchema, target: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[target], { abortEarly: false })
    if (error) {
      const messages = error.details.map((d) => d.message).join(', ')
      badRequest(res, messages)
      return
    }
    next()
  }
}
