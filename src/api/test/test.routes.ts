import {TestController} from "./test.controller";

const testController = new TestController();
(async () => {
    await testController.connect();
})()

export const routes = [
    {
        method: "GET",
        path: "/api/test",
        handler: testController.getTest.bind(testController)
    }
]