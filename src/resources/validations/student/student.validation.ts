import Joi from 'joi';
import JoiObjectId from 'joi-oid';

const create = Joi.object({
    name: Joi.string().max(30).required(),

    surname: Joi.string().required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    birthdate: Joi.date().required(),

    phone: Joi.string().pattern(/^\+?[\d\s\-().]+$/).optional(),

    interests: Joi.array().items(Joi.string()),

    navigationHistory: Joi.array().items(Joi.any()),

    cohorts: Joi.array().items(Joi.object()),

});

const update = Joi.object({
    email: Joi.string().required(),

    password: Joi.string().required(),
});

export default { create, update };
