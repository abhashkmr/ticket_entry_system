import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_URL;

export async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the application if there's an error connecting to the database
  }
}
