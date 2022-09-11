import TestController from "./test.controller";
import Hapi from "@hapi/hapi";
import * as scheme from "./test.scheme";
import Transport from "../../common/Transport";

(async () => {
    const transport = new Transport();
    await transport.connect();
    TestController.setTransport(transport);
    console.log('Test controller: init');
})();

const path = "/api/test/{id}";

export const routes = [
    {
        method: "GET",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            return await TestController.getTestById(id);
        },
        options: {
            validate: scheme.req.get
        }
    },
    {
        method: "POST",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            const payload: any = request.payload;
            return await TestController.postTest({id, ...payload});
        },
        options: {
            validate: scheme.req.post
        }
    },
    {
        method: "PUT",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            const payload: any = request.payload;
            return await TestController.putTest({id, ...payload});
        },
        options: {
            validate: scheme.req.put
        }
    },
    {
        method: "DELETE",
        path: path,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: number = +request.params.id;
            return await TestController.deleteTestById(id);
        },
        options: {
            validate: scheme.req.delete
        }
    },
]