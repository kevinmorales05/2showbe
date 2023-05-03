import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.DB_MONGO;