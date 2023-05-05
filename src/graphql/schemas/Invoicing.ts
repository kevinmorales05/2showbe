import mongoose from "mongoose";
const { Schema, model } = mongoose;

const InvoicingSchema = new Schema(
  {
    fiscalDataID: [
      {
        type: Schema.Types.ObjectId,
        ref: "FiscalData",
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
    totalCost: {
      type: Number,
      required: true,
    },
    subtotalCost: {
      type: Number,
      required: true,
    },
    IVA: {
      type: Number,
      required: true,
    },
    ivaTotal: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model("Invoicing", InvoicingSchema);
