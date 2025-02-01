import express from 'express'
import { register, login, getProfile } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, getProfile)

export { router as authRouter }
