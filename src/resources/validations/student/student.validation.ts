import Joi from 'joi';

const create = Joi.object({
    matricule: Joi.string().required(),
    name: Joi.string().max(30).required(),
    surname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthDate: Joi.date().required(),
    interests: Joi.array().items(Joi.string()).optional(),
});

const update = Joi.object({
    matricule: Joi.string().required(),
    name: Joi.string().max(30).required(),
    surname: Joi.string().required(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    birthDate: Joi.date().optional(),
    interests: Joi.array().items(Joi.string()).optional(),
});

export default { create, update };
