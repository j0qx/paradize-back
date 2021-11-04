import { queryOparadise, mutationOparadise } from './oparadise';
import { queryTomtom } from './tomtom';
import { queryGeoRisque } from './geoRisque';

const resolvers = {
  Query: {
    ...queryOparadise,
    ...queryTomtom,
    ...queryGeoRisque,
  },
  Mutation: {
    ...mutationOparadise,
  },
};

export default resolvers;
