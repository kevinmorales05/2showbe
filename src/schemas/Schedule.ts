const { Schema, model } = require("mongoose");

const scheduleSchema = new Schema({
  eventID: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  attendFrom: { type: String, required: true },
  attendTo: { type: String, required: true },
});

export const Schedule = model("Schedule", scheduleSchema);
