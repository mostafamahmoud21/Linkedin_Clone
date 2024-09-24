const companyRouters = require('express').Router();
const companyController = require('../controllers/companyAccountController.js');
const verifyToken = require('../middlewares/auth.js');

companyRouters.post('/businessAccount', verifyToken, companyController.createBusinessAccount);
companyRouters.put('/updatebusinessAccount/:id', verifyToken, companyController.updateBusinessAccount);
companyRouters.delete('/deleteBusinessAccount/:id', verifyToken, companyController.deleteBusinessAccount);
companyRouters.get('/getProfile/:id', companyController.getProfile);


module.exports = companyRouters;
