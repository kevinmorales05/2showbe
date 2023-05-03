import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EventTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  urlImage: {
    type: String,
  },
});
export default mongoose.model("EventType", EventTypeSchema);
