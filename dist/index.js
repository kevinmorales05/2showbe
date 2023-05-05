<<<<<<< HEAD
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/resolvers.js";
import { typeDefs } from "./typedefs/typedefs.js";
import { connectDB } from "./db/config.js";
import { PORT } from "./utils/config.js";
=======
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/resolvers.js';
import { typeDefs } from './typedefs/typedefs.js';
import * as dotenv from 'dotenv';
import { connectDB } from './db/config.js';
dotenv.config();
>>>>>>> b2534ca (Merge branch 'master' of into prepro)
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
connectDB();
const { url } = await startStandaloneServer(server, {
<<<<<<< HEAD
    listen: { port: PORT },
});
console.log(`🚀  Server ready at: ${url}`);
//# sourceMappingURL=index.js.map
=======
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
>>>>>>> b2534ca (Merge branch 'master' of into prepro)
