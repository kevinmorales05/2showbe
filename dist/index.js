import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/resolvers.js';
import { typeDefs } from './typedefs/typedefs.js';
import * as dotenv from 'dotenv';
import { connectDB } from './db/config.js';
dotenv.config();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
connectDB();
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
