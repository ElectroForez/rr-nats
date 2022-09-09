import {StorageController} from "./storage.controller";
import {StorageMethods} from "../common/constants"
import {Transport} from "../common/Transport";

(async () => {
    const transport = new Transport();
    await transport.connect();

    await transport.subscribe(StorageMethods.getMessageById, StorageController.getMessageById);
    console.log("Storage: started");
})()