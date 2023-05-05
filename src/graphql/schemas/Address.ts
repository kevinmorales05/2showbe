import mongoose from "mongoose";
const { Schema } = mongoose;

const AddressEventSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  mainStreet: {
    type: String,
    required: true,
  },
  secondStreet: {
    type: String,
  },
  numberStreet: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  languages: {
    type: [String],
    default: [],
  },
  mapsURL: String,
});
export const AddressEvent = mongoose.model("AddressEvent", AddressEventSchema);
