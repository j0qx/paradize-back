import { gql } from 'apollo-server-express';


const coordinate = gql `

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
    coordinate: Coordinate!
    coordinate(
        id:ID!
    ):Coordinate!
}

extend type Mutation {
    createCoordinate (
      latitude: Float!
      longitude: Float!
    ): Mutation!


deleteCoordinate (
    id: Int!
): Message!

updateCoordinate (
    id: Int!
    toUpdate: CoordinateInput
): Coordinate!

}

`;

export default coordinate;