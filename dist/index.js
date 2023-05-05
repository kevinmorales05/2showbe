import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/resolvers.js";
import { typeDefs } from "./typedefs/typedefs.js";
import { connectDB } from "./db/config.js";
import { PORT } from "./utils/config.js";
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
connectDB();
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});
console.log(`🚀  Server ready at: ${url}`);
//# sourceMappingURL=index.js.map