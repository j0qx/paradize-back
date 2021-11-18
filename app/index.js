import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { graphqlUploadExpress } from 'graphql-upload';

import typeDefs from './typesDefs';
import resolvers from './resolvers';
import TomtomApi from './datasources/TomtomApi';
import GeoRisqueApi from './datasources/GeoRisqueApi';
import s3 from './utils/config'


dotenv.config();
const PORT = process.env.PORT;
const AWS_BUCKETNAME = process.env.AWS_BUCKETNAME;


// anomyme function executed when everything is loaded
(async () => {
  
  const app = express();
  app.options('*', cors())
  app.use(cookieParser())

  app.get('/', (req, res) => {
    res.send('welcome on graphql server');
  });

  app.get("/images/:imageId", function(req, res, next) {
    console.log(req.params.imageId)
    var params = { Bucket: AWS_BUCKETNAME, Key: req.params.imageId };
    const getS3 = async () => { 
      const data = s3.getObject(params).promise()
      return data
    }
    getS3().then((img) => {
        res.send(img.Body)
      }).catch((e)=>{
        res.send(e)
      })

  });

  // we create the ApolloServer class with everything we need inside
  const apolloServer = new ApolloServer({
    // describe all types inside graphqlApi
    // shortcut syntax = typeDefs: typeDefs
    typeDefs,
    // describe actions to db or externals api
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    dataSources: () => ({
      // datasources is very useful to use lots of external api
      // datasource will be available inside the context from resolver
      tomtomApi: new TomtomApi(),
      geoRisqueApi: new GeoRisqueApi(),
    }),
    introspection: true,
  });
  // execute launcher from ApolloServers'class
  
  await apolloServer.start();
  
  app.use(graphqlUploadExpress());
  // apollo will be executed for each server's request
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server listening on : ', PORT);
  });
})();
