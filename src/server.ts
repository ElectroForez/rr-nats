import Hapi from "@hapi/hapi";

export const createServer = async() => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });

    await server.start();
    return server;
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
})
