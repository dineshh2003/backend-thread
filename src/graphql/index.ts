import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const typeDefs = `
    
    type Query {
      hello : String
    }
    
    type Mutaion{
        ${User.mutations}
    }
  `;

  // Define resolvers
  const resolvers = {
    Query: {
      ...User.resolvers.queries,
    },

    Mutations: {
        ...User.resolvers.mutations,
    }
  };

  // Create Apollo Server
  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
