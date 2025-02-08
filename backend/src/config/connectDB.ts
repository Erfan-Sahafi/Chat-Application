import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI as string;
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI is not defined!");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfuly...");

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });
  } catch (error) {
    console.log("Something is wrong ", error);
  }
};
