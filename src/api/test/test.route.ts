import {TestController} from "./test.controller";

const testController = new TestController();

export const route = {
    method: "GET",
    path: "/api/test",
    handler: testController.getTest
}