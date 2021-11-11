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
    latitude: Float!
    longitude: Float!
}

input CoordinateInput {
    latitude: Float!
    longitude: Float!
}

extend type Query {
    coordinates: [Coordinate]!
    coordinate(
        id:ID!
    ):Coordinate!
}

extend type Mutation {
    createCoordinate (
      latitude: Float!
      longitude: Float!
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