const messageRouters = require('express').Router()
const messageControllers = require('../controllers/messageController.js')
const verifyToken = require('../middlewares/auth.js');

messageRouters.post('/sendMessage/:receiverId', verifyToken, messageControllers.sendMessage)
messageRouters.get('/getMessages/:receiverId', verifyToken, messageControllers.getMessages)


module.exports = messageRouters
