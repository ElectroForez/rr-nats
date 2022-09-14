import Hapi from "@hapi/hapi";
import glob from "glob";
import {config} from "./config";
import HapiError from "hapi-dev-errors"

import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import * as options from './options';

export const createServer = async() => {
    const server = Hapi.server(config.server);

    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
        {
            plugin: Inert
        },
        {
            plugin: Vision
        },
        {
            plugin: HapiSwagger,
            options: options.swagger
        },
        {
            plugin: HapiError,
            options: {
                showErrors: process.env.NODE_END === 'dev'
            }
        }
    ];

    await server.register(plugins);

    const routesPaths = glob.sync("./*/*.routes.ts", {cwd: __dirname});
    for (const routesPath of routesPaths) {
        const routesName = routesPath.split('.').slice(0, -1).join('.'); //delete .ts
        const {routes} = await import(routesName);
        server.route(routes);
        console.log(`Server: added routes from ${routesName}`);
    }

    await server.start();
    return server;
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
})
