import Joi from "joi";

const id = Joi.number().min(0).required();

export const get = {
    params: Joi.object({
        id
    })
};

export const post = {
    params: Joi.object({
        id
    }),
    payload: Joi.object({
        content: Joi.string().required()
    })
};

export const put = {
    params: Joi.object({
        id
    }),
    payload: Joi.object({
        content: Joi.string().required()
    })
};

export const del = {
    params: Joi.object({
        id
    })
}