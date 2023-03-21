import { User } from "../schemas/User.js";

export const resolvers = {
  Query: {

    getUsers: async () => {
      return await User.find();
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const newUser = new User(input);
        newUser.save();
        return "The user was created successfully";
      } catch (error) {
        return "Error while the user creation";
      }
    },
  updateUser : async (_, {input}) => {
    try {
      const {  firebaseID } = input;
      const updatedUser = await User.findOneAndUpdate(firebaseID,input);
      return updatedUser;
    } catch (error) {
      return 
    }
    
  },
  },
};
