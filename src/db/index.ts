import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
export const pgConnectionString: any = process.env.PG_PASS;

export const pgClient = new Client(pgConnectionString);
export const connectDB = async () => {
  try {
    await pgClient.connect();
    console.log(`✅ connected to Database...`);
  } catch (error) {
    console.log(`Unable to connect to database. Error: ${error}`);
    throw error;
  }
};
