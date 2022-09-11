import StorageController from "./storage.controller";
import {StorageMethods} from "../common/constants"
import Transport from "../common/Transport";

(async () => {
    const transport = new Transport();
    await transport.connect();

    await StorageController.init();

    await transport.subscribe(StorageMethods.getTestById, StorageController.getTestById);
    await transport.subscribe(StorageMethods.postTest, StorageController.postTest);
    await transport.subscribe(StorageMethods.putTest, StorageController.putTest);
    await transport.subscribe(StorageMethods.deleteTestById, StorageController.deleteTestById);

    console.log("Storage: started");
})()