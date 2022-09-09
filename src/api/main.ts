import { createServer } from "./server";

createServer()
    .then((server) => console.log(`Server: started at ${server.info.uri}`));