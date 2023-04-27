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
import TicketAvailable from "../schemas/TicketAvailable.js";
import TestSchedule from "../schemas/TestSchedule.js";
//import {FCM} from 'fcm-node';

//     let serverKey = process.env.SERVER_KEY;

// let fcm = new FCM(serverKey);

enum EEventType {
  soccer,
  sports,
  museum,
  park,
  social_event,
  concert,
  teather,
  cars,
  other,
}
type TEventType = keyof typeof EEventType;

enum EModalityType {
  online,
  presential,
}
type TModalityType = keyof typeof EModalityType;

const optsDBValidators = { runValidators: true, context: "query", new: true };

const arraySliced = (array, offset, limit) => {
  console.log(offset, limit);
  if (limit !== undefined || limit !== null) {
    if (offset !== undefined || offset !== null) {
      return array.slice(offset, offset + limit);
    }
    return array.slice(0, limit);
  }
  console.log("return", array);
  return array;
};

export const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getEventCategories: async () => await EventCategory.find({}),
    getEvents: async (_, { input, offset = 0, limit = 5 }, ctx) => {
      try {
        function arrayMapped(array) {
          return array.map((v) => {
            return {
              eventCategoryID: v.eventCategoryID,
              ticketTypeID: v.ticketTypeID,
              stageID: v.stageID,
              scheduleID: v.scheduleID,
              eventDetails: v["_doc"],
            };
          });
        }

        const eventCategory: TEventType =
          input.eventType !== null ? input.eventType : false;
        const modality: TModalityType =
          input.modalityType !== (null || undefined)
            ? input.modalityType
            : false;

        if (modality && eventCategory) {
          // https://www.mongodb.com/docs/manual/tutorial/query-arrays/
          // or --> { "$in" : modality} } I think one value
          // search null values --> db.collection.find({"keyWithArray":{$elemMatch:{"$in":[null], "$exists":true}}})
          const event = await Event.find({
            modality: {
              $all: modality,
            },
          }).populate("eventCategoryID ticketTypeID stageID scheduleID");

          const eventFiltered = event.filter(
            (v) => v.eventCategoryID["categoryType"] === eventCategory
          );

          const eventValidated = eventFiltered !== null ? eventFiltered : false;
          if (!eventValidated)
            return new GraphQLError(`EventCategory not Found ${eventCategory}`);

          const eventSliced = arraySliced(eventValidated, offset, limit);
          const eventsMapped = arrayMapped(eventSliced);

          return eventsMapped;
        }

        if (eventCategory) {
          const event = await Event.find({}).populate(
            "eventCategoryID ticketTypeID stageID scheduleID"
          );

          const eventFiltered = event.filter(
            async (v) =>
              (await v?.eventCategoryID["categoryType"]) === eventCategory
          );

          const eventValidated = eventFiltered !== null ? eventFiltered : false;
          if (!eventValidated)
            return new GraphQLError(`EventCategory not Found ${eventCategory}`);

          const eventSliced = arraySliced(eventValidated, offset, limit);
          const eventsMapped = arrayMapped(eventSliced);
          console.log("category");
          return eventsMapped;
        }

        if (modality) {
          const event = await Event.find({
            modality: {
              $all: modality,
            },
          }).populate("eventCategoryID ticketTypeID stageID scheduleID");

          const eventSliced = arraySliced(event, offset, limit);
          const eventsMapped = arrayMapped(eventSliced);
          console.log("modality");
          return eventsMapped;
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
      try {
        function arrayMapped(array) {
          return array.map((v) => {
            return {
              address: v,
              eventCategory: v.virtualStageID[0].eventCategoryID[0],
              stageDetails: v.virtualStageID[0],
            };
          });
        }
        const city = input.city !== (undefined || null) ? input.city : false;
        const country =
          input.country !== (undefined || null) ? input.country : false;

        if (city && country) {
          // https://www.mongodb.com/docs/v6.0/reference/operator/query/regex/
          const address = await Address.find({
            city: {
              $regex: city,
              $options: "i",
            },
            country: {
              $regex: country,
              $options: "i",
            },
          }).populate({
            path: "virtualStageID",
            populate: { path: "eventCategoryID" },
          });

          const addressSliced = arraySliced(address, offset, limit);
          const addressMapped = arrayMapped(addressSliced);
          return addressMapped;
        }

        if (city) {
          const address = await Address.find({
            city: {
              $regex: city,
              $options: "i",
            },
          }).populate({
            path: "virtualStageID",
            populate: { path: "eventCategoryID" },
          });

          const addressSliced = arraySliced(address, offset, limit);
          const addressMapped = arrayMapped(addressSliced);
          return addressMapped;
        }

        if (country) {
          const address = await Address.find({
            country: {
              $regex: country,
              $options: "i",
            },
          }).populate({
            path: "virtualStageID",
            populate: { path: "eventCategoryID" },
          });

          const addressSliced = arraySliced(address, offset, limit);
          const addressMapped = arrayMapped(addressSliced);
          return addressMapped;
        }
      } catch (e) {
        throw new GraphQLError(`Error: ${JSON.stringify(e)}`, {
          extensions: { code: "INTERNAL_SERVER_ERROR", http: { status: 400 } },
        });
      }
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
    testing: async (_, { input }) => {
      const dd = input.schedule;

      // const d = { dayNumber: 19, attendFrom: "any", attendTo: "some" };
      // const array = Array(7);
      // const newArray = array.fill(d, 0, 7);
      // console.log("newArray", newArray)

      const test = await new TestSchedule({ scheduleDetails: dd });
      await test.save();
      console.log(test);
      return JSON.stringify(test, null, 2);
    },
    createEvent: async (_, { input }, ctx) => {
      try {
        if (typeof input.stageID !== "string" && input.stageID === "")
          return "Invalid stage ID";

        // Found stage by id
        const stage = await Stage.findById(input.stageID).populate(
          "addressID eventCategoryID"
        );

        if (stage === null || stage === undefined)
          return new GraphQLError(`Stage not Found by id: ${input.stage}`);

        const ticketType = await new TicketType({
          ticketTypeDetails: input.ticketType,
        });

        const schedule = await new Schedule({
          scheduleDetails: input.schedule,
        });
        const event = await new Event(input.eventDetails);

        await ticketType.save();
        await schedule.save();
        await event.save();

        // saving references to event
        ticketType.eventID = event._id;
        schedule.eventID = event._id;

        console.log("firstid check", stage.eventCategoryID[0]);
        event.eventCategoryID = stage.eventCategoryID[0];
        event.ticketTypeID = ticketType._id;
        event.stageID = stage._id;
        event.scheduleID = schedule._id;

        await ticketType.save();
        await schedule.save();
        await event.save();

        const out = {
          eventCategory: stage.eventCategoryID,
          ticketType,
          stage,
          schedule,
          address: stage.addressID,
          eventDetails: event,
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
    createStage: async (_, { input }) => {
      try {
        const {
          eventCategory: evByCategory,
          address: inAddress,
          stageDetails,
        } = input;
        // console.log(input);
        if (typeof input !== undefined) {
          const stage = await new Stage(stageDetails);
          const eventCategory = await new EventCategory(evByCategory);
          const address = await new Address(inAddress);
          await stage.save(stageDetails);

          await eventCategory.save();
          await address.save();

          // saving reference
          // to eventCategory.eventID is still without id because when we create an event in that moment will populate that id.

          stage.addressID = address._id;

          // a stage can have several category of events
          stage.eventCategoryID = stage.eventCategoryID.concat(
            eventCategory._id
          );
          await stage.save();

          // how is the first time which we create an eventCategory is wrapped in an array
          const out = {
            eventCategory: [eventCategory],
            address,
            stageDetails: stage,
            id: stage.id,
          };
          return out;
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
        if (searchToEvent && searchToUser) {
          const event = await Event.find({ name: searchToEvent }).populate(
            "ticketTypeID"
          );
          const user = await User.find({ name: searchToUser });
          console.log("user", user.length, user);
          console.log("event", event.length, event);
          if (
            event !== undefined &&
            user !== undefined &&
            ticketProps !== undefined
          ) {
            // saving ticket type
            const ticketAvailable = await new TicketAvailable({
              ...ticketProps,
            });
            await ticketAvailable.save();
            ticketAvailable.userID = user[0]._id;
            ticketAvailable.eventID = event[0]._id;
            (ticketAvailable.ticketTypeID = event[0].ticketTypeID._id),
              await ticketAvailable.save();

            console.log("saving", ticketAvailable);
            return ticketAvailable;
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
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
    allowEvent: async (_, { input }) => {
      const { searchEventByID, status, amountTicketToCreate } = input;

      const selectType = Object.keys(amountTicketToCreate);
      console.log(selectType);
      if (selectType.length === 0) return "No ticket selected";

      const eventFound = await Event.findById(searchEventByID).populate(
        "ticketTypeID"
      );
      if (!eventFound) return "not found event";
      eventFound['status'] = status;
      await eventFound.save();

      console.log("event found", eventFound);

      const reducerTicket = (acc, type) => {
        const list = amountTicketToCreate[type].list;
        const quantity = amountTicketToCreate[type].quantity;
        if (list.length !== quantity.length) return acc;
        let index = 0;

        let obj = [];
        for (const i of quantity.values()) {
          obj.push(
            Array(i).fill({ eventID: eventFound._id, seatName: list[index] })
          );
          // obj.push({ [i]: quantity[index] });
          // create several tickets by number of quantity
          // const ticketAvailable = await TicketAvailable({ eventID: event._id });

          index++;
        }
        // console.log(obj);

        // const accumulator = acc.concat({ list, quantity });

        return obj;
        // return acc.concat({ list, quantity });
      };

      const ticketsType = selectType.reduce(reducerTicket, []);

      if (ticketsType.length === 0)
        return "values between list and quantity are out of range";

      console.log(ticketsType);

      let resultsSaved = 0;
      for await (const nameTicket of ticketsType) {
        await TicketAvailable.insertMany(nameTicket);

        resultsSaved += nameTicket.length;
      }

      // for (const type of selectType) {
      //   const list = amountTicketToCreate[type].list;
      //   const quantity = amountTicketToCreate[type].quantity;
      //   if (list.length !== quantity.length)
      //     return "values between list and quantity are out of range";

      //   // const ticketType = await new TicketAvailable({ eventID: eventFound._id, })
      // }

      return `${resultsSaved} tickets has been added with ${Object.values(
        selectType
      )} to ${Object.values(
        amountTicketToCreate[selectType[0]].list
      )} with ${Object.values(amountTicketToCreate[selectType[0]].quantity)}`;
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
