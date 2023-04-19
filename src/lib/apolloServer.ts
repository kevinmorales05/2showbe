import type { ListenOptions } from "net";
import { ApolloServer } from "@apollo/server";
import plugins from "../utils/graphql.plugins.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "../graphql/resolvers/resolvers.js";
import { typeDefs } from "../graphql/typedefs/typedefs.js";
import config from "../utils/config.js";


export interface MyContext {
  dataSources: {
    books: string; //Book[];
  };
}

const createApolloServer = async (
  listenOptions: ListenOptions = { port: config.PORT }
) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins,
    // subscriptions: false,
  });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: listenOptions,
  });
  return { apolloServer, url };
};

export default createApolloServer;
