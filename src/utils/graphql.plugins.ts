import ApolloServerOperationRegistry from "@apollo/server-plugin-operation-registry";
import { ApolloServerPluginUsageReporting } from "@apollo/server/plugin/usageReporting";
import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginUsageReportingDisabled,
} from "@apollo/server/plugin/disabled";
  
const plugins = [   
    // process.env.APOLLO_KEY
    //   ?
    [
      // ApolloServerPluginUsageReportingDisabled(),
      // ApolloServerPluginLandingPageDisabled(),
      // ApolloServerPluginUsageReporting(),
      // ApolloServerOperationRegistry(),
      {
        async unexpectedErrorProcessingRequest({ error }) {
          console.error("requestError: ", error);
        },
      },
      {
        async serverWillStart() {
          console.log("Server starting up!");
          return {
            // async drainServer() {
            //   await serverCleanup.disponse()
            // }
          };
        },
      },
    ],
    // : undefined,
]

export default plugins