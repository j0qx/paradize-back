import { gql } from 'apollo-server-express';


const coordinate = gql `

 type Element {
    offer:Offer
    user:User
    coordinate:Coordinate
}

type Message {
    message: String!
    newElement: Element
  }

type Coordinate {
    id: ID!,
    latitude: String!
    longitude: String!
}

input CoordinateInput {
    latitude: String!
    longitude: String!
}

extend type Query {
    coordinates: [Coordinate]!
    coordinate(
        id:ID!
    ):Coordinate!
}

extend type Mutation {
    createCoordinate (
      latitude: String!
      longitude: String!
    ): Message!


deleteCoordinate (
    id: Int!
): Message!

updateCoordinate (
    id: Int!
    toUpdate: CoordinateInput
): Message!

}

`;

export default coordinate;