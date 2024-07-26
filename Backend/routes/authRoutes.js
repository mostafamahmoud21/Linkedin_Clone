const authControllers=require('../controllers/authController.js')
const authRouters=require('express').Router()

authRouters.post('/register',authControllers.register)
authRouters.post('/login',authControllers.login)

module.exports=authRouters
