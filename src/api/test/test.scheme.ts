import Joi, {ValidationError} from "joi";
import Boom from "@hapi/boom";
import Hapi from "@hapi/hapi";
import {Response} from "../../storage/interfaces";

const id = Joi.number().min(0).example(1).required();

const failAction = async (request: Hapi.Request, h: Hapi.ResponseToolkit, error: any) => {
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

export const res = Joi.object({
    test: Joi.object({
        id: Joi.number().example(1),
        content: Joi.string().example("test data")
    }).label('test object')
}).label('Response object')

export const req: {[index: string]: Hapi.RouteOptionsValidate} = {
    get: {
        ...general
    },
    post: {
        ...general,
        payload: Joi.object({
            content: Joi.string().required().example("test data")
        }).label('test body'),
    },
    put: {
        ...general,
        payload: Joi.object({
            content: Joi.string().required().example("test data")
        })
    },
    delete: {
        ...general
    }
}
