import mongoose from "mongoose";
const { Schema, model } = mongoose;

const testScheduleSchema = new Schema({
  eventID: { type: Schema.Types.ObjectId, ref: "Event" },
  scheduleDetails: [
    new Schema({
      dayNumber: { type: Number, required: true },
      attendFrom: { type: String, required: true },
      attendTo: { type: String, required: true },
    }),
  ],
});

testScheduleSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    // not working this way
    // returnedObj.scheduleDetails.id = returnedObj.scheduleDetails._id.toString();
    // delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export default model("TestSchedule", testScheduleSchema);
