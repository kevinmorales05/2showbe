import User from "../schemas/User.js";
import Event from "../schemas/Event.js";
//import firebase messaging
import { getMessaging } from "firebase-admin/messaging";
import data from "./data.js";
// import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from "graphql";
import middleware from "../../utils/middleware.js";
import Stage from "../schemas/Stage.js";
import Schedule from "../schemas/Schedule.js";
import EventCategory from "../schemas/EventCategory.js";
import Address from "../schemas/Address.js";
import TicketType from "../schemas/TicketType.js";

//import {FCM} from 'fcm-node';

//     let serverKey = process.env.SERVER_KEY;

// let fcm = new FCM(serverKey);

const optsDB = { runValidators: true, context: "query", new: true };

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getEvents: async (_, { input }) => {
      const schedule = await new Schedule({});
      const eventC = await new EventCategory({});
      if (
        input.online !== null &&
        (input.online === "online" || input.online === "present")
      ) {
        const event = await Event.find({ online: input.online })
          .populate("eventCategoryID")
          .populate("stageID")
          .populate("scheduleID");
        return event;
      }
      const event = await Event.find({})
        .populate(
          "eventCategoryID"
          // , {
          // name: 1,
          // shortDescription: 1,
          // longDescription: 1,
          // icon: 1,
          // urlImg: 1,
          // }
        )
        .populate(
          "stageID"
          // , {
          // name: 1,
          // description: 1,
          // longDescription: 1,
          // banners: 1,
          // videoURL: 1,
          // capacity: 1,
          // openFrom: 1,
          // closeTo: 1,
          // daysOpen: 1,
          // onlineLink: 1,
          // }
        )
        .populate(
          "scheduleID"
          // , { dayNumber: 1 }
        )
        .exec();
      return event;
    },
    getStages: async (_, { input }) => {
      if (input.city !== null && input.country !== null) {
        const address = await new Address({
          city: input.city,
          country: input.country,
        });

        const stage = await Stage.find({ addressID: address.id });
        return stage;
      }
      return await Stage.find({});
    },
    getEventCategories: async () => data.categories,
    getDetailEvent: async (_, { input }) => {
      if (input !== null) {
        const event = await Event.find({});
        return event;
      }
      return await Event.find({});
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const newUser = new User(input);
        newUser.save();
        // pubsub.publish("users");
        return "The user was created successfully";
      } catch (error) {
        return "Error while the user creation";
      }
    },
    updateUser: async (_, { input }) => {
      try {
        const { firebaseID } = input;
        const updatedUser = await User.findOneAndUpdate(
          firebaseID,
          input,
          optsDB
        );
        return updatedUser;
      } catch (error) {
        return;
      }
    },
    createEvent: async (_, { input }) => {
      try {
        const event = await new Event(input);
        event.save();
        return event;
      } catch (error) {
        throw new GraphQLError("so" + input);
        middleware.errorMsg("Field name for the event is important", input);
      }
    },
    updateEvent: async (_, { input }) => {
      try {
        if (input.eventID !== null) {
          const updatedUser = await User.findOneAndUpdate(
            input.eventID,
            input,
            optsDB
          );
          return updatedUser;
        }
      } catch (error) {
        throw new GraphQLError("so" + input + error);
      }
    },
    createStage: async (_, { input }) => {
      try {
        if (input !== null) {
          const stage = await new Stage(input);
          stage.save();
          return stage;
        }
      } catch (error) {
        throw new GraphQLError("so" + input + error);
      }
    },
    createTicketToUser: async (_, { input }) => {
      try {
        if (input !== null) {
          const stage = await new TicketType(input);
          stage.save();
          return stage;
        }
      } catch (error) {
        throw new GraphQLError("so" + input + error);
      }
    },
    updateState: async (_, { input }) => {
      return await Event.find({});
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
        tokens: registrationTokens,
      };
      try {
        getMessaging()
          .sendMulticast(message)
          .then((response) => {
            if (response.failureCount > 0) {
              const failedTokens = [];
              response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                  failedTokens.push(registrationTokens[idx]);
                }
              });
              console.log(
                "List of tokens that caused failures: " + failedTokens
              );
            } else {
              // Response is a message ID string.
              console.log("Successfully sent message:", response);
              return "Messages sent succesfully!";
            }
          })
          .catch((error) => {
            console.log("Error sending message:", error);
            return "error into the notifications implementation";
          });
      } catch (error) {
        console.log(error);
        return "error in the firebase connection";
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
