import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import routes from "./routes";

const app: Application = express();

/**
 * ✅ CORS — SAFE CONFIG
 */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "https://pharmly.co.in",
  "https://www.pharmly.co.in",
  "https://pharmly-web.onrender.com",
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin)); // 🔥 FIX

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

export default app;