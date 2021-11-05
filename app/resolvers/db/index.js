import {userQueries, userMutations} from './user'
import {offerQueries, offerMutations} from './offer'

const queryDb = {
    ...userQueries,
    ...offerQueries

}

const mutationDb = {
    ...userMutations,
    ...offerMutations
}


export {
    queryDb,
    mutationDb,
  };