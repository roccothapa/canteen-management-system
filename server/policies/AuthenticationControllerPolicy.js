const Joi = require('joi');

module.exports = {
    register (req, res, next) {
        const schema = {
            name: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }

        const { error, value} = Joi.validate(req.body, schema);
        if(error) {
            res.json(error);
        } else {
            next();
        }
    }
}