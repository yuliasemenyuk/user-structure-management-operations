const Joi = require("joi");

const joiRegisterSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'boss', 'regular')
});

const joiLoginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
});

const schemas = {
    joiRegisterSchema,
    joiLoginSchema
};

module.exports = {
    schemas
};