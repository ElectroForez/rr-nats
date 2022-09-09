import {TestController} from "./test.controller";
import Hapi from "@hapi/hapi";
import {Transport} from "../../common/Transport";

(async () => {
    await TestController.init();
})();

export const routes = [
    {
        method: "GET",
        path: "/api/test/{id}",
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id: string = request.params.id;
            return await TestController.getMessage(+id) + "\n";
        }
    }
]