const Joi = require('joi');

module.exports = {
    validate (req) {
        const schema = {
            name: Joi.string().required(),
            address: Joi.string().required(),
            role_id: Joi.number().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        return Joi.validate(req.body, schema);
    },
    validateUserUpdate (req) {
        const schema = {
            name: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
        }
        return Joi.validate(req.body, schema);
    }
}