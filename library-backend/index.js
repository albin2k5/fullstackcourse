import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Importing from our modular architecture
import { typeDefs } from './src/typedefs.js';
import { resolvers } from './src/handlers.js';

// Initialize the Apollo Engine
const engineInstance = new ApolloServer({
  typeDefs,
  resolvers,
});

// Configure the execution environment
const systemEnvironmentConfiguration = { listen: { port: 4000 } };

// Launch the standalone server
const { url } = await startStandaloneServer(engineInstance, systemEnvironmentConfiguration);

console.log(`[SYSTEM STATUS]: GraphQL microservice online and awaiting instructions at: ${url}`);