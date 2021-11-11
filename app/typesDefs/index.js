// in this file we combine evry
import root from './root';
import user from './db/user';
import offer from './db/offer';
import tomtom from './apis/tomtom';
import geoRisque from './apis/geoRisque';
import coordinate from './db/coordinate';
//import upload from './db/upload';

const typeDefs = [
  root,
  user,
  offer,
  tomtom,
  geoRisque,
  //upload,
  coordinate,
];

export default typeDefs;
