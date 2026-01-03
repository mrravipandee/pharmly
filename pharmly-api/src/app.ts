import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ CORS — SAFE CONFIG
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pharmly.co.in",
      "https://www.pharmly.co.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

app.use(express.json());
app.use("/api", routes);

export default app;
