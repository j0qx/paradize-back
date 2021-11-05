import { gql } from 'apollo-server-express';

// TODO : type from  base seems strange , check it and ajust this file
// describe witch keyword will be available in api

// this type need to corresponding to db's user types
const offer = gql`

  type Offer {
    id: ID!,
    title: String!,
    picture: String,
    description: String!,
    status: String!
  }

  input OfferInput {
    title: String,
    picture: String,
    description: String,
    status: String,
  }

  extend type Query { # extend root Query
    offers:[Offer]!
    offer(
      id:ID!
      ):Offer! # argument is id
  }

  extend type Mutation {
    createOffer(
      title: String!,
      picture: String,
      description: String!,
      status: String!,
    ): Message!

    deleteOffer(
      id: Int!
    ): Message!

    updateOffer(
      id: Int!
      toUpdate: OfferInput
    ): Offer!

  }
`;
export default offer;