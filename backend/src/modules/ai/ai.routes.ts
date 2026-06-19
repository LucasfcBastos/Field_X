import { Router } from 'express'
import * as ctrl from './ai.controller'
import { authenticate } from '../../middlewares/auth'

const router = Router()
router.use(authenticate)
router.post('/insights', ctrl.generateInsights)
export default router
