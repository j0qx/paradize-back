import { gql } from 'apollo-server-express';

// root is used to aggregate every queries and mutations
const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
export default root;
