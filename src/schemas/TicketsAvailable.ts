const { Schema, model } = require("mongoose");

const TicketsAvailableSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    eventID: {
      type: String,
      required: true,
    },
    ticketTypeID: {
      type: String,
    },
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

export const TicketsAvailable = model(
  "TicketsAvailable",
  TicketsAvailableSchema
);
