import {Transport} from "../common/Transport";
import {StorageService} from "./storage.service";
import {Codec, Msg, StringCodec} from "nats";

export class StorageController {
    private static service = new StorageService();
    private static sc = StringCodec();

    static async getMessageById(msg: Msg) {
        const id = +StorageController.sc.decode(msg.data);
        const response = StorageController.service.getMessageById(id);
        msg.respond(StorageController.sc.encode(response))
    }
}