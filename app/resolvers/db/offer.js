import client from '../../db';
import coordinate from '../../typesDefs/db/coordinate';
import { coordinateQueries, coordinateMutations } from './coordinate'
import {   userQueries,  userMutations} from './user'
const offerTable = 'offer'

const offerQueries = {
  // actions when we execute graphql requests
  // default resolvers's inputs are : (parent, args, context, info) => ...
  // cf: https://www.apollographql.com/docs/apollo-server/data/resolvers/
  offers: async (_, args) => {

    let query = {}
    if(args){
    if (args.length<0) {

      const keys = Object.keys(args);
      // get value from offer to put inside offerTable's columns
      const values = Object.values(args);
      
      const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')
      
      query = {
        text:  `SELECT * FROM ${offerTable} WHERE ${WhereArgsformat}`,
        values,
      };
    }else{
      query = {
        text:  `SELECT * FROM ${offerTable}`
      };
    }
  }else{
    query = {
      text:  `SELECT * FROM ${offerTable}`
    };
  }
    const offersResponse = await client.query(query);
    const coordinatesResponse = await coordinateQueries.coordinates()
    const usersResponse = await client.query({text: `SELECT * FROM user_account`})
    const offers = offersResponse.rows.map((offer) => {
      const coordinate = coordinatesResponse.find(coordinate => offer.coordinate_id === coordinate.id)
      const user = usersResponse.rows.find(user => offer.user_account_id === user.id )
      offer.coordinate = coordinate
      offer.owner = user
      return offer
    })
    return offers;
  },
  offer: async (_, args) => {
    let result = {}
    const keys = Object.keys(args);
    // get value from offer to put inside offerTable's columns
    const values = Object.values(args);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')
    const query = {
      text:  `SELECT * FROM ${offerTable} WHERE ${WhereArgsformat}`,
      values,
    };
    const offerResponse = await client.query(query);
    return offerResponse.rows[0];
  },
};

const offerMutations = {
  createOffer: async (_, args) => {
    const coordinateInput = {...args.coordinate}

    const message = await coordinateMutations.createCoordinate(_, coordinateInput)
    delete args.coordinate
    args.coordinate_id = message.newElement.coordinate.id
    // get names of offerTable's columns
    const keys = Object.keys(args);
    // get value from offer to put inside offerTable's columns
    const values = Object.values(args);
    // create a string like $1,$2,$3,... to put inside the text query
    // (its link syntax from sql to replace this by values)
    const indexs = [...Array(values.length).keys()].map((i) => `$${i + 1}`).join(',');

    // create query before to convert protect from sql injections
    const query = {
      text: `INSERT INTO ${offerTable} (${keys}) VALUES(${indexs})`,
      values: values,
    };
    await client.query(query);
    const allUserOffer = await offerQueries.offers(_,{user_account_id:args.user_account_id})
    const offerCreated = allUserOffer.reduce((prev, current) => {
      if (+current.id > +prev.id) {
         return current;
      } else {
         return prev;
      }
   });
   const newCoordinate = {...offerCreated.coordinate}
   delete offerCreated.coordinate
    // const newoffer = await offerQueries.offer(_,{id})
    // TODO: response isn't right , we need de to requery database and get result from insert
    return {
      message: "offer created",
      newElement:{
        offer:offerCreated,
        coordinate:newCoordinate
      }
    }
  },
  deleteOffer: async(_, args) =>  {
    const keys = Object.keys(args);
    // get value from offer to put inside offerTable's columns
    const values = Object.values(args);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')

    const query = {
      text: `DELETE FROM ${offerTable} WHERE ${WhereArgsformat}`,
      values: values,
    };
    await client.query(query);
    return {message:'offer deleted'}
  },
  updateOffer: async(_,{id, toUpdate}) => {
    // get names of offerTable's columns

    const keys = Object.keys(toUpdate);

    const values = Object.values(toUpdate);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+2}`).join(',')

    const query = {
      text: `UPDATE ${offerTable} SET ${WhereArgsformat} WHERE id=$1`,
      values: [id,...values],
    };
    await client.query(query)

    return await offerQueries.offer(_,{id})
  }
};
export {
  offerQueries,
  offerMutations,
};
