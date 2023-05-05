const { Schema, model } = require("mongoose");

const stageSchema = new Schema(
  {
    addressID: {
      type: String,
      required: true,
    },
    eventCategoriesIDs: {
      type: [String],
      default: [],
    },
    eventCategoryID: [{
      type: Schema.Types.ObjectId,
      ref: "EventCategory",
    }],
    daysOpen: [{
      closeTo: {
        type: String,
        required: true,
      },
      openFrom: {
        type: String,
        required: true,
      },
      dayOpen: {
        type: Number,
        required: true,
      },
    }],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    banners: {
      type: [String],
      required: true,
    },
    videoURL: String,
    capacity: Number,
    onlineLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Stage = model("Stage", stageSchema);
