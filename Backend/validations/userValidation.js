const Joi = require('joi');

exports.educationSchema=Joi.object({
    degree: Joi.string().optional(),
    institution: Joi.string().optional(),
    startDate: Joi.date().iso().required(), 
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required()
})

exports.experienceSchema=Joi.object({
    jobTitle: Joi.string().required(),
    company: Joi.string().required(),
    startDate: Joi.date().iso().required(), 
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    description:Joi.string().required(),
})

exports.updateUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]+$/).optional(),
    password: Joi.string().min(6).optional()
}).or('email', 'phone');