import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TicketAvailableSchema = new Schema(
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
    ticketTypeID: [
      {
        type: Schema.Types.ObjectId,
        ref: "TicketType",
      },
    ],
    buyDate: {
      type: String,
      required: true,
    },
    type: {
      type: String, // online | physical
    },
    ticketCode: {
      type: String,
    },
    seatName: {
      type: String,
    },
    status: {
      type: String, // redeemed | active | noActive | outOfDate
    },
    isReserved: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default model("TicketAvailable", TicketAvailableSchema);
