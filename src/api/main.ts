import { createServer } from "./server";

createServer()
    .then((server) => console.log(`Server: running at ${server.info.uri}`));