import connectDB from "./db/config.js";
import createApolloServer from "./lib/apolloServer.js";
connectDB();
if (process.env.NODE_ENV !== "test") {
    const { url } = await createApolloServer();
    console.log(`🚀 Query endpoint ready at ${url}`);
}
//# sourceMappingURL=index.js.map