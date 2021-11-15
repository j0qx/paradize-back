import { GraphQLUpload } from 'graphql-upload';

import { queryDb, mutationDb } from './db';
import { queryTomtom } from './tomtom';
import { queryGeoRisque } from './geoRisque';

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...queryDb,
    ...queryTomtom,
    ...queryGeoRisque,
  },
  Mutation: {
    ...mutationDb,
  },
};

export default resolvers;
