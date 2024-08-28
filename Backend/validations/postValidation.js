const Joi = require('joi');

exports.postSchema = Joi.object({
    content: Joi.string().required().messages({
        'string.empty': 'Content is required',
        'any.required': 'Content is required'
    }),
    image: Joi.string().optional().allow(null, '')
});