const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]+$/).optional(),
    password: Joi.string().min(6).required()
}).or('email', 'phone');

const loginSchema = Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]+$/).optional(),
    password: Joi.string().min(6).required()
}).or('email', 'phone');
module.exports = {registerSchema,loginSchema};
