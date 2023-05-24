import Joi from 'joi';

const create = Joi.object({
    name: Joi.string().max(30).required(),
    surname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthDate: Joi.date().required(),
});

const update = Joi.object({
    name: Joi.string().max(30).required(),
    surname: Joi.string().required(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    birthDate: Joi.date().optional(),
});

export default { create, update };
