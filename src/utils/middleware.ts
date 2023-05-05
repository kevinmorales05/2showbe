import { GraphQLError } from "graphql";

const errorMsg = (msg: string, input: string = "") => {
  throw new GraphQLError(msg + input);
};

export default { errorMsg };
