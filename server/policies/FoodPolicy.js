const Joi = require('joi');

module.exports = {
    validate (req) {
        const schema = {
            title: Joi.string().required(),
            price: Joi.number().greater(0).required(),
            quantity: Joi.number().greater(0).required(),
            description: Joi.string().required(),
            canteen_manager_id: Joi.number().required(),
        }
        return Joi.validate(req.body, schema);
    }
}