import mongoose from "mongoose";
const {Schema, model} = mongoose;

const FiscalDataSchema = new Schema({
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
  fiscalNumber:{
    type:String,
    required: true
  },
  telephone:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  fullFiscalName:{
    type:String,
    required: true
  }
  

});
export default model("FiscalData", FiscalDataSchema);