import client from '../db';

const queryOparadise = {
  // actions when we execute graphql requests
  // default resolvers's inputs are : (parent, args, context, info) => ...
  // cf: https://www.apollographql.com/docs/apollo-server/data/resolvers/
  users: async () => {
    // client come from context , cf : app/index.js
    const response = await client.query('SELECT * FROM "user_account"');
    return response.rows;
  },
  user: async (_, { email }) => {
    const query = {
      text: 'SELECT * FROM "user_account" WHERE mail=$1',
      values: [email],
    };
    const response = await client.query(query);
    return response.rows[0];
  },
};

const mutationOparadise = {
  registerUser: async (_, args) => {
    // get names of table's columns
    const keys = Object.keys(args);
    // get value from user to put inside table's columns
    const values = Object.values(args);
    // create a string like $1,$2,$3,... to put inside the text query
    // (its link syntax from sql to replace this by values)
    const indexs = [...Array(values.length).keys()].map((i) => `$${i + 1}`).join(',');

    // create query before to convert protect from sql injections
    const query = {
      text: `INSERT INTO user_account(${keys}) VALUES(${indexs})`,
      values: values,
    };
    const response = await client.query(query);
    // TODO: response isn't right , we need de to requery database and get result from insert
    return response.rows;
  },
};
export {
  queryOparadise,
  mutationOparadise,
};
