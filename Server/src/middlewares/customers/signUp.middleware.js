const Joi = require('joi');
const validationResponse = require('../../response/validation')

module.exports = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required(),
        firstName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        phoneNumber: Joi.string()
            .trim()
            .min(9)
            .max(15)
            .required()
    });

    const {error} = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message
        validationResponse(res, errorMessage)
    } else {
        next();
    }
}
