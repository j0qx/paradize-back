import client from '../../db';
import jwt from 'jsonwebtoken';

import {  offerQueries, offerMutations } from './offer'



const SECRET_KEY = process.env.SECRET_KEY;
const table = 'user_account'

const userQueries = {
  // actions when we execute graphql requests
  // default resolvers's inputs are : (parent, args, context, info) => ...
  // cf: https://www.apollographql.com/docs/apollo-server/data/resolvers/
  users: async () => {
    // client come from context , cf : app/index.js
    const userResponse = await client.query(`SELECT * FROM ${table}`);
    const offerResponse = await offerQueries.offers()
    const userOffers = userResponse.rows.map(user => {
      const userOffer = offerResponse.filter(offer => user.id === offer.user_account_id ? offer : null )
      return {...user, offers:userOffer}
    })
    return userOffers;
  },
  user: async (_, args) => {
    let result ={}
    const keys = Object.keys(args);

    // get value from user to put inside table's columns
    const values = Object.values(args);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')
    const userQuery = {
      text:  `SELECT * FROM ${table} WHERE ${WhereArgsformat}`,
      values,
    };    
    const userResponse = await client.query(userQuery);
    result = {...userResponse.rows[0]}
    const userId = userResponse.rows[0].id

    const offersByUser = await offerQueries.offers(_,{user_account_id:userId})
    result.offers = offersByUser
    return result;

  },
  login:async (_,  args) => {
    const findUser = await userQueries.user(_, {email:args.email})
    if(!findUser){return {
      message:"invalid email",
      token:""
    }
  }
    // decode password from db and check if it's equal to args.password
    const isVerified = jwt.verify(findUser.password, SECRET_KEY, (err, password) => {  
      return args.password === password ? true : false
    })
    if(isVerified){
      // create token for this user
      const access_token = jwt.sign({id:findUser.id, email:findUser.email , username: findUser.username }, SECRET_KEY, { expiresIn: '7d' });
      return {
        message:"authorized",
        token:access_token
      }
    }
    return {
      message:"invalid password",
      token:""
    }
  }
};

const userMutations = {
  createUser: async (_, args) => {

    var token = jwt.sign(args.password, SECRET_KEY);
    args.password = token
    console.log(token)

    // get names of table's columns
    const keys = Object.keys(args);
    // get value from user to put inside table's columns
    const values = Object.values(args);
    // create a string like $1,$2,$3,... to put inside the text query
    // (its link syntax from sql to replace this by values)
    const indexs = [...Array(values.length).keys()].map((i) => `$${i + 1}`).join(',');



    // create query before to convert protect from sql injections
    const query = {
      text: `INSERT INTO ${table} (${keys}) VALUES(${indexs})`,
      values: values,
    };
    await client.query(query);

    const newUser = await userQueries.user(_,{email:args.email})
    // TODO: response isn't right , we need de to requery database and get result from insert
    return newUser;
  },


  deleteUser: async(_, args) =>  {
    const keys = Object.keys(args);
    console.log(keys)
    // get value from user to put inside table's columns
    const values = Object.values(args);
    console.log(values)

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')

    const query = {
      text: `DELETE FROM ${table} WHERE ${WhereArgsformat}`,
      values: values,
    };
    await client.query(query);
    return {message:'user deleted'}
  },
  updateUser: async(_,{id, toUpdate}) => {
    // get names of table's columns

    const keys = Object.keys(toUpdate);

    const values = Object.values(toUpdate);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+2}`).join(',')

    const query = {
      text: `UPDATE ${table} SET ${WhereArgsformat} WHERE id=$1`,
      values: [id,...values],
    };
    await client.query(query)

    return await userQueries.user(_,{id})
  }
};
export {
  userQueries,
  userMutations,
};
