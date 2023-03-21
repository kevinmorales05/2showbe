import mongoose from "mongoose";
const {Schema} = mongoose;

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
  number: {
    type: String,
    required: true,
  },
  reference:{
    type: String,
    required: true
  },
  lat:{
    type: String,
    required: true
  },
  long:{
    type: String,
    required: true
  }
  

});
export const AddressEvent = mongoose.model("AddressEvent", AddressEventSchema);