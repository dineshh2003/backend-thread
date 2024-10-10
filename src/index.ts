import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import { prismaClient } from './lib/db';

// Define your GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    say(name : String) : String
  },
  type Mutation {
        createUser(firstName : String!, lastName: String!, email: String!, password: String!): Boolean
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, I am a grapgql server!',
    say : ( _:any,  {name} : {name : String}) =>(`Hey ${name} , how are you`)
  },

  Mutation: {
    createUser : async (_:any, 
        {firstName, lastName , email, password}:
        {firstName: string; lastName: string, email: string, password:string}
     ) =>{
        await prismaClient.user.create({
            data : {
                email,
                firstName,
                lastName,
                password,
                salt: "random_salt_to_hash_password"
            }
        })
     }
  }
};

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // Create a new HTTP server for Apollo Server
  const httpServer = http.createServer(app);

  // Create an ApolloServer instance
  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo server
  await gqlServer.start();

  // Apply Apollo middleware to handle GraphQL requests
  app.use('/graphql', json(), expressMiddleware(gqlServer));

  // A basic route to check if the server is running
  app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${PORT}` });
  });

  // Start the Express server
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

init();
