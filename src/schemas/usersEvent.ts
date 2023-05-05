import mongoose from "mongoose";
const {Schema} = mongoose;

const userEventSchema = new Schema({
    userID:{
        type: String,
        required: true
      },
  eventID:{
    type: String,
    required: true
  },
  eventCostID:{
    type: String,
    required: true
  },
  
  
}, {timestamps: true});
export const userEvent = mongoose.model("userEvent", userEventSchema);