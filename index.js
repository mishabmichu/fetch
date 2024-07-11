const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const users = [
  { id: '1', name: 'Mishab', email: 'mishabcr7@gmail.com.com' },
  { id: '2', name: 'Risvan', email: 'risvan@gmail.com' },
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
  Query: {
    allUsers: () => users,
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
