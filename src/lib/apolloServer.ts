import type { ListenOptions } from "net";
import { ApolloServer } from "@apollo/server";
import plugins from "../utils/graphql.plugins.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { unwrapResolverError } from '@apollo/server/errors';
import { resolvers } from "../graphql/resolvers/resolvers.js";
import { typeDefs } from "../graphql/typedefs/typedefs.js";
import config from "../utils/config.js";
import dataTest from "../__tests__/simple.js";

export interface MyContext {
  dataSources: {
    books: string; //Book[];
  };
}

const createApolloServer = async (
  listenOptions: ListenOptions = { port: config.PORT }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // formatError: (formattedError, error) => {
    //   // Return a different error message
    //   if (
    //     formattedError.extensions.code ===
    //     ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    //   ) {
    //     return {
    //       ...formattedError,
    //       message: "Your query doesn't match the schema. Try double-checking it!",
    //     };
    //   }
    //   if (formattedError.message.startsWith('Database Error: ')) {
    //     return { message: 'Internal server error' };
    //   }
    //   if (error instanceof String) {
    //     // do something specific
    //     return { message: error };
    //   }
    //       // unwrapResolverError removes the outer GraphQLError wrapping from
    // // errors thrown in resolvers, enabling us to check the instance of
    // // the original error
    // if (unwrapResolverError(error) instanceof String) {
    //   return { message: 'Internal server error' };
    // }
  
    //   // Otherwise return the formatted error. This error can also
    //   // be manipulated in other ways, as long as it's returned.
    //   return error;
    // },

    // plugins,
    // subscriptions: false,
  });
  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
    context: async ({req, res}) => {
      const { cache } = server;
      // console.log("cache", cache);
      // console.log("requesting...infinitive", req);
      // const data = dataTest;
      // const token = req.headers.authorization
      // if (token && token?.startsWith("Bearer ")) {
      //   const decodedToken = token.replace("Bearer ", "");
      // }
      // return {
      //   dataSources: {
      //     data
      //   }
      // }
    },
  });
  return { server, url };
};

export default createApolloServer;
