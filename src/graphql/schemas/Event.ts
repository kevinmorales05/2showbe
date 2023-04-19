import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    eventCategoryID: [{ type: Schema.Types.ObjectId, ref: "EventCategory" }],
    stageID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stage",
      },
    ],
    scheduleID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
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
      enum: ["online", "present"],
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
  },
  { timestamps: true }
);
export default model("Event", EventSchema);
