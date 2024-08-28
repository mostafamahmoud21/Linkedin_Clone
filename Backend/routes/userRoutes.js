const userRouters = require('express').Router()
const userController = require('../controllers/userController.js');
const verifyToken = require('../middlewares/auth.js');
const validation = require('../middlewares/validations.js');
const validationSchema = require('../validations/userValidation.js')
userRouters.get('/profile/:id', verifyToken, userController.getUserProfile);
userRouters.put('/profile/:id', verifyToken, validation(validationSchema.updateUserSchema), userController.updateUserProfile);

userRouters.post('/profile/:id/skills/add', verifyToken, userController.addSkills);
userRouters.put('/profile/:id/skills', verifyToken, userController.updateSkill);
userRouters.delete('/profile/:id/skills', verifyToken, userController.deleteSkill);

userRouters.post('/profile/:id/education/add', verifyToken, validation(validationSchema.educationSchema), userController.addEducation);
userRouters.put('/profile/:id/education', verifyToken, validation(validationSchema.educationSchema), userController.updateEducation);
userRouters.delete('/profile/:id/education', verifyToken, userController.deleteEducation);

userRouters.post('/profile/:id/experience/add', verifyToken, validation(validationSchema.experienceSchema), userController.addExperience);
userRouters.put('/profile/:id/experience', verifyToken, validation(validationSchema.experienceSchema), userController.updateExperienceById);
userRouters.delete('/profile/:id/experience', verifyToken, userController.deleteExperience);

module.exports = userRouters


