import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config.js";

export async function connectDB() {
  try {
    await mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connection!");
  } catch (error) {
    console.log("Fail in connection");
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
