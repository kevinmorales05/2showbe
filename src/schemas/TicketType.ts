const { Schema, model } = require("mongoose");

const ticketTypeSchema = new Schema({
  eventID: {
    type: String,
    required: true,
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
  },
});

export const ticketType = model("TicketType", ticketTypeSchema);
