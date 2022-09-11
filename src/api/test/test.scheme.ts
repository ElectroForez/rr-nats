import Joi from "joi";

const id = Joi.number().min(0).required();

export const req = {
    get: {
        params: Joi.object({
            id
        })
    },
    post: {
        params: Joi.object({
            id
        }),
        payload: Joi.object({
            content: Joi.string().required()
        })
    },
    put: {
        params: Joi.object({
            id
        }),
        payload: Joi.object({
            content: Joi.string().required()
        })
    },
    delete: {
        params: Joi.object({
            id
        })
    }
}
