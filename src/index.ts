import express, {Request, json} from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config'

import path from "path";
import {fileURLToPath} from "url";
import cookieParser from "cookie-parser";
import { express as expressUserAgent } from 'express-useragent';
import mongoose, {Types} from "mongoose";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import schema from "./graphql/index.js";
import {AuthMiddleware} from "./middlewares/index.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

import {AuthRouter} from "./routes/index.js";
import {PubSub} from "graphql-subscriptions";

import cron from 'node-cron';

import {createReadStream} from "node:fs";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


let socket = null;

export const pubsub = new PubSub();

(async function () {
    let whitelist = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        "https://r0kswwwokcscg8kkgow8gc4o.coolify.bi3li.cloud",
        "https://wcwcksg4sgoockosg0sw0ckg.coolify.bi3li.cloud"
    ]

    let corsOptionsDelegate = function (req: any, callback: any) {
        let corsOptions;

        // console.log("Origin:", req.header('Origin'))
        if (whitelist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = {origin: req.header('Origin'), credentials: true}
        } else {
            corsOptions = { origin: false, credentials: false }
        }

        callback(null, corsOptions)
    }

    const app = express();
    const httpServer = http.createServer(app);


    app.use('/images', express.static(path.join(__dirname, '../uploads')))
    app.use('/thumbnails', express.static(path.join(__dirname, '../uploads/blured')))
    app.use(cors(corsOptionsDelegate))
    app.use(json())
    app.use(cookieParser())
    app.use(expressUserAgent())
    app.use("/api/auth", AuthRouter)

    app.get("/test", async (req, res) => {
        try {
            // const data = await feesInYalidine("hYxqAins8rH5zGXv7WLRaNoQsjcHxKp1VEpDSevdcIVtUB4ZNwbLJwuykYPWf5K4", "09712476872108341641", "39")
            // const data = await getAllFolder({idGoogleSheets: "67ed2a5578de156e1b29c476"})

            res.status(200).send()//.json(data)
        } catch (e) {
            console.error(e);
        }
    })

    app.get("/health-check", (req, res) => {
        try {
            res.status(200).send()
        } catch (e) {
            console.error(e);
        }
    })

    const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        introspection: true,
        includeStacktraceInErrorResponses: false,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginInlineTrace({
                includeErrors: { transform: (err) => (err.message ? null : err) },
            }),
            {async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            }}
        ]
    });

    await server.start();

    app.use('/graphql',
        AuthMiddleware,
        graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10, maxFieldSize: 10000000}),
        // @ts-ignore
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                // @ts-ignore
                let {user, permissions, isAuth} = req;

                let refreshToken = req?.cookies?.["__rf"];

                return { res, req, user, permissions, isAuth, refreshToken };
            },
        })
    );

    try {
        const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb+srv://hicham5lehouedj:Hicham0675722241h@cluster2.ajmndot.mongodb.net/transformation-era?retryWrites=true&w=majority&appName=Cluster2"
        console.log({MONGO_DB_URL})
        await mongoose.connect(MONGO_DB_URL);
        console.log('MongoDB Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const Port = process.env.PORT || 4000

    httpServer.listen({ port: Port }, () => {
        console.log(`Server is now running on http://localhost:${Port}/graphql`);
    });
})()

export { socket }
