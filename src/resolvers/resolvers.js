import { User } from "../schemas/User.js";
//import firebase messaging
import { getMessaging } from "firebase-admin/messaging";
//import {FCM} from 'fcm-node';

//     let serverKey = process.env.SERVER_KEY;

// let fcm = new FCM(serverKey);

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
    updateUser: async (_, { input }) => {
      try {
        const { firebaseID } = input;
        const updatedUser = await User.findOneAndUpdate(firebaseID, input);
        return updatedUser;
      } catch (error) {
        return;
      }
    },
    sendNotification: async (_, { input }) => {
      const registrationTokens = [
        "YOUR_REGISTRATION_TOKEN_1",
        "YOUR_REGISTRATION_TOKEN_N",
      ];

      const message = {
        notification: {
          title: input.title,
          body: input.body,
          logo: input.logo,
          urlDynamic: input.urlDynamic,
        },
        tokens: registrationTokens
      };
      try {
        getMessaging().sendMulticast(message).then(
          (response) => {
            if (response.failureCount > 0) {
              const failedTokens = [];
              response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                  failedTokens.push(registrationTokens[idx]);
                }
              });
              console.log('List of tokens that caused failures: ' + failedTokens);
            }
            else {
              // Response is a message ID string.
            console.log('Successfully sent message:', response);
            return "Messages sent succesfully!"
            }
            
          }
        ).catch((error)=>{
          console.log('Error sending message:', error);
          return "error into the notifications implementation"
        });
        
      } catch (error) {
        console.log(error);
        return "error in the firebase connection"
      }
      
      // fcm.send(message, function(err, response){
      //   if (err) {
      //       console.log("Something has gone wrong!")
      //   } else {
      //       console.log("Successfully sent with response: ", response)
      //   }
  
     

    },
  },
};
