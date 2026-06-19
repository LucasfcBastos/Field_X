import { Router } from 'express'
import * as ctrl from './farms.controller'
import { authenticate } from '../../middlewares/auth'

const router = Router()
router.use(authenticate)
router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/', ctrl.create)
router.patch('/:id', ctrl.update)
router.delete('/:id', ctrl.remove)
export default router
