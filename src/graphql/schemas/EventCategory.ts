import { Schema, model } from "mongoose";

const eventCategorySchema = new Schema({
  eventID: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  name: String,
  shortDescription: String,
  longDescription: String,
  icon: String,
  urlImg: String,
});

eventCategorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("EventCategory", eventCategorySchema);
