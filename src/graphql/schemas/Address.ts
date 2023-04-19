import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AddressSchema = new Schema({
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
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  mapsURL: String,
});
export default model("Address", AddressSchema);
