const joi = require('joi');
const { validationRegex } = require('../utils/utility');

const registerValidation = (data) => {
    const schema = joi.object({
        firstName: joi.string().trim().min(3).required(),
        lastName: joi.string().trim().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().required().pattern(new RegExp(validationRegex.password)),
        phone: joi
            .string().
            pattern(new RegExp(validationRegex.phone)),
    });
    return schema.validate(data);
};

const urlValidation = (data) => {
    const schema = joi.object({
        longUrl: joi.string().required().pattern(new RegExp(validationRegex.regexForUrl))
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().trim()
    });
    return schema.validate(data);
}



module.exports = {
    registerValidation,
    urlValidation,
    loginValidation
}