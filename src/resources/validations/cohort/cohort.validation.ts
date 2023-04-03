import Joi from 'joi';

const createCohort = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(2100).required(),
});

const updateCohort = Joi.object({
    name: Joi.string(),
    year: Joi.number().integer().min(1900).max(2100),
});

export default {
    createCohort,
    updateCohort,
};
