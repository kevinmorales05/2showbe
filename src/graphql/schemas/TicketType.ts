import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ticketTypeSchema = new Schema({
  eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  ticketsAvailable: {
    type: String,
    required: true,
    enum: ["yes", "no"]
  },
});

export default model("TicketType", ticketTypeSchema);
