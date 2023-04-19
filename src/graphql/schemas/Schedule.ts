import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ScheduleSchema = new Schema({
  eventID: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  dayNumber: { type: Number, required: true },
  attendFrom: { type: String, required: true },
  attendTo: { type: String, required: true },
});

export default model("Schedule", ScheduleSchema);
