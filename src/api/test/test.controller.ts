import {Transport} from "../../common/Transport";
import {StringCodec} from "nats";
import {StorageMethods} from "../../common/constants";

export class TestController {
    private static transport: Transport;
    private static sc = StringCodec();

    static async init() {
        TestController.transport = new Transport();
        await TestController.transport.connect();
        console.log('Test controller: init');
    }

    static async getMessage(id: number) {
        try {
            const result = await TestController.transport.request(StorageMethods.getMessageById,
                TestController.sc.encode(String(id)));
            return result;
        } catch (e) {
            console.error(e);
        }
    }
}