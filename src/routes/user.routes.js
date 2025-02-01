const express = require('express')
const { validateRegistration, validateLogin, validateUpdateProfile } = require('../middlewares/validator.js');
const { authMiddleware } = require('../middlewares/auth.js')


const { register } = require('../controllers/User/register.js')
const { login } = require('../controllers/User/login.js')
const { updateProfile } = require('../controllers/User/updateProfile.js')
const { getProfile } = require('../controllers/User/getProfile.js')


const router = express.Router()

router.post('/register', validateRegistration, register)
router.post('/login', validateLogin, login)
router.put('/update', validateUpdateProfile, updateProfile)
router.get('/profile', authMiddleware, getProfile)



module.exports = { userRouter: router }
