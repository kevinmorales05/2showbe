import mongoose from "mongoose";
const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
  eventID: {type: Schema.Types.ObjectId, ref: "Event" },
  dayNumber: { type: Number, required: true },
  attendFrom: { type: String, required: true },
  attendTo: { type: String, required: true },
});

scheduleSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export default model("Schedule", scheduleSchema);
