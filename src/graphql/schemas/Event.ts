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
  saleStatus?: string;
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
      // required: true,
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
    banners: [
      {
        promoVideo: { type: String },
        bannersUrls: [{ type: String }],
      },
    ],
    videoImg: {
      type: String,
    },
    saleStatus: {
      type: Boolean,
      default: false,
    },
    dateEvent: {
      type: String,
      required: true,
    },
    hourEvent: {
      type: String,
      required: true,
    },
    urlEvent: {
      type: String,
      require: true,
    },
    ticketsAvailable: {
      type: Number,
    },
    modality: [{
      type: String,
      default: "presential",
      required: true,
    }],
    isOnline: {
      type: Boolean,
      required: true,
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
      type: String,
      enum: ["soccer", "basketball", "volley", "other"],
      // soccer, basketball, volley, etc..
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
    delete returnedObject.__v;
  },
});

export default model("Event", eventSchema);
