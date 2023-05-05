import mongoose from "mongoose";
const { Schema } = mongoose;

const InvoicingSchema = new Schema(
  {
    fiscalDataID: {
      type: String,
      required: true,
    },
    eventID: {
      type: String,
      required: true,
    },
    eventCostID: {
      type: String,
      required: true,
    },
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
export const Invoicing = mongoose.model("Invoicing", InvoicingSchema);
