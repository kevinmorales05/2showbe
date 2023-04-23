import { Schema, model, Types } from "mongoose";
import EventCategory from "./EventCategory.js";

interface IEvent {
  eventByCategory?: any;
  eventCategoryID?: Types.ObjectId;
  stageID?: Types.ObjectId;
  scheduleID?: Types.ObjectId;
  eventName: string;
  artistName: string;
  shortDescription: string;
  mainDescription: string;
  banners?: [string];
  videoImg?: string;
  status?: string;
  dateEvent: string;
  hourEvent?: string;
  urlEvent?: string;
  ticketsAvailable?: number;
  online?: boolean;
  concertPlacesIMG?: string;
  visitorTeam?: string;
  homeTeam?: string;
  sportType?: string;
}

const eventSchema = new Schema(
  {
    eventCategoryID: { type: Schema.Types.ObjectId, ref: "EventCategory" },
    ticketTypeID: { type: Schema.Types.ObjectId, ref: "TicketType" },
    stageID: {
      type: Schema.Types.ObjectId,
      ref: "Stage",
    },
    scheduleID: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    artistName: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    mainDescription: {
      type: String,
      required: true,
    },
    banners: {
      type: [String],
      required: true,
    },
    videoImg: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "noActive"],
      default: "noActive",
    },
    dateEvent: {
      type: String,
      required: true,
    },
    hourEvent: {
      type: String,
    },
    urlEvent: {
      type: String,
    },
    ticketsAvailable: {
      type: Number,
    },
    online: {
      type: String,
      default: "presential",
      enum: ["online", "presential"],
    },
    concertPlacesIMG: {
      type: String,
    },
    // SPORTS
    visitorTeam: {
      type: String,
    },
    homeTeam: {
      type: String,
    },
    sportType: {
      type: String, // soccer, basketball, volley, etc..
      default: "empty",
    },

    // PREVIOUS ATTRIBUTES

    // attendFrom: {
    //   type: String,
    // },
    // attendTo: {
    //   type: String,
    // },
    // addressEventID: {
    //   type: String,
    //   required: true,
    // },
    // costingID: {
    //   type: String,
    //   required: true,
    // },
    // country: {
    //   type: String,
    //   default: "EC",
    // },
    // city: {
    //   type: String,
    //   default: "UIO",
    // },

    // typeEventID: {
    //   type: String,
    //   required: true,
    // },
    // artistID: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // testing Map
    // members: {
    //   type: Map,
    //   of: {
    //     type: Schema.Types.ObjectId,
    //     ref: "EventCategory"
    //   }
    // implementation in the Event could be
    // members: {
    //   singer: eventCategory.id,
    //   guitarrist: eventCategory.id,
    // },
    // }
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

// eventSchema.virtual("typeeventCategory", {
//   ref: "EventCategory",
//   localField: "_id",
//   foreignField: "eventID",
// });

// eventSchema.virtual("typeticketType", {
//   ref: "TicketType",
//   localField: "_id",
//   foreignField: "eventID",
// });

eventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("Event", eventSchema);
