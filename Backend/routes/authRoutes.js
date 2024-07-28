const authControllers = require('../controllers/authController.js')
const verifyToken = require('../middlewares/auth.js')
const validation = require('../middlewares/validations.js')
const authRouters = require('express').Router()
const { registerSchema, loginSchema } = require('../validations/authValidation.js')

authRouters.post('/register', validation(registerSchema), authControllers.register)
authRouters.post('/login', validation(loginSchema), authControllers.login)

module.exports = authRouters
