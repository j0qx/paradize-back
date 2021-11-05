import { queryDb, mutationDb } from './db';
import { queryTomtom } from './tomtom';
import { queryGeoRisque } from './geoRisque';

const resolvers = {
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
