import Hapi from "@hapi/hapi";
import glob from "glob";
import {config} from "./config";
import HapiError from "hapi-dev-errors"

export const createServer = async() => {
    const server = Hapi.server(config.server);

    const routesPaths = glob.sync("./*/*.routes.ts", {cwd: "./src/api"});
    for (const routesPath of routesPaths) {
        const routesName = routesPath.split('.').slice(0, -1).join('.'); //delete .ts
        const {routes} = await import(routesName);
        server.route(routes);
        console.log(`Server: added routes from ${routesName}`);
    }

    await server.register({
        plugin: HapiError,
        options: {
            showErrors: process.env.NODE_END === 'dev'
        }
    })

    await server.start();
    return server;
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
})
