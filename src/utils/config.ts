import * as dotenv from "dotenv";
dotenv.config();
import type { ListenOptions } from "net";

export const PORT: number = Number(process.env.PORT);
export const MONGO_URI: string = process.env.DB_MONGO;

export default { PORT, MONGO_URI };
