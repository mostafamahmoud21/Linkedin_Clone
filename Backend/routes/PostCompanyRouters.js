const PostCompanyRouters = require('express').Router()
const PostCompanyController = require('../controllers/PostCompanyController.js');
const verifyToken = require('../middlewares/auth.js');

PostCompanyRouters.post('/posts/company/:id', verifyToken, PostCompanyController.addCompanyPost);

module.exports=PostCompanyRouters