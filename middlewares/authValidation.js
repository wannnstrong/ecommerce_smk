const Joi = require('joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        user_nama: Joi.string().min(5).required(),
        user_email: Joi.string().min(6).email().required(),
        user_password: Joi.string().min(6).required(),
        user_level: Joi.string()
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        user_email: Joi.string().email().min(6).required(),
        user_password: Joi.integer().min(6).required()
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation
}