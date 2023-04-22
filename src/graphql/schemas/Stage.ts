import mongoose from "mongoose";
const { Schema, model } = mongoose;

const stageSchema = new Schema(
  {
    addressID: {
      type: Schema.Types.ObjectId,
      ref: "Address"
    },
    eventCategoryID: {
      type: Schema.Types.ObjectId,
      ref: "EventCategory",
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

// virtual not working with _id but yes with other field to index
// stageSchema.virtual("_addressSchema", {
//   ref: "Stage",
//   localField: "addressID",
//   foreignField: "_id",
// });

// stageSchema.virtual("_eventCategoryID", {
//   ref: "EventCategory",
//   foreignField: "_id",
//   localField: "eventCategoryID",
// });

export default model("Stage", stageSchema);
