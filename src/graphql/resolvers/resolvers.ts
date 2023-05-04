import User from "../schemas/User.js";
import Event from "../schemas/Event.js";
//import firebase messaging
import { getMessaging } from "firebase-admin/messaging";
// import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from "graphql";
import Stage from "../schemas/Stage.js";
import Schedule from "../schemas/Schedule.js";
import EventCategory from "../schemas/EventCategory.js";
import Address from "../schemas/Address.js";
import TicketType from "../schemas/TicketType.js";
import UserEvent from "../schemas/UserEvent.js";
import TicketAvailable from "../schemas/TicketAvailable.js";
import { TEventType, TModalityType } from "../../utils/types.js";
//import {FCM} from 'fcm-node';

// let serverKey = process.env.SERVER_KEY;
// let fcm = new FCM(serverKey);

// const optsDBValidators = { runValidators: true, context: "query", new: true };

const arraySliced = (array, offset, limit) => {
  if (limit !== undefined || limit !== null) {
    if (offset !== undefined || offset !== null) {
      return array.slice(offset, offset + limit);
    }
    return array.slice(0, limit);
  }
  return array;
};

export const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getEventCategories: async () => await EventCategory.find({}),
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
    getEvents: async (_, { offset = 0, limit = 5, input }, ctx) => {
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
          return eventsMapped;
        }
      } catch (err) {
        throw new GraphQLError(`Error: ${JSON.stringify(err)}`, {
          extensions: { code: "INTERNAL_SERVER_ERROR", http: { status: 400 } },
        });
      }
    },
    getEventCosts: async (_, { input }) => {
      if (input !== null) {
        const event = await Event.findById(input.eventID).populate({
          path: "ticketTypeID",
        });
        if (event === null || event === undefined)
          return new GraphQLError(`Event not Found ${input.eventID}`);

        const out = {
          eventDetails: event,
          costsAndTicketType: event.ticketTypeID,
        };
        return out;
      }
      return await Event.find({});
    },
    getUserTickets: async (_, { offset = 0, limit = 5, input }) => {
      try {
        const { userID } = input;
        const userEvent = await UserEvent.find({ userID })
          .populate("userID eventID")
          .populate({ path: "eventID", populate: { path: "ticketTypeID" } });

        if (userEvent.length === 0)
          return new GraphQLError(`No tickets to User ${input.userID}`);

        function reducer(acc, curr, index) {
          const {
            ticketTypeID: { ticketTypeDetails },
          } = curr;
          let foundTickets = [];

          for (const id of userEvent[0].eventCostID) {
            foundTickets = foundTickets.concat(
              ticketTypeDetails.filter(
                (v) => v._id.toString() === id.toString()
              )
            );
          }
          if (foundTickets.length === 0) return acc;

          let out = Object.assign({}, curr["_doc"], {
            buyTicketsDetails: foundTickets,
          });
          return acc.concat(out);
        }

        const costsTickets = userEvent[0].eventID.reduce(reducer, []);

        // console.log("userEvent", userEvent[0].eventID);
        // console.log("costs found it: ", costsTickets);
        // console.log("specific: ", costsTickets[0]["buyTicketsDetails"]);

        const outAux = {
          userDetails: userEvent[0].userID,
          buyDetails: {
            event: costsTickets,
          },
        };

        return outAux;
      } catch (error) {
        throw new GraphQLError(`Error saving event ${error}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const newUser = new User(input);
        await newUser.save();
        // pubsub.publish("users");
        return `User ${newUser.name} was created successfully`;
      } catch (error) {
        throw new GraphQLError(`Error while the user creation ${input.name}`);
      }
    },
    createStage: async (_, { input }) => {
      try {
        const {
          eventCategory: evByCategory,
          address: inAddress,
          stageDetails,
        } = input;
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
    assignCategoryToStage: async (_, { input }) => {
      try {
        const stage = await Stage.findById(input.stageIDToAssign);
        if (stage === undefined || stage === null)
          return new GraphQLError(
            `Not Found stage with id: ${input.stageIDToAssign}`
          );
        const eventCategory = new EventCategory(input.eventCategory);
        await eventCategory.save();
        console.log("whats: ", eventCategory, "and stage", stage);
        stage.eventCategoryID = stage.eventCategoryID.concat(eventCategory._id);
        await stage.save();
        return `Stage ${stage.name} assigned a new category of type ${eventCategory.categoryType}`;
      } catch (error) {
        throw new GraphQLError(`Error while the user creation ${input}`);
      }
    },
    updateTicketsEvent: async (_, { input }) => {
      try {
        const event = await Event.findById(input.eventID).populate(
          "ticketTypeID"
        );
        if (event === undefined || event === null)
          return new GraphQLError(`Not Found Stage with id: ${input.eventID}`);
        const optsDBValidators = {
          runValidators: true,
          context: "query",
          new: true,
          upsert: true,
        };
        const eventCategory = await TicketType.findByIdAndUpdate(
          event.ticketTypeID,
          {
            $addToSet: {
              ticketTypeDetails: { $each: input.updateTicketType },
            },
          },
          optsDBValidators
        );
        await eventCategory.save();

        return `Current tickets in Event ${
          event.eventName
        } now are ${eventCategory.ticketTypeDetails.map(
          (_) => _.name
        )} with tickets available ${eventCategory.ticketTypeDetails.map(
          (_) => _.ticketsAvailable
        )}`;
      } catch (error) {
        throw new GraphQLError(`Error while the user creation ${input}`);
      }
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

        // sum the total ticketsAvailable without to put it manually in the input to avoid errors of count
        const totalTicketsAvailable = input.ticketType.reduce(
          (acc, curr) => acc + curr.ticketsAvailable,
          0
        );
        input.eventDetails.ticketsAvailable = totalTicketsAvailable;
        console.log("ticketsAvailable", input.eventDetails.ticketsAvailable);

        const event = await new Event(input.eventDetails);

        await ticketType.save();
        await schedule.save();
        await event.save();

        // saving references to event
        ticketType.eventID = event._id;
        schedule.eventID = event._id;

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
        // console.log("out", out);
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
    allowEvent: async (_, { input }) => {
      const { eventID, saleStatus } = input;

      const event = await Event.findById(eventID).populate("ticketTypeID");

      event.saleStatus = saleStatus;
      await event.save();
      const eventTickets = await event.ticketTypeID["ticketTypeDetails"];

      const valuesAvailableTickets = {
        eventID: event._id,
        ticketTypeID: event.ticketTypeID._id,
        modality: event.modality,
        // Fix this with some algorithm to the future (this can't put this moment)
        // ticketCode: randomCode(),
      };

      let ticketsLength = 0;
      let msg = "";

      for await (const { ticketsAvailable, section } of eventTickets) {
        const arrayTickets = Array(ticketsAvailable).fill({
          ...valuesAvailableTickets,
          seatSection: section,
        });

        const tickets = await TicketAvailable.insertMany(arrayTickets);
        ticketsLength += tickets.length;
        msg += `${ticketsAvailable} ${section}, `;
      }

      msg += `to event: ${event.eventName} and id: ${event._id}`;
      return `${ticketsLength} tickets has been added with ${msg}`;
    },
    createTicketToUser: async (_, { input }) => {
      try {
        const { userFirebaseID, eventID, ticketDetails } = input;
        const { modality, seatSection, seatName, status, isReserved } =
          ticketDetails;

        const user = await User.find({ firebaseID: userFirebaseID });

        if (user === null || user === undefined || user.length === 0)
          return new GraphQLError(`userFirebaseID ${userFirebaseID} not found`);

        const event = await Event.findById(eventID).populate("ticketTypeID");

        if (event === null || event === undefined)
          return new GraphQLError(`Event with ID ${userFirebaseID} not found`);

        if (!event.saleStatus) return new GraphQLError(`Event is not in sale`);

        const findModality = event.modality.filter((v) => modality.includes(v));
        if (findModality.length === 0)
          return new GraphQLError(`No modality with ${[...new Set(modality)]}`);

        const tickets = event.ticketTypeID["ticketTypeDetails"];
        const findSection = tickets.filter((v) => v.section === seatSection);
        if (findSection.length === 0)
          return new GraphQLError(`No Found ${seatSection}`);
        if (findSection[0].ticketsAvailable === 0)
          return new GraphQLError(`No tickets available please create more`);
        // everything is ok from now
        const optsDBValidators = {
          runValidators: true,
          context: "query",
          new: true,
        };
        const updateTicket = {
          buyDate: new Date(),
          modality: findModality,
          // fixed this behaviour to the future
          ticketCode: (Math.random() * 77777777777).toString(),
          seatSection,
          seatName,
          status,
          isReserved,
          userID: user[0]._id,
          eventID: event._id,
          ticketTypeID: event.ticketTypeID._id,
        };
        const assignTicket = await TicketAvailable.findOneAndUpdate(
          {
            eventID: event._id,
            ticketTypeID: event.ticketTypeID._id,
            status: "noActive",
            userID: null,
          },
          updateTicket,
          optsDBValidators
        );

        if (assignTicket === null)
          return new GraphQLError(`No assigned ticket there was an error`);

        // update ticketSection && event the ticketsAvailable number
        findSection[0].ticketsAvailable -= 1;
        event.ticketsAvailable -= 1;
        await event.save();

        // https://www.mongodb.com/docs/v6.0/reference/operator/update/set/
        // https://www.mongodb.com/docs/v6.0/reference/operator/projection/elemMatch/
        // https://www.mongodb.com/docs/v6.0/reference/operator/update-array/
        await TicketType.findOneAndUpdate(
          {
            ticketTypeDetails: { $elemMatch: { section: seatSection } },
            _id: event.ticketTypeID._id,
          },
          {
            $set: { "ticketTypeDetails.$": findSection },
          },
          optsDBValidators
        );

        // assign references to User
        const isContainsEvent = user[0].userEventID.includes(event._id);

        if (!isContainsEvent) {
          user[0].userEventID = user[0].userEventID.concat(event._id);
          await user[0].save();
        }

        // assign references to UserEvent
        // https://www.mongodb.com/docs/v6.0/reference/operator/update/addToSet/
        await UserEvent.updateOne(
          { userID: user[0]._id },
          {
            // $set: {
            $push: {
              eventCostID: { $each: [findSection[0]._id] },
            },
            $addToSet: {
              eventID: { $each: [event._id] },
            },
          },
          // },
          { upsert: true }
        );

        console.log("assignTicket", assignTicket);

        const out = {
          assignTicketDetails: assignTicket,
          eventDetails: event,
          userDetails: user[0],
        };
        return out;
      } catch (error) {
        throw new GraphQLError(`Malformet input ${error}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
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
