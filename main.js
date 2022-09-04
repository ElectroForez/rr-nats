"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("nats");
(async () => {
    // create a connection
    const nc = await (0, nats_1.connect)({ servers: "demo.nats.io:4222" });
    // create an encoder
    const sc = (0, nats_1.StringCodec)();
    const sub = nc.subscribe("time");
    (async (sub) => {
        console.log(`listening for ${sub.getSubject()} requests...`);
        for await (const m of sub) {
            if (m.respond(sc.encode(new Date().toISOString()))) {
                console.info(`[time] handled #${sub.getProcessed()}`);
            }
            else {
                console.log(`[time] #${sub.getProcessed()} ignored - no reply subject`);
            }
        }
        console.log(`subscription ${sub.getSubject()} drained.`);
    })(sub);
    // this subscription listens for admin.uptime and admin.stop
    // requests to admin.uptime returns how long the service has been running
    // requests to admin.stop gracefully stop the client by draining
    // the connection
    const started = Date.now();
    const msub = nc.subscribe("admin.*");
    (async (sub) => {
        console.log(`listening for ${sub.getSubject()} requests [uptime | stop]`);
        // it would be very good to verify the origin of the request
        // before implementing something that allows your service to be managed.
        // NATS can limit which client can send or receive on what subjects.
        for await (const m of sub) {
            const chunks = m.subject.split(".");
            console.info(`[admin] #${sub.getProcessed()} handling ${chunks[1]}`);
            switch (chunks[1]) {
                case "uptime":
                    // send the number of millis since up
                    m.respond(sc.encode(`${Date.now() - started}`));
                    break;
                case "stop": {
                    m.respond(sc.encode(`[admin] #${sub.getProcessed()} stopping....`));
                    // gracefully shutdown
                    nc.drain()
                        .catch((err) => {
                        console.log("error draining", err);
                    });
                    break;
                }
                default:
                    console.log(`[admin] #${sub.getProcessed()} ignoring request for ${m.subject}`);
            }
        }
        console.log(`subscription ${sub.getSubject()} drained.`);
    })(msub);
    // the client makes a request and receives a promise for a message
    // by default the request times out after 1s (1000 millis) and has
    // no payload.
    await nc.request("time", nats_1.Empty, { timeout: 1000 })
        .then((m) => {
        console.log(`got response: ${sc.decode(m.data)}`);
    })
        .catch((err) => {
        console.log(`problem with request: ${err.message}`);
    });
    await nc.close();
})();
