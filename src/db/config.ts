import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config.js";

export default async function connectDB() {
  try {
    await mongoose.set("strictQuery", true);
    await mongoose.set("strictPopulate", true);
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Fail in connection to MongoDB!");
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
