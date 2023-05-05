import { Schema, model } from "mongoose";

const eventCategorySchema = new Schema(
  {
    eventID: { type: Schema.Types.ObjectId, ref: "Event" },
    categoryType: {
      type: String,
      required: true,
      enum: [
        "soccer",
        "sports",
        "museum",
        "national_park",
        "social_event",
        "concert",
        "teather",
        "cars",
        "horses",
        "movies",
        "parties",
        "other",
      ],
    },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: String,
    icon: String,
    urlImg: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventCategorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("EventCategory", eventCategorySchema);
