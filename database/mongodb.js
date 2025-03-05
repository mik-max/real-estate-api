import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI) {
   throw new Error("MongoDB URI is required");
}

const connectToDatabase = async() => {
     try {
          await mongoose.connect(DB_URI);
          console.log("Database connected");
     } catch (error) {
          console.error("Database connection failed", error);

          process.exit(1);

     }
}

export default connectToDatabase;