import 'reflect-metadata';
import 'dotenv/config';
import http from 'http';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ForbiddenError } from 'apollo-server';
import { graphqlUploadExpress } from 'graphql-upload';
import cors, { CorsOptions } from 'cors';
import { createConnection } from 'typeorm';
import winstonEnvLogger from 'winston-env-logger';

import { verifyToken } from './utils/token';

import schema from './graphql/schema';

const app = express();
const port = process.env.PORT || 8080;
const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(graphqlUploadExpress());

export async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      if (req) {
        const bearerToken = req.headers.authorization; // get authorization from header
        if (!bearerToken) return;

        const token = bearerToken.split(' ')[1]; // split bearer from authorization
        // if token exist verify and return user
        try {
          if (token) {
            const user = verifyToken(token);
            if (!user) throw new AuthenticationError('You must be logged in');
            return { user, isAuthorized: true };
          }
        } catch (error: any) {
          throw new ForbiddenError(error.message);
        }
      }
    },
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  createConnection()
    .then(() => {
      httpServer.listen(port, () => {
        winstonEnvLogger.info(
          `🚀 server ready at ${process.env.BASE_URL}:${port}${server.graphqlPath} `
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
