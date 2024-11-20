// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  const url = "mongodb://localhost:27017/fitness-club";
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection error");
  }
};
