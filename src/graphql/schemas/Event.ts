const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
    eventCategoryID: {
      type: String,
      required: true,
    },
    stageID: {
      type: String,
      required: true,
    },
    scheduleID: {
      type: String,
      required: true,
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
      type: Boolean,
      default: false,
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
<<<<<<< HEAD
      type: String, // soccer, basketball, volley, etc..
      default: "empty",
=======
      type: String,
      enum: ["soccer", "basketball", "volley", "other", ""],
>>>>>>> fade471 (add an option to add new eventCategory to event)
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
export const Event = model("Event", EventSchema);
