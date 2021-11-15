import { gql } from 'apollo-server-express';

const upload = gql`

    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        fullPath: String
    }

    type Query {
        otherFields: Boolean!
    }

    type Mutation {
        singleUpload (file: Upload!): File!
    }
`;


export default upload;