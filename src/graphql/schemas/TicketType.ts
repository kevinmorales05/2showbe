import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ticketTypeSchema = new Schema(
  {
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    ticketTypeDetails: [
      {
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
          // type: String,
          // required: true,
          // enum: ["yes", "no"],
          type: Number,
          required: true,
        },
      },
    ],
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

ticketTypeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("TicketType", ticketTypeSchema);
