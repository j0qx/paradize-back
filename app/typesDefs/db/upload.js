import { gql } from 'apollo-server-express';

const upload = gql`
 scalar Upload

 type Object {
        url:String!
        key:String!
    }
 type Response {
        success:Boolean!
        message:String!
    }

type Query {
        fetchBuckets:[String!]!
        fetchObjects(bucketName:String):[Object!]!
    }

    type Mutation {
        createBucket(bucketName:String!) : Response
        uploadObject(file:Upload!,bucketName:String!) : Object
        uploadObjects(files:[Upload!]!,bucketName:String!) : [Object!]!
        deleteObject(bucketName:String!,key:String!) : Response
        deleteObjects(bucketName:String!,objectKeys:[String!]!) : Response
        
        deleteBucket(bucketName:String!) : Response   
    }
`;


export default upload;


    
