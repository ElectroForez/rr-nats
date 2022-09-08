import {Transport} from "../common/Transport";
import {StorageService} from "./storage.service";
import {Msg} from "nats";

export class StorageController {
    private transport: Transport;
    public service: StorageService;

    constructor() {
        this.transport = new Transport();
        this.service = new StorageService();
    }

    async on() {
        await this.transport.connect();
    }

    async off() {
        await this.transport.disconnect();
    }

    async addSubscribe(subject: string, handler: (msg: Msg) => void) {
        await this.transport.subscribe(subject, handler);
    }
}