import {userQueries, userMutations} from './user'
import {offerQueries, offerMutations} from './offer'
import {coordinateQueries, coordinateMutations} from './coordinate'
import {uploadQueries, uploadMutations} from './upload'
const queryDb = {
    ...userQueries,
    ...offerQueries,
    ...coordinateQueries,
    ...uploadQueries
}

const mutationDb = {
    ...userMutations,
    ...offerMutations,
    ...coordinateMutations,
    ...uploadMutations
}


export {
    queryDb,
    mutationDb,
  };