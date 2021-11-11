import { gql } from 'apollo-server-express';
//import { path } from 'path';
//import { finished } from 'stream/promises';
//import { graphqlUploadExpress, GraphQLUpload } from 'graphql-upload';


/* 
const upload = gql`
type File {
    filename: String!
    mimetype: String!
    encoding: String!
}

type Query {
    otherFields: Boolean!
}

type Mutation {
    singleUpload (file: Upload!): File!
}
`;
const resolvers = {
    Upload: graphqlUpload,

    Mutation: {
        singleUpload: async (parent, {file}) => {
            const { createReadStream, filename, mimetype, encoding }  = await file;
            const  stream = createReadStream();

            const out = stream.pipe(fs.createWriteStream ('local-file-output.txt'));
            await finished(out);

            return {
                filename,
                mimetype,
                encoding
            };
        },
    },
}; */





export default upload;