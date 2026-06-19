import app from './app'
import { env } from './config/env'
import { logger } from './utils/logger'

const server = app.listen(env.port, () => {
  logger.info(`🚀 Field X API running on http://localhost:${env.port}`)
  logger.info(`   Environment: ${env.nodeEnv}`)
  logger.info(`   AI Provider: ${env.ai.provider}`)
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM received — shutting down gracefully')
  server.close(() => { logger.info('Server closed'); process.exit(0) })
})

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', reason)
  process.exit(1)
})
