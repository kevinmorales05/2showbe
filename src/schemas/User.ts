import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  firebaseID: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, //solo un correo por usuario
    lowercase: true, //almacena todo en minuscula
  },
  
  status: {
    type: Boolean,
    default: true,
  },
  birthday:{
    type: Date,
  },
  role: {
    type: String,
    default: "user",
  },
  telephone: {
    type: String,
    default: "none",
  },
  fullAddress: {
    type: String,
    default: "none",
  },
  country: {
    type: String,
    default: "EC",
  },
  city: {
    type: String,
    default: "UIO",
  },
  gender: {
    type: String,
  },
  profileImg:{
    type: String,
  }

}, {timestamps: true});
export const User = mongoose.model("User", UserSchema);