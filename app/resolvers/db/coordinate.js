import client from '../../db';

const table = 'coordinate'

const coordinateQueries = {
  // actions when we execute graphql requests
  // default resolvers's inputs are : (parent, args, context, info) => ...
  // cf: https://www.apollographql.com/docs/apollo-server/data/resolvers/
  coordinates: async () => {
    const response = await client.query (`SELECT * FROM ${table}`);
    return response.rows;
  },
  coordinate: async (_, args) => {
    const query = {
      text:  `SELECT * FROM ${table} WHERE latitude=${args.latitude} AND longitude=${args.longitude}`,
    };
    const response = await client.query(query);
    return response.rows[0];
  },
};

const coordinateMutations = {
  createCoordinate: async (_, args) => {
    // get names of table's columns
    const keys = Object.keys(args);
    // get value from coordinate to put inside table's columns
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
    const newElement = await coordinateQueries.coordinate(_,args)

    // const newcoordinate = await coordinateQueries.coordinate(_,{id})
    // TODO: response isn't right , we need de to requery database and get result from insert
    return {message: "coordinate created",
            newElement:{
              coordinate:newElement
            } };
  },
  deleteCoordinate: async(_, args) =>  {
    const keys = Object.keys(args);

    // get value from coordinate to put inside table's columns
    const values = Object.values(args);


    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+1}`).join(',')

    const query = {
      text: `DELETE FROM ${table} WHERE ${WhereArgsformat}`,
      values: values,
    };
    await client.query(query);
    return {message:'coordinate deleted'}
  },
  updateCoordinate: async(_,{id, toUpdate}) => {
    // get names of table's columns

    const keys = Object.keys(toUpdate);

    const values = Object.values(toUpdate);

    const WhereArgsformat = keys.map((key,idx) => `${key}=$${idx+2}`).join(',')

    const query = {
      text: `UPDATE ${table} SET ${WhereArgsformat} WHERE id=$1`,
      values: [id,...values],
    };
    await client.query(query)

    return await coordinateQueries.coordinate(_,{id})
  }
};
export {
  coordinateQueries,
  coordinateMutations,
};
