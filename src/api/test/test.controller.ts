import {Transport} from "../../common/Transport";
import {StringCodec} from "nats";
import {StorageMethods} from "../../common/constants";

export class TestController {

    private transport: Transport;

    constructor() {
        this.transport = new Transport();
    }

    async connect() {
        await this.transport.connect();
    }

    async getTest() {
        try {
            const sc = StringCodec();
            const result = await this.transport.request(StorageMethods.getMessageById, sc.encode("1"));
            return result;
        } catch (e) {
            console.error(e);
        }
    }
}