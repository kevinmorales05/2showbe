const { Schema, model } = require("mongoose");

const eventCategorySchema = new Schema({
  eventID: {
    type: String,
    required: true,
  },
  name: String,
  shortDescription: String,
  longDescription: String,
  icon: String,
  urlImg: String,
});

export const eventCategory = model("EventCategory", eventCategorySchema);
