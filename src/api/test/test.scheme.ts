import Joi, {ValidationError} from "joi";
import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";

const id = Joi.number().min(0).required();

const failAction = async (request: Hapi.Request, h: Hapi.ResponseToolkit, error: ValidationError) => {
    const errorMessage = error.details.map((detail: { message: string; }) => {
        return detail.message + ";\n";
    });
    const strErrorMessage = errorMessage.toString().replaceAll("\"", "'");
    throw Boom.badRequest(strErrorMessage);
};

const general = {
    params: Joi.object({
        id
    }),
    failAction,
    options: {
        abortEarly: false
    }
}

export const req = {
    get: {
        ...general
    },
    post: {
        ...general,
        payload: Joi.object({
            content: Joi.string().required()
        }),
    },
    put: {
        ...general,
        payload: Joi.object({
            content: Joi.string().required()
        })
    },
    delete: {
        ...general
    }
}
