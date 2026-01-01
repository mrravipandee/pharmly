import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT: number = Number(process.env.PORT) || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Pharmly API running on port ${PORT}`);
});
