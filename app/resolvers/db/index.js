import {userQueries, userMutations} from './user'
import {offerQueries, offerMutations} from './offer'
import {coordinateQueries, coordinateMutations} from './coordinate'

const queryDb = {
    ...userQueries,
    ...offerQueries,
    ...coordinateQueries

}

const mutationDb = {
    ...userMutations,
    ...offerMutations,
    ...coordinateMutations
}


export {
    queryDb,
    mutationDb,
  };