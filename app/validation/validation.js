const Joi = require('joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    const doValidation = schema.validate(data);
    return doValidation;
};

//register validation
const userUpdateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    const doValidation = schema.validate(data);
    return doValidation;
};

//login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    const doValidation = schema.validate(data);
    return doValidation;
};

//post validation
const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(10).required(),
        description: Joi.string().min(15).required()
    });
    const doValidation = schema.validate(data);
    return doValidation;
};

module.exports.registerValidation =registerValidation;
module.exports.userUpdateValidation =userUpdateValidation;
module.exports.loginValidation =loginValidation;
module.exports.postValidation =postValidation;