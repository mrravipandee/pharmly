import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ DB Error:", error.message);
    }
    process.exit(1);
  }
};

export default connectDB;
