import Joi from 'joi';

const createModule = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    category: Joi.string().required(),
    content: Joi.object().required(),
});

const updateModule = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    category: Joi.string().optional(),
    content: Joi.object().optional(),
});

export default {
    createModule,
    updateModule,
};
