import { Router } from 'express'
import * as ctrl from './sensors.controller'
import { authenticate } from '../../middlewares/auth'

const router = Router()
router.use(authenticate)
router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.patch('/:id', ctrl.update)
router.delete('/:id', ctrl.remove)
router.get('/:id/readings', ctrl.getReadings)
router.post('/:id/readings', ctrl.addReading)
export default router
