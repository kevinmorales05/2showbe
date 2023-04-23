import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TicketAvailableSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    ticketTypeID: {
      type: Schema.Types.ObjectId,
      ref: "TicketType",
    },
    buyDate: {
      type: String,
      //fixed for the future
      // required: true,
    },
    type: {
      // fix this should be an array wrapping****
      type: String,
      enum: ["online", "physical"],
      default: "physical",
    },
    ticketCode: {
      type: String,
    },
    seatName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["redeemed", "active", "noActive", "outOfDate"],
      default: "noActive",
      // required: true,
    },
    isReserved: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default model("TicketAvailable", TicketAvailableSchema);
