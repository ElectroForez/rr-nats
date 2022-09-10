import {StorageService} from "./storage.service";
import {JSONCodec, Msg} from "nats";
import {DeleteMessageById, GetMessageById, PostMessage, PutMessage, Response} from "./interfaces";

export class StorageController {
    private static service = new StorageService();
    private static codecRes = JSONCodec<Response>();

    static async getMessageById(msg: Msg) {
        const codecReq = JSONCodec<GetMessageById>();
        const msgData = codecReq.decode(msg.data);
        const result = StorageController.service.getMessageById(msgData.id);
        const responseData: Response = result ?
            {message: result} : {error: `Msg with id ${msgData.id} not found`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }

    static async postMessage(msg: Msg) {
        const codecReq = JSONCodec<PostMessage>();
        const msgData = codecReq.decode(msg.data);
        const result = StorageController.service.postMessage(msgData);
        const responseData: Response = result ?
            {message: result} : {error: `Msg with id ${msgData.id} already exists`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }

    static async putMessage(msg: Msg) {
        const codecReq = JSONCodec<PutMessage>();
        const msgData = codecReq.decode(msg.data);
        const result = StorageController.service.putMessage(msgData);
        const responseData: Response = result ?
            {message: result} : {error: `Msg with id ${msgData.id} not found`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }

    static async deleteMessageById(msg: Msg) {
        const codecReq = JSONCodec<DeleteMessageById>();
        const msgData = codecReq.decode(msg.data);
        const result = StorageController.service.deleteMessageById(msgData.id);
        const responseData: Response = result ?
            {message: result} : {error: `Msg with id ${msgData.id} not found`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }
}