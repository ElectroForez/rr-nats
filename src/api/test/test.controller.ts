import Transport from "../../common/Transport";
import {JSONCodec} from "nats";
import {StorageMethods} from "../../common/constants";
import {DeleteTestById, GetTestById, Test, PostTest, PutTest, Response} from "../../storage/interfaces";
import Boom from "@hapi/boom";


export default class TestController {
    private static transport: Transport;
    private static codecRes = JSONCodec<Response>();

    static setTransport(transport: Transport) {
        if (TestController.transport) throw new Error("Transport already exists");
        TestController.transport = transport;
    }

    static async getTestById(id: number) {
        const codecReq = JSONCodec<GetTestById>();
        const result = await TestController.transport.request(
            StorageMethods.getTestById,
            codecReq.encode({id}));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.notFound(response.error);
        }
        return response;
    }

    static async postTest(test: Test) {
        const codecReq = JSONCodec<PostTest>();
        const result = await TestController.transport.request(
            StorageMethods.postTest,
            codecReq.encode(test));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.badRequest(response.error);
        }
        return response;
    }

    static async putTest(test: Test) {
        const codecReq = JSONCodec<PutTest>();
        const result = await TestController.transport.request(
            StorageMethods.putTest,
            codecReq.encode(test));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.notFound(response.error);
        }
        return response;
    }

    static async deleteTestById(id: number) {
        const codecReq = JSONCodec<DeleteTestById>();
        const result = await TestController.transport.request(
            StorageMethods.deleteTestById,
            codecReq.encode({id}));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.notFound(response.error);
        }
        return response;
    }
}