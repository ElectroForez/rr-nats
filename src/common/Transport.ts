import * as nats from "nats";
import {Msg} from "nats";

export default class Transport {
    private natsConn: nats.NatsConnection | undefined;

    public async connect() {
        this.natsConn = await nats.connect({
            servers: process.env.NATS_URL || "localhost"
        })
            .catch(error => {throw error});
    }

    public async disconnect() {
        this.natsConn?.close();
    }

    public async request(subject: string, data?: Uint8Array) {
        const result = await this.natsConn?.request(subject, data);
        if (!result){
            console.error("Error while getting result");
            throw new nats.NatsError('Connection is closed', "CONN_CLOSED");
        }
        return result?.data;
    }

    public async subscribe(subject: string, handler: (msg: Msg) => void): Promise<void> {
        this.natsConn?.subscribe(subject, {callback: (err, msg) => {
                if (err) throw err;
                handler(msg);
            }});
    }
}