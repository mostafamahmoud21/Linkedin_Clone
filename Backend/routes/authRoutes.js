const Passport = require('../config/passport.js')
const authControllers = require('../controllers/authController.js')
const verifyToken = require('../middlewares/auth.js')
const validation = require('../middlewares/validations.js')
const authRouters = require('express').Router()
const { registerSchema, loginSchema } = require('../validations/authValidation.js')

authRouters.post('/register', validation(registerSchema), authControllers.register)
authRouters.post('/login', validation(loginSchema), authControllers.login)
authRouters.post('/forgot-password', authControllers.forgetPassword)
authRouters.post('/reset-password/:token', authControllers.resetPassword)

authRouters.get('/google', Passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouters.get('/google/callback',
  Passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);


module.exports = authRouters
