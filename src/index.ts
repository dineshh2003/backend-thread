import createApolloGraphqlServer from './graphql';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // Create a new HTTP server for Apollo Server
  const httpServer = http.createServer(app);

  // Apply Apollo middleware to handle GraphQL requests
  app.use('/graphql', json(), expressMiddleware(await createApolloGraphqlServer()));

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