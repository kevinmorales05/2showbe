import mongoose from "mongoose";
const { Schema, model } = mongoose;

const stageSchema = new Schema(
  {
    addressID: {
      type: Schema.Types.ObjectId,
      ref: "Address"
    },
    eventCategoryID: [{
      type: Schema.Types.ObjectId,
      ref: "EventCategory",
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
    openFrom: {
      type: String,
      required: true,
    },
    closeTo: {
      type: String,
      required: true,
    },
    banners: {
      type: [String],
      required: true,
    },
    videoURL: String,
    capacity: Number,
    daysOpen: {
      type: [Number],
      default: [],
    },
    onlineLink: {
      type: String,
    },
  },
  { timestamps: true }
);

stageSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("Stage", stageSchema);
