const Joi = require("joi");

const joiRegisterSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'boss', 'subordinate'),
    boss: Joi.string()
});

const joiLoginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required()
});

const joiResubSchema = Joi.object({
    userId: Joi.string().required(),
    newBossId: Joi.string().required()
});

const schemas = {
    joiRegisterSchema,
    joiLoginSchema,
    joiResubSchema
};

module.exports = {
    schemas
};