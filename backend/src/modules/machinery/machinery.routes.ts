import { Router } from 'express'
import * as ctrl from './machinery.controller'
import { authenticate } from '../../middlewares/auth'

const router = Router()
router.use(authenticate)
router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.patch('/:id', ctrl.update)
router.delete('/:id', ctrl.remove)
router.get('/:id/telemetry', ctrl.getTelemetry)
router.post('/:id/telemetry', ctrl.addTelemetry)
export default router
