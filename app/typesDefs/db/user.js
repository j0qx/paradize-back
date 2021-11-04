import { gql } from 'apollo-server-express';

// TODO : type from  base seems strange , check it and ajust this file
// describe witch keyword will be available in api

// this type need to corresponding to db's user types
const user = gql`
  type User {
    id: ID!,
    username: String!,
    first_name: String,
    last_name: String,
    civility: String,
    email: String!,
    password: String!,
    address: String,
    city_code: Int,
    city: String,
    number_phone: Int,
  }

  extend type Query { # extend root Query
    users:[User]!
    user(email:String!):User! # argument is email
  }

  extend type Mutation {
    registerUser(
      username: String!,
      first_name: String,
      last_name: String,
      civility: String,
      email: String!,
      password: String!,
      address: String,
      city_code: Int,
      city: String,
      number_phone: Int,
    ): User!
  }
`;
export default user;
