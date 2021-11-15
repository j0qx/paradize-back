import express from 'express';
import cors from 'cors';
import { ApolloServer , AuthenticationError} from 'apollo-server-express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import { graphqlUploadExpress } from 'graphql-upload';

import typeDefs from './typesDefs';
import resolvers from './resolvers';
import TomtomApi from './datasources/TomtomApi';
import GeoRisqueApi from './datasources/GeoRisqueApi';


dotenv.config();
const PORT = process.env.PORT;


const storage = multer.diskStorage({
  filename: function(req,file,callback) {
      callback(null,Date.now() + path.extname(file.originalname));
  },
  destination: function (req, file, cb) {
      cb(null, 'images')
    }
});


const s3 = new aws.S3({ 
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY 
 })

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'oparadize',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname))
    }
  })
})


const upload = multer({storage});

// anomyme function executed when everything is loaded
(async () => {
  
  const app = express();
  app.use(cors());
  app.use(cookieParser())

  app.get('/', (req, res) => {
    res.send('welcome on graphql server');
  });

  
  app.post('/upload', uploadS3.single("image"), (req, res) => {
    console.log(req.file)
    res.send('image uploaded');
  });
  
  app.use('/images',express.static('images'));
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
