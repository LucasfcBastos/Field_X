import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { requestLogger } from './middlewares/logger'
import { globalErrorHandler, notFoundHandler } from './middlewares/error'
import { env } from './config/env'

import authRoutes from './modules/auth/auth.routes'
import farmsRoutes from './modules/farms/farms.routes'
import sensorsRoutes from './modules/sensors/sensors.routes'
import machineryRoutes from './modules/machinery/machinery.routes'
import aiRoutes from './modules/ai/ai.routes'

const app = express()

// Security
app.use(helmet())
app.use(cors({ origin: env.cors.origin, credentials: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }))

// Body
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(compression())

// Logging
app.use(requestLogger)

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/auth', authRoutes)
app.use('/farms', farmsRoutes)
app.use('/sensors', sensorsRoutes)
app.use('/machinery', machineryRoutes)
app.use('/ai', aiRoutes)

// Error handling
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app
