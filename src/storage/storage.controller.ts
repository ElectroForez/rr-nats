import {StorageService} from "./storage.service";
import {JSONCodec, Msg} from "nats";
import {DeleteTestById, GetTestById, PostTest, PutTest, Response} from "./interfaces";
import {AppDataSource} from "../common/data-source";
import {Test} from "../entity/Test";

export default class StorageController {
    private static service: StorageService;
    private static codecRes = JSONCodec<Response>();

    static async init() {
        if (AppDataSource.isInitialized) return;

        await AppDataSource.initialize()
            .then(() => console.log('TypeORM: init'));
        const testRepository = AppDataSource.getRepository(Test);
        StorageController.service = new StorageService(testRepository);
    }

    static async getTestById(msg: Msg) {
        const codecReq = JSONCodec<GetTestById>();
        const msgData = codecReq.decode(msg.data);
        const result = await StorageController.service.getTestById(msgData.id);
        const responseData: Response = result ?
            {test: result} : {error: `Test with id ${msgData.id} not found`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }

    static async postTest(msg: Msg) {
        const codecReq = JSONCodec<PostTest>();
        const msgData = codecReq.decode(msg.data);
        const result = await StorageController.service.postTest(msgData);
        const responseData: Response = result ?
            {test: result} : {error: `Test with id ${msgData.id} already exists`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }

    static async putTest(msg: Msg) {
        const codecReq = JSONCodec<PutTest>();
        const msgData = codecReq.decode(msg.data);
        const result = await StorageController.service.putTest(msgData);
        const responseData: Response = result ?
            {test: result} : {error: `Test with id ${msgData.id} not found`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }

    static async deleteTestById(msg: Msg) {
        const codecReq = JSONCodec<DeleteTestById>();
        const msgData = codecReq.decode(msg.data);
        const result = await StorageController.service.deleteTestById(msgData.id);
        const responseData: Response = result ?
            {test: result} : {error: `Test with id ${msgData.id} not found`};
        msg.respond(StorageController.codecRes.encode(responseData));
    }
}