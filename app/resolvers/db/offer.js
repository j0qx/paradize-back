import client from '../../db';

const table = 'offer'

const offerQueries = {
  // actions when we execute graphql requests
  // default resolvers's inputs are : (parent, args, context, info) => ...
  // cf: https://www.apollographql.com/docs/apollo-server/data/resolvers/
  offers: async () => {
    // client come from context , cf : app/index.js
    const response = await client.query(`SELECT * FROM ${table}`);
    return response.rows;
  },
  offer: async (_, args) => {
    const keys = Object.keys(args);
    console.log(keys)
    // get value from offer to put inside table's columns
    const values = Object.values(args);
    console.log(values)

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')
    const query = {
      text:  `SELECT * FROM ${table} WHERE ${WhereArgsformat}`,
      values,
    };
    const response = await client.query(query);
    return response.rows[0];
  },
};

const offerMutations = {
  createOffer: async (_, args) => {
    console.log(table)
    // get names of table's columns
    const keys = Object.keys(args);
    // get value from offer to put inside table's columns
    const values = Object.values(args);
    // create a string like $1,$2,$3,... to put inside the text query
    // (its link syntax from sql to replace this by values)
    const indexs = [...Array(values.length).keys()].map((i) => `$${i + 1}`).join(',');

    // create query before to convert protect from sql injections
    const query = {
      text: `INSERT INTO ${table} (${keys}) VALUES(${indexs})`,
      values: values,
    };
    console.log(query)
    await client.query(query);
    
    // const newoffer = await offerQueries.offer(_,{id})
    // TODO: response isn't right , we need de to requery database and get result from insert
    return {message: "offer created"};
  },
  deleteOffer: async(_, args) =>  {
    const keys = Object.keys(args);
    console.log(keys)
    // get value from offer to put inside table's columns
    const values = Object.values(args);
    console.log(values)

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')

    const query = {
      text: `DELETE FROM ${table} WHERE ${WhereArgsformat}`,
      values: values,
    };
    await client.query(query);
    return {message:'offer deleted'}
  },
  updateOffer: async(_,{id, toUpdate}) => {
    // get names of table's columns

    const keys = Object.keys(toUpdate);

    const values = Object.values(toUpdate);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+2}`).join(',')

    const query = {
      text: `UPDATE ${table} SET ${WhereArgsformat} WHERE id=$1`,
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
