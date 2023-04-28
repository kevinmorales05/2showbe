import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userEventSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    eventID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    // or eventType which contains the same values of an event
    eventCostID: [
      {
        type: Schema.Types.ObjectId,
        // ref: "TicketAvailable",
      },
    ],
  },
  { timestamps: true }
);

userEventSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj.__v;
  },
});

export default model("UserEvent", userEventSchema);
