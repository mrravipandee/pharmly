import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ CORS — SAFE CONFIG
 */
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://pharmly.co.in",
    "https://www.pharmly.co.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

export default app;
