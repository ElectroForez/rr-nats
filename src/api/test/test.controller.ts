import Transport from "../../common/Transport";
import {JSONCodec} from "nats";
import {StorageMethods} from "../../common/constants";
import {DeleteMessageById, GetMessageById, Message, PostMessage, PutMessage, Response} from "../../storage/interfaces";
import Boom from "@hapi/boom";


export class TestController {
    private static transport: Transport;
    private static codecRes = JSONCodec<Response>();

    static async init() {
        TestController.transport = new Transport();
        await TestController.transport.connect();
    }

    static async getMessageById(id: number) {
        const codecReq = JSONCodec<GetMessageById>();
        const result = await TestController.transport.request(
            StorageMethods.getMessageById,
            codecReq.encode({id}));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.notFound(response.error);
        }
        return response;
    }

    static async postMessage(msg: Message) {
        const codecReq = JSONCodec<PostMessage>();
        const result = await TestController.transport.request(
            StorageMethods.postMessage,
            codecReq.encode(msg));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.badRequest(response.error);
        }
        return response;
    }

    static async putMessage(msg: Message) {
        const codecReq = JSONCodec<PutMessage>();
        const result = await TestController.transport.request(
            StorageMethods.putMessage,
            codecReq.encode(msg));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.notFound(response.error);
        }
        return response;
    }

    static async deleteMessageById(id: number) {
        const codecReq = JSONCodec<DeleteMessageById>();
        const result = await TestController.transport.request(
            StorageMethods.deleteMessageById,
            codecReq.encode({id}));
        const response = TestController.codecRes.decode(result);
        if (response.error) {
            throw Boom.notFound(response.error);
        }
        return response;
    }
}