import { Router } from 'express'
import * as ctrl from './auth.controller'
import { authenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import Joi from 'joi'

const router = Router()

const signInSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(8).required() })
const signUpSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(8).required(), name: Joi.string().min(2).required() })

router.post('/signin', validate(signInSchema), ctrl.signIn)
router.post('/signup', validate(signUpSchema), ctrl.signUp)
router.post('/refresh', ctrl.refresh)
router.post('/reset-password', ctrl.resetPassword)
router.get('/profile', authenticate, ctrl.getProfile)
router.patch('/profile', authenticate, ctrl.updateProfile)

export default router
