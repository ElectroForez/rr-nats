import {TestController} from "./test.controller";
import Hapi from "@hapi/hapi";
import Joi from "joi";
import * as scheme from "./test.schemes";

(async () => {
    await TestController.init();
    console.log('Test controller: init');
})();

const path = "/api/test/{id}";

export const routes = [
    {
        method: "GET",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            return await TestController.getMessageById(id);
        },
        options: {
            validate: scheme.get
        }
    },
    {
        method: "POST",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            const payload: any = request.payload;
            return await TestController.postMessage({id, ...payload});
        },
        options: {
            validate: scheme.post
        }
    },
    {
        method: "PUT",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            const payload: any = request.payload;
            return await TestController.putMessage({id, ...payload});
        },
        options: {
            validate: scheme.put
        }
    },
    {
        method: "DELETE",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            return await TestController.deleteMessageById(id);
        },
        options: {
            validate: scheme.del
        }
    },
]