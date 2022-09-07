import Hapi from "@hapi/hapi";
import glob from "glob";

export const createServer = async() => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });

    const routesPath = glob.sync("./api/*/*.route.ts", {cwd: "./src"});
    for (const routePath of routesPath) {
        const routeName = routePath.split('.').slice(0, -1).join('.'); //delete .ts
        const {route} = await import(routeName);
        server.route(route);
    }

    await server.start();
    return server;
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
})
