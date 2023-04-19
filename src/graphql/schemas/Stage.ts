import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StageSchema = new Schema(
  {
    addressID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
        // required: true,
      },
    ],
    eventCategoryID: [
      {
        type: Schema.Types.ObjectId,
        ref: "EventCategory",
      },
    ],
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

export default model("Stage", StageSchema);
