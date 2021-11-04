// in this file we combine evry
import root from './root';
import user from './db/user';
import tomtom from './apis/tomtom';
import geoRisque from './apis/geoRisque';

const typeDefs = [
  root,
  user,
  tomtom,
  geoRisque,
];

export default typeDefs;
