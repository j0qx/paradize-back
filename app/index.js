import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import dotenv from 'dotenv';

import typeDefs from './typesDefs';
import resolvers from './resolvers';
import TomtomApi from './datasources/TomtomApi';
import GeoRisqueApi from './datasources/GeoRisqueApi';

dotenv.config();
const PORT = process.env.BACK_PORT || 5000;

// anomyme function executed when everything is loaded
(async () => {
  const app = express();
  app.use(
    cors(),
  );

  app.get('/', (req, res) => {
    res.send('welcome on graphql server');
  });

  // we create the ApolloServer class with everything we need inside
  const apolloServer = new ApolloServer({
    // describe all types inside graphqlApi
    // shortcut syntax = typeDefs: typeDefs
    typeDefs,
    // describe actions to db or externals api
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()],
    dataSources: () => ({
      // datasources is very useful to use lots of external api
      // datasource will be available inside the context from resolver
      tomtomApi: new TomtomApi(),
      geoRisqueApi: new GeoRisqueApi(),
    }),
  });
  // execute launcher from ApolloServers'class
  await apolloServer.start();
  // apollo will be executed for each server's request
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server listening on : ', PORT);
  });
})();
