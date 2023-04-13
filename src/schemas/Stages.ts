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
    openFrom: {
      type: String,
      required: true,
    },
    closeTo: {
      type: String,
      required: true,
    },
    daysOpen: {
      type: [Number],
      default: [],
    },
    onlineLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Stage = model("Stage", stageSchema);
