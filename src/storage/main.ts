import {StorageController} from "./storage.controller";
import {StorageMethods} from "../common/constants"
import Transport from "../common/Transport";

(async () => {
    const transport = new Transport();
    await transport.connect();

    await transport.subscribe(StorageMethods.getMessageById, StorageController.getMessageById);
    await transport.subscribe(StorageMethods.postMessage, StorageController.postMessage);
    await transport.subscribe(StorageMethods.putMessage, StorageController.putMessage);
    await transport.subscribe(StorageMethods.deleteMessageById, StorageController.deleteMessageById);

    console.log("Storage: started");
})()