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
    // Save ticketType specificaly where an user buy a ticket instead of buy a ticket with "GENERAL" this id is saved.
    eventCostID: [
      {
        type: Schema.Types.ObjectId,
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
