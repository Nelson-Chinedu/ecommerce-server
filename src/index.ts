import 'reflect-metadata';
import 'dotenv/config';
import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import cors, { CorsOptions } from 'cors';
import { createConnection } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import schema from './graphql/schema';

const app = express();
const port = process.env.PORT || 8080;
const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

export async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      if (req) {
        return {
          req,
          res,
        };
      }
    },
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  createConnection()
    .then(() => {
      httpServer.listen(port, () => {
        winstonEnvLogger.info(
          `🚀 server ready at http://localhost:${port}${server.graphqlPath} `
        );
      });
    })
    .catch((error: any) => {
      winstonEnvLogger.error({
        message: 'An error occured',
        error,
      });
      throw new Error('An error occured connecting to database');
    });
}

startApolloServer();
