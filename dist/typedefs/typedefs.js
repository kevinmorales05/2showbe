export const typeDefs = `#graphql
  #types
  type User {
    name: String
    lastName: String
    firebaseID: String
    email: String
    status: Boolean
    birthday: String
    role: String
    telephone: String
    fullAddress: String
    country: String
    city: String
    gender: String
    profileImg: String
  }
  #inputs
  input UserInput {
    name: String
    lastName: String
    firebaseID: String!
    email: String!
    status: Boolean
    birthday: String
    role: String
    telephone: String
    fullAddress: String
    country: String
    city: String
    gender: String
    profileImg: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    #Users
    createUser(input: UserInput): String
  }
`;
