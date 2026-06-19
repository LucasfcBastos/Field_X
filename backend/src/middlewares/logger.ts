import morgan from 'morgan'
import { env } from '../config/env'

export const requestLogger = morgan(
  env.isProd ? 'combined' : '[:method] :url :status :res[content-length] - :response-time ms'
)
