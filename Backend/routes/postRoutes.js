const postRouters = require('express').Router()
const postController = require('../controllers/postController.js');
const verifyToken = require('../middlewares/auth.js');
const validation = require('../middlewares/validations.js');
const validationSchema = require('../validations/postValidation.js')

postRouters.post('/posts', verifyToken, validation(validationSchema.postSchema), postController.addPost);
postRouters.put('/posts/:id', verifyToken, validation(validationSchema.postSchema), postController.updatePost);
postRouters.delete('/posts/:id', verifyToken, postController.deletePost);

postRouters.post('/posts/comment/:id', verifyToken, postController.addComment);
postRouters.put('/posts/comment/:id', verifyToken, postController.updateComment);
postRouters.delete('/posts/comment/:id', verifyToken, postController.deleteComment);

postRouters.post('/posts/:id/likes', verifyToken, postController.addLike);
module.exports = postRouters

