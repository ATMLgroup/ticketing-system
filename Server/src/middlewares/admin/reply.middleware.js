const Joi = require('joi');
const validationResponse = require('../../response/validation')

module.exports = (req, res, next) => {
    const schema = Joi.object({
        ticketId: Joi.number()
            .required(),
        content: Joi.string()
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
