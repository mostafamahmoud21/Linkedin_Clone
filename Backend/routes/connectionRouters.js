const connectionRouters = require('express').Router()
const connectionControllers = require('../controllers/connectionController.js')
const verifyToken = require('../middlewares/auth.js');

connectionRouters.post('/connections', verifyToken, connectionControllers.sendConnectionReques)
connectionRouters.put('/connections/accept', verifyToken, connectionControllers.acceptConnectionRequest)
connectionRouters.post('/connections/reject', verifyToken, connectionControllers.rejectConnectionRequest)
connectionRouters.post('/users/:id/connections', verifyToken, connectionControllers.getConnections)

module.exports = connectionRouters
