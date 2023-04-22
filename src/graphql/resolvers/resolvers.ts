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
import UserEvent from "../schemas/UserEvent.js";
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
    getEvents: async (_, { offset = 0, limit = 5, input }, ctx) => {
      try {
        const typeOfModality: TTypeOfOnline = input.typeOfModality;
        const categoryOfEvent: TTypeOfEvent = input.categoryOfEvent;

        const enumOnliKeys = Object.keys(ETypeOfOnline).filter((v) =>
          isNaN(Number(v))
        );
        const enumCateKeys = Object.keys(ETypeOfEvent).filter((v) =>
          isNaN(Number(v))
        );

        const boolModality = enumOnliKeys.includes(typeOfModality)
          ? true
          : false;
        const boolCategoryOfEvent = enumCateKeys.includes(categoryOfEvent)
          ? true
          : false;

        if (boolModality) {
          const event = await Event.find({
            online: typeOfModality.toLowerCase(),
          }).populate("eventCategoryID ticketTypeID stageID scheduleID");

          if (limit !== undefined) {
            if (offset !== undefined) {
              return event.slice(offset, offset + limit);
            }
            return event.slice(0, limit);
          }
          return event;
        }
        if (boolCategoryOfEvent) {
          const event = await Event.find();
          const out = event.filter(
            async (item) =>
              (await item.eventCategoryID?.categoryType) ===
              categoryOfEvent.toString()
          );
          if (limit !== undefined) {
            if (offset !== undefined) {
              return out.slice(offset, offset + limit);
            }
            return out.slice(0, limit);
          }
          return out;
        }
        if (boolModality && boolCategoryOfEvent) {
          const event = await Event.find({
            online: typeOfModality.toLowerCase(),
          }).populate("eventCategoryID ticketTypeID stageID scheduleID");
          const out = event.filter(
            async (item) =>
              (await item.eventCategoryID?.categoryType) ===
              categoryOfEvent.toString()
          );
          if (limit !== undefined) {
            if (offset !== undefined) {
              return out.slice(offset, offset + limit);
            }
            return out.slice(0, limit);
          }
          return out;
        } else {
          throw new GraphQLError(
            `unknown input type: ${JSON.stringify(input)}`,
            {
              extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
            }
          );
        }
      } catch (err) {
        throw new GraphQLError(`Error: ${JSON.stringify(err)}`, {
          extensions: { code: "INTERNAL_SERVER_ERROR", http: { status: 400 } },
        });
      }
    },
    getEventByUser: async (_, { offset = 0, limit = 5, input }) => {
      // not full implemented  still because of I haven't clearly the USEREVENTS when only exists user
      const user = await User.find({ user: input.user.name }).populate(
        "userEventID"
      );
      const userEvent = await UserEvent.find().populate("eventID eventCostID");
      const eventProp = userEvent.map(async (i) => await i?.eventID);
      const eventCostProp = userEvent.map(async (i) => await i?.eventCostID);

      return {
        user: user[0],
        event: eventProp,
        eventCost: eventCostProp,
      };
    },
    getStages: async (_, { offset = 0, limit = 10, input }) => {
      const city = input.city !== undefined ? input.city.toLowerCase() : false;
      const country =
        input.country !== undefined ? input.country.toLowerCase() : false;

      if (city && country) {
        const stage = await Stage.find().populate("addressID eventCategoryID");
        const filteredStage = stage.filter(
          async (i) =>
            (await i.addressID?.city.toLowerCase()) === city &&
            (await i.addressID?.country.toLowerCase()) === country
        );
        if (limit !== undefined) {
          if (offset !== undefined) {
            return filteredStage.slice(offset, offset + limit);
          }
          return filteredStage.slice(0, limit);
        }
        return filteredStage;
      }

      if (city) {
        const stage = await Stage.find().populate("addressID");
        const filteredStage = stage.filter(
          async (i) => (await i.addressID?.city.toLowerCase()) === city
        );
        if (limit !== undefined) {
          if (offset !== undefined) {
            return filteredStage.slice(offset, offset + limit);
          }
          return filteredStage.slice(0, limit);
        }
        return filteredStage;
      }

      if (country) {
        const stage = await Stage.find().populate("addressID");
        const filteredStage = stage.filter(
          async (i) => (await i.addressID?.country.toLowerCase()) === country
        );
        if (limit !== undefined) {
          if (offset !== undefined) {
            return filteredStage.slice(offset, offset + limit);
          }
          return filteredStage.slice(0, limit);
        }
        return filteredStage;
      } else {
        throw new GraphQLError(`unknown input type: ${JSON.stringify(input)}`, {
          extensions: { code: "BAD_USER_INPUT", http: { status: 400 } },
        });
      }

      if (input !== null && input.country !== null) {
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
      // not implementaded yet because is not tested
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
      // not implementaded yet because is not tested
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
        const beforeEventCategory = Object.assign({}, input.eventCategory);
        beforeEventCategory.categoryType =
          beforeEventCategory.categoryType.toLowerCase();

        if (input !== null) {
          const stage = await new Stage(input.stageParams);
          const eventCategory = await new EventCategory(beforeEventCategory);
          const address = await new Address(input.address);

          await stage.save();
          await eventCategory.save();
          await address.save();

          // saving reference
          // eventCategory.eventID = event._id;
          stage.addressID = address._id;
          stage.eventCategoryID = eventCategory._id;

          await stage.save();

          return {
            eventCategory: eventCategory,
            address: address,
            stageParams: stage,
          };

          return stage;
        }
      } catch (error) {
        throw new GraphQLError("so" + input + error);
      }
    },
    createTicketToUser: async (_, { input }) => {
      // To create a ticket to a user is necessary check if there's an event
      console.log("input", input);
      const { searchEvent, ticketProps, searchUser } = input;
      try {
        const searchToEvent =
          searchEvent !== undefined ? searchEvent.name : false;
        const searchToUser = searchUser !== undefined ? searchUser.name : false;
        console.log(searchToUser, " - ", searchToEvent);
        if (true && true) {
          const event = await new Event({ name: searchToEvent });
          const user = await new User({ name: searchToUser });
          console.log("event", event.length, event);
          console.log("user", user.length, user);
          if (event.length > 0 && user.length > 0) {
            console.log("over");
          } else {
            throw new GraphQLError(
              `Event or User not found - ${searchEvent} ${searchUser}`,
              {
                extensions: {
                  code: "BAD_USER_INPUT",
                  http: { status: 400 },
                },
              }
            );
          }
          return event;
          console.log("inside");
        } else {
          throw new GraphQLError(
            `Malformet input - ${searchEvent} ${searchUser}`,
            {
              extensions: {
                code: "GRAPHQL_PARSE_FAILED",
                http: { status: 400 },
              },
            }
          );
          console.log("end");
        }
        if (input !== undefined) {
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
