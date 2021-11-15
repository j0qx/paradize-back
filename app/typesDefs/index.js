// in this file we combine evry
import root from './root';
import user from './db/user';
import offer from './db/offer';
import coordinate from './db/coordinate';
import upload from './db/upload'
import tomtom from './apis/tomtom';
import geoRisque from './apis/geoRisque';


const typeDefs = [
  root,
  user,
  offer,
  coordinate,
  upload,
  tomtom,
  geoRisque,
];

export default typeDefs;
