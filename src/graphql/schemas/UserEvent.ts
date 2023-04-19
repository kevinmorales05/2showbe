import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userEventSchema = new Schema(
  {
    userID: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    eventCostID: [
      {
        type: Schema.Types.ObjectId,
        ref: "EventCost",
      },
    ],
  },
  { timestamps: true }
);
export default model("UserEvent", userEventSchema);
