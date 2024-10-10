import { queries } from "./queries";
import { mutations } from "./mutations";

export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
  }

  ${queries}

  ${mutations}
`;
