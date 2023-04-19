import { Schema, model } from "mongoose";

const eventCategorySchema = new Schema({
  eventID: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  name: String,
  shortDescription: String,
  longDescription: String,
  icon: String,
  urlImg: String,
});

export default model("EventCategory", eventCategorySchema);
