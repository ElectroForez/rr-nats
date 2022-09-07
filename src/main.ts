import { createServer } from "./server";

createServer()
    .then((server) => console.log(`server started at ${server.info.uri}`));