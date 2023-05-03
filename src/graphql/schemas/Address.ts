import mongoose from "mongoose";
const { Schema, model } = mongoose;

const addressSchema = new Schema({
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
}, {
      toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// This is similar like populate but it's necessary to specify before toJSON & toObject the virtuals to true
addressSchema.virtual("virtualStageID", {
  ref: "Stage",
  localField: "_id",
  foreignField: "addressID",
});

addressSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});


export default model("Address", addressSchema);
