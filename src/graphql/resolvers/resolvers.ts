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
import simple from "../../__tests__/simple.js";
//import {FCM} from 'fcm-node';

//     let serverKey = process.env.SERVER_KEY;

// let fcm = new FCM(serverKey);

// enum ETypeOfEvent {
//   SOCCER = "SOCCER",
//   SPORTS = "SPORTS",
//   MUSEUM = "MUSEUM",
//   PARK = "PARK",
//   SOCIALEVENT = "SOCIALEVENT",
//   CONCERT = "CONCERT",
//   TEATHER = "TEATHER",
//   CARS = "CARS",
// }

enum ETypeOfEvent {
  SOCCER,
  SPORTS,
  MUSEUM,
  PARK,
  SOCIALEVENT,
  CONCERT,
  TEATHER,
  CARS,
}
type TTypeOfEvent = keyof typeof ETypeOfEvent;
//        ^?

enum ETypeOfOnline {
  ONLINE,
  PRESENTIAL,
}
type TTypeOfOnline = keyof typeof ETypeOfEvent;
//        ^?

const optsDB = { runValidators: true, context: "query", new: true };

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getEventCategories: async (_, args, ctx) => {
      return await EventCategory.find({});
    },
    getEvents: async (_, { input }, ctx) => {
      try {
        const typeOfModality: TTypeOfOnline = input.typeOfModality;
        const categoryOfEvent: TTypeOfEvent = input.categoryOfEvent;

        console.log(categoryOfEvent, typeOfModality);
        const enumOnliKeys = Object.keys(ETypeOfOnline).filter((v) =>
          isNaN(Number(v))
        );
        const enumCateKeys = Object.keys(ETypeOfEvent).filter((v) =>
          isNaN(Number(v))
        );
        
        if (enumOnliKeys.includes(typeOfModality)) {
          const event = await Event.find({
            online: typeOfModality.toLowerCase(),
          }).populate("eventCategoryID ticketTypeID stageID scheduleID");

          if (enumCateKeys.includes(categoryOfEvent)) {
            const out = event.filter(
              async (item) =>
                (await item.eventCategoryID?.categoryType) ===
                categoryOfEvent.toString()
            );
            return out;
          }

          return event;
        } else {
          throw new GraphQLError(
            `unknown input type: ${JSON.stringify(input)}`,
            {
              extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
            }
          );
        }

        // console.log("total", event)

        // const eventiso = await Event.find({
        //   eventName: "Concert of Billy Idol",
        // }).populate("show members.$*", {});
        // console.log("there event: ", event);
        // console.log("there eventCategoryID: ", event[0].eventCategoryID[0]);

        // console.log("which is event: ", event[0].eventByCategory);
        // console.log("which is eventByCategory: ", event[0].eventByCategory);
        // console.log("which is eventiso: ", eventiso[0]["show"]);
        // console.log("which is eventiso: ", eventiso[1].members.get("singer"));
        // console.log("id", eventiso[0]["show"][0]._id);
        // const ide = eventiso[0]["show"][0]._id;
        // console.log("ide: ", ide);
        // console.log("end");
        // const data = [
        //   {
        //     ...event[0]["_doc"],
        //     eventCategoryID: event[0].eventCategoryID,
        //     stageID: event[0].stageID[0],
        //     scheduleID: event[0].scheduleID[0],
        //   },
        // ];

        return [simple.data];
      } catch (err) {
        console.error(err);
      }
      // console.log("data: ", data);
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
    updateUser: async (_, { input }, ctx) => {
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
    createEvent: async (_, { input }, ctx) => {
      try {
        console.log(input.schedule);
        const eventCategory = await new EventCategory(input.eventCategory);
        const ticketType = await new TicketType(input.ticketType);
        const stage = await new Stage(input.stage);
        const schedule = await new Schedule(input.schedule);
        const address = await new Address(input.address);
        const event = await new Event(input.eventProps);

        await eventCategory.save();
        await ticketType.save();
        await stage.save();
        await schedule.save();
        await address.save();
        await event.save();

        // saving reference
        eventCategory.eventID = event._id;
        ticketType.eventID = event._id;
        stage.addressID = address._id;
        stage.eventCategoryID = eventCategory._id;
        schedule.eventID = event._id;
        event.eventCategoryID = eventCategory._id;
        event.ticketTypeID = ticketType._id;
        event.stageID = stage._id;
        event.scheduleID = schedule._id;

        await eventCategory.save();
        await ticketType.save();
        await stage.save();
        await schedule.save();
        await address.save();
        await event.save();

        const out = {
          eventCategoryRef: eventCategory,
          ticketTypeRef: ticketType,
          stageRef: stage,
          scheduleRef: schedule,
          addressRef: address,
          eventPropsRef: event,
        };
        console.log(out);
        return out;
      } catch (error) {
        throw new GraphQLError(`Error saving event ${error}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
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
