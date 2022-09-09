import {StorageController} from "./storage.controller";
import {StorageMethods} from "../common/constants"
import {StringCodec} from "nats";

(async () => {
    const storageController = new StorageController();
    await storageController.on();

    const stringCodec = StringCodec();

    await storageController.addSubscribe(StorageMethods.getMessageById, async (msg) => {
        const id = +stringCodec.decode(msg.data);
        const response = storageController.service.getMessageById(id);
        msg.respond(stringCodec.encode(response))
    })
})()