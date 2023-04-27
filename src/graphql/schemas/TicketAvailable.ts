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
      // unique: true,
    },
    modality: [
      {
        type: String,
        enum: ["online", "presential", "other"],
        default: "physical",
      },
    ],

    ticketCode: {
      type: String,
      // unique: true,
    },
    seatSection: {
      type: String,
      required: true,
    },
    seatName: {
      type: String,
      // unique: true,
    },
    status: {
      type: String,
      enum: ["redeemed", "active", "noActive", "outOfDate"],
      default: "noActive",
      // required: true,
    },
    isReserved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("TicketAvailable", TicketAvailableSchema);
